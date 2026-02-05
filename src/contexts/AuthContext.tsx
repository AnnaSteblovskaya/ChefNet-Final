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
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, firstName: string, lastName: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Load user from localStorage on mount
    const savedUser = localStorage.getItem('chefnet_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const register = async (email: string, password: string, firstName: string, lastName: string): Promise<boolean> => {
    try {
      // Get existing users
      const usersStr = localStorage.getItem('chefnet_users');
      const users = usersStr ? JSON.parse(usersStr) : [];

      // Check if user already exists
      if (users.find((u: any) => u.email === email)) {
        return false;
      }

      // Create new user
      const newUser: User = {
        id: Date.now().toString(),
        email,
        firstName,
        lastName,
        createdAt: new Date().toISOString(),
      };

      // Save password separately (in real app this would be hashed on backend)
      users.push({ ...newUser, password });
      localStorage.setItem('chefnet_users', JSON.stringify(users));

      // Set current user
      setUser(newUser);
      localStorage.setItem('chefnet_user', JSON.stringify(newUser));

      return true;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const usersStr = localStorage.getItem('chefnet_users');
      const users = usersStr ? JSON.parse(usersStr) : [];

      const foundUser = users.find((u: any) => u.email === email && u.password === password);
      
      if (foundUser) {
        const { password: _, ...userWithoutPassword } = foundUser;
        setUser(userWithoutPassword);
        localStorage.setItem('chefnet_user', JSON.stringify(userWithoutPassword));
        return true;
      }

      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('chefnet_user');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, register, logout }}>
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
