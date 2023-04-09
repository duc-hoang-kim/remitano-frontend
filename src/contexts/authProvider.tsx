import {
  Routes,
  Route,
  NavLink,
  useNavigate,
} from 'react-router-dom';
import React, { FC, ReactNode } from 'react';

type AuthProviderPropsType = {
  children: ReactNode
};

type SessionType = {
  token: string | null;
}

const AuthContext = React.createContext<SessionType>({
  token: null
  // handleLogin: () => {},
  // handleLogout: () => {}
});

const fakeAuth: (()=> Promise<string>) = () =>
  new Promise<string>((resolve) => {
    setTimeout(() => resolve('2342f2f1d131rf12'), 250);
  });

const AuthProvider = ({ children } : AuthProviderPropsType ) => {
  const navigate = useNavigate();

  const [token, setToken] = React.useState<string | null>(null);

  const handleLogin = async () => {
    const token = await fakeAuth();

    setToken(token);
    navigate('/');
  };

  const handleLogout = () => {
    setToken(null);
  };

  const session = {
    token,
    onLogin: handleLogin,
    onLogout: handleLogout,
  };

  return (
    <AuthContext.Provider value={session}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
