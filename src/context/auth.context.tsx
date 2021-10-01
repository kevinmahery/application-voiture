import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

interface AuthContextType {
  changeAuthentication: (status: boolean) => void;
  isAuthenticate: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: any) => {
  const [isAuthenticate, setAuthenticate] = useState(false);

  const changeAuthentication = useCallback((status) => {
    setAuthenticate(status);
  }, []);

  const logout = useCallback(() => {
    setAuthenticate(false);
    localStorage.removeItem("access_token");
  }, []);

  useEffect(() => {
    setAuthenticate(Boolean(localStorage.getItem("access_token")));
  }, []);

  return (
    <AuthContext.Provider
      value={{ changeAuthentication, isAuthenticate, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext<AuthContextType>(AuthContext);
