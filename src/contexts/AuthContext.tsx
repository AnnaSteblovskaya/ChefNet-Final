import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { getSupabaseClient } from '@/utils/supabase/client';
import type { User as SupabaseUser, AuthError } from '@supabase/supabase-js';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string, rememberMe?: boolean) => Promise<boolean>;
  register: (email: string, password: string, firstName: string, lastName: string) => Promise<boolean>;
  logout: () => void;
  loginWithGoogle: () => Promise<void>;
  resetPassword: (email: string, newPassword: string) => Promise<boolean>;
  authError: string | null;
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
  const supabase = getSupabaseClient();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser(mapSupabaseUser(session.user));
      }
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(mapSupabaseUser(session.user));
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const register = async (email: string, password: string, firstName: string, lastName: string): Promise<boolean> => {
    try {
      setAuthError(null);
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            firstName,
            lastName,
          },
        },
      });

      if (error) {
        console.error('Registration error:', error.message);
        setAuthError(error.message);
        return false;
      }

      if (data.user) {
        setUser(mapSupabaseUser(data.user));
        return true;
      }

      return false;
    } catch (error) {
      console.error('Registration exception:', error);
      setAuthError('An unexpected error occurred');
      return false;
    }
  };

  const login = async (email: string, password: string, _rememberMe?: boolean): Promise<boolean> => {
    try {
      setAuthError(null);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Login error:', error.message);
        setAuthError(error.message);
        return false;
      }

      if (data.user) {
        setUser(mapSupabaseUser(data.user));
        return true;
      }

      return false;
    } catch (error) {
      console.error('Login exception:', error);
      setAuthError('An unexpected error occurred');
      return false;
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  const resetPassword = async (email: string, _newPassword: string): Promise<boolean> => {
    try {
      setAuthError(null);
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        console.error('Password reset error:', error.message);
        setAuthError(error.message);
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
          redirectTo: window.location.origin,
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
      authError,
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
