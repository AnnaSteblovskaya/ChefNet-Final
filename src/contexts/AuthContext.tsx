import { createContext, useContext, useState, ReactNode, useEffect, useRef } from 'react';
import { getSupabaseClient } from '@/utils/supabase/client';
import type { User as SupabaseUser } from '@supabase/supabase-js';
import { loadDataFromServer, saveDataToServer, seedDemoData, clearLocalDashboardData } from '@/utils/dataSync';
import { getSiteUrl } from '@/utils/siteUrl';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: string;
}

type RegisterResult = 'success' | 'confirmation_needed' | 'error';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string, rememberMe?: boolean) => Promise<boolean>;
  register: (email: string, password: string, firstName: string, lastName: string, lang?: string, ref?: string) => Promise<RegisterResult>;
  logout: () => void;
  loginWithGoogle: () => Promise<void>;
  resetPassword: (email: string, newPassword: string, lang?: string) => Promise<boolean>;
  updatePassword: (newPassword: string) => Promise<boolean>;
  resendConfirmationEmail: (email: string, lang?: string) => Promise<boolean>;
  authError: string | null;
  isPasswordRecovery: boolean;
  clearPasswordRecovery: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function mapSupabaseUser(supabaseUser: SupabaseUser): User {
  return {
    id: supabaseUser.id,
    email: supabaseUser.email || '',
    firstName: supabaseUser.user_metadata?.firstName || '',
    lastName: supabaseUser.user_metadata?.lastName || '',
    createdAt: supabaseUser.created_at || new Date().toISOString(),
  };
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);
  const [isPasswordRecovery, setIsPasswordRecovery] = useState(false);
  const supabase = getSupabaseClient();

  const dataSynced = useRef(false);
  const isRegistering = useRef(false);
  const isCheckingLogin = useRef(false);

  async function checkEmailVerified(accessToken: string): Promise<boolean> {
    try {
      const res = await fetch('/api/email-status', {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });
      if (res.ok) {
        const data = await res.json();
        return data.verified === true;
      }
    } catch (err) {
      console.error('Email verification check failed:', err);
    }
    return false;
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      console.warn('Auth init timed out — showing page without session');
      setLoading(false);
    }, 6000);

    supabase.auth.getSession().then(async ({ data: { session } }) => {
      clearTimeout(timeout);
      if (session?.user && !isRegistering.current) {
        const verified = await checkEmailVerified(session.access_token);
        if (!verified) {
          await supabase.auth.signOut();
          setUser(null);
          setLoading(false);
          return;
        }
        const mappedUser = mapSupabaseUser(session.user);
        setUser(mappedUser);
        if (!dataSynced.current) {
          dataSynced.current = true;
          await seedDemoData();
          await loadDataFromServer();
        }
      }
      setLoading(false);
    }).catch((err) => {
      clearTimeout(timeout);
      console.error('getSession failed:', err);
      setLoading(false);
    });

    const signingOutUnverified = { current: false };
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (isRegistering.current || isCheckingLogin.current || signingOutUnverified.current) return;

      if (event === 'PASSWORD_RECOVERY' && session?.user) {
        setIsPasswordRecovery(true);
        setLoading(false);
        return;
      }

      if (session?.user) {
        const verified = await checkEmailVerified(session.access_token);
        if (!verified) {
          signingOutUnverified.current = true;
          await supabase.auth.signOut();
          signingOutUnverified.current = false;
          setUser(null);
          setLoading(false);
          return;
        }
        const mappedUser = mapSupabaseUser(session.user);
        setUser(mappedUser);
        if (!dataSynced.current) {
          dataSynced.current = true;
          await seedDemoData();
          await loadDataFromServer();
        }
      } else {
        dataSynced.current = false;
        setUser(null);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const register = async (email: string, password: string, firstName: string, lastName: string, lang?: string, ref?: string): Promise<RegisterResult> => {
    try {
      setAuthError(null);
      isRegistering.current = true;

      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, firstName, lastName, lang: lang || 'ru', ref: ref || null }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({ error: 'Registration failed' }));
        const msg = errData.error || 'Registration failed';
        console.error('Registration error:', msg);
        setAuthError(msg);
        isRegistering.current = false;
        return 'error';
      }

      setUser(null);
      isRegistering.current = false;
      return 'confirmation_needed';
    } catch (error) {
      console.error('Registration exception:', error);
      setAuthError('An unexpected error occurred');
      isRegistering.current = false;
      return 'error';
    }
  };

  const resendConfirmationEmail = async (email: string, lang?: string): Promise<boolean> => {
    try {
      setAuthError(null);
      const res = await fetch('/api/send-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          firstName: '',
          lang: lang || 'ru',
        }),
      });
      if (!res.ok) {
        setAuthError('Failed to resend verification email');
        return false;
      }
      return true;
    } catch {
      setAuthError('An unexpected error occurred');
      return false;
    }
  };

  const login = async (email: string, password: string, _rememberMe?: boolean): Promise<boolean> => {
    try {
      setAuthError(null);
      isCheckingLogin.current = true;

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Login error:', error.message);
        setAuthError(error.message);
        isCheckingLogin.current = false;
        return false;
      }

      if (data.user) {
        const verified = await checkEmailVerified(data.session?.access_token || '');
        if (!verified) {
          await supabase.auth.signOut();
          setUser(null);
          setAuthError('email_not_verified');
          isCheckingLogin.current = false;
          return false;
        }

        isCheckingLogin.current = false;
        setUser(mapSupabaseUser(data.user));
        return true;
      }

      isCheckingLogin.current = false;
      return false;
    } catch (error) {
      console.error('Login exception:', error);
      setAuthError('An unexpected error occurred');
      isCheckingLogin.current = false;
      return false;
    }
  };

  const logout = async () => {
    await saveDataToServer();
    clearLocalDashboardData();
    dataSynced.current = false;
    await supabase.auth.signOut();
    setUser(null);
  };

  const clearPasswordRecovery = () => {
    setIsPasswordRecovery(false);
  };

  const updatePassword = async (newPassword: string): Promise<boolean> => {
    try {
      setAuthError(null);
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) {
        console.error('Update password error:', error.message);
        setAuthError(error.message);
        return false;
      }
      setIsPasswordRecovery(false);
      return true;
    } catch (err) {
      console.error('Update password exception:', err);
      setAuthError('An unexpected error occurred');
      return false;
    }
  };

  const resetPassword = async (email: string, _newPassword: string, lang: string = 'ru'): Promise<boolean> => {
    try {
      setAuthError(null);
      const response = await fetch('/api/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, lang }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        const msg = data.error || 'Failed to send reset email';
        console.error('Password reset error:', msg);
        setAuthError(msg);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Password reset exception:', error);
      setAuthError('An unexpected error occurred');
      return false;
    }
  };

  const loginWithGoogle = async () => {
    try {
      setAuthError(null);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: getSiteUrl(),
        },
      });
      if (error) {
        console.error('Google login error:', error.message);
        setAuthError(error.message);
      }
    } catch (error) {
      console.error('Google login exception:', error);
      setAuthError('An unexpected error occurred');
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      loading,
      login,
      register,
      logout,
      loginWithGoogle,
      resetPassword,
      updatePassword,
      resendConfirmationEmail,
      authError,
      isPasswordRecovery,
      clearPasswordRecovery,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
