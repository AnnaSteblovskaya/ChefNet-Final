import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

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
  login: (email: string, password: string, rememberMe?: boolean) => Promise<boolean>;
  register: (email: string, password: string, firstName: string, lastName: string) => Promise<boolean>;
  logout: () => void;
  loginWithGoogle: () => Promise<void>;
  resetPassword: (email: string, newPassword: string) => Promise<boolean>;
  debugGetAllUsers: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Simple local storage based authentication
interface StoredUser {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  createdAt: string;
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const getAllUsers = (): StoredUser[] => {
    const usersJson = localStorage.getItem('chefnet_users');
    return usersJson ? JSON.parse(usersJson) : [];
  };

  const saveUsers = (users: StoredUser[]) => {
    localStorage.setItem('chefnet_users', JSON.stringify(users));
  };

  useEffect(() => {
    // Check for existing session in localStorage
    const currentUserId = localStorage.getItem('currentUserId');
    if (currentUserId) {
      const users = getAllUsers();
      const foundUser = users.find(u => u.id === currentUserId);
      if (foundUser) {
        setUser({
          id: foundUser.id,
          email: foundUser.email,
          firstName: foundUser.firstName,
          lastName: foundUser.lastName,
          createdAt: foundUser.createdAt,
        });
      }
    }
  }, []);

  const register = async (email: string, password: string, firstName: string, lastName: string): Promise<boolean> => {
    try {
      console.log('=== LOCAL REGISTRATION START ===');
      console.log('Email:', email);
      
      const users = getAllUsers();
      
      // Check if user already exists
      const existingUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());
      if (existingUser) {
        console.log('User already exists');
        return false;
      }

      // Create new user
      const newUser: StoredUser = {
        id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        email: email.toLowerCase(),
        password, // In production, this should be hashed!
        firstName,
        lastName,
        createdAt: new Date().toISOString(),
      };

      users.push(newUser);
      saveUsers(users);

      // Set current user
      localStorage.setItem('currentUserId', newUser.id);
      setUser({
        id: newUser.id,
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        createdAt: newUser.createdAt,
      });

      console.log('=== REGISTRATION SUCCESS ===');
      console.log('User ID:', newUser.id);
      return true;
    } catch (error) {
      console.error('=== REGISTRATION ERROR ===');
      console.error('Error:', error);
      return false;
    }
  };

  const login = async (email: string, password: string, rememberMe?: boolean): Promise<boolean> => {
    try {
      console.log('=== LOCAL LOGIN START ===');
      console.log('Email:', email);
      
      const users = getAllUsers();
      
      // Find user by email and password
      const foundUser = users.find(
        u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
      );

      if (!foundUser) {
        console.log('User not found or password incorrect');
        return false;
      }

      // Set current user
      localStorage.setItem('currentUserId', foundUser.id);
      setUser({
        id: foundUser.id,
        email: foundUser.email,
        firstName: foundUser.firstName,
        lastName: foundUser.lastName,
        createdAt: foundUser.createdAt,
      });

      console.log('=== LOGIN SUCCESS ===');
      console.log('User ID:', foundUser.id);
      return true;
    } catch (error) {
      console.error('=== LOGIN ERROR ===');
      console.error('Error:', error);
      return false;
    }
  };

  const logout = () => {
    console.log('=== LOGOUT ===');
    localStorage.removeItem('currentUserId');
    setUser(null);
  };

  const resetPassword = async (email: string, newPassword: string): Promise<boolean> => {
    try {
      console.log('=== PASSWORD RESET START ===');
      console.log('Email:', email);
      
      const users = getAllUsers();
      console.log('Total users:', users.length);
      
      // Find user by email
      const userIndex = users.findIndex(
        u => u.email.toLowerCase() === email.toLowerCase()
      );

      if (userIndex === -1) {
        console.log('User not found with email:', email);
        console.log('Available emails:', users.map(u => u.email));
        return false;
      }

      // Update password
      users[userIndex].password = newPassword;
      saveUsers(users);

      console.log('=== PASSWORD RESET SUCCESS ===');
      console.log('User ID:', users[userIndex].id);
      return true;
    } catch (error) {
      console.error('=== PASSWORD RESET ERROR ===');
      console.error('Error:', error);
      return false;
    }
  };

  const debugGetAllUsers = () => {
    const users = getAllUsers();
    console.log('=== ALL REGISTERED USERS ===');
    console.log('Total:', users.length);
    users.forEach((user, index) => {
      console.log(`\nUser ${index + 1}:`);
      console.log('  Email:', user.email);
      console.log('  Password:', user.password);
      console.log('  Name:', user.firstName, user.lastName);
      console.log('  ID:', user.id);
      console.log('  Created:', user.createdAt);
    });
    return users;
  };

  const loginWithGoogle = async () => {
    console.log('Google login not implemented in local mode');
    // This would need to be implemented with actual OAuth
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, register, logout, loginWithGoogle, resetPassword, debugGetAllUsers }}>
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