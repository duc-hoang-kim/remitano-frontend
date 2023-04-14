import { useNavigate } from "react-router-dom";
import React, { ReactNode, useEffect } from "react";
import { UserType } from "../features/authentication/types";

type AuthProviderPropsType = {
  children: ReactNode;
};

type SessionType = {
  user: UserType | null;
  isAuthenticated: () => boolean;
  logInAs: (user: UserType) => void;
  logOut: () => void;
};

const AuthContext = React.createContext<SessionType>({
  user: null,
  isAuthenticated: () => false,
  logInAs: (user: UserType) => {},
  logOut: () => {},
});

const AuthProvider = ({ children }: AuthProviderPropsType) => {
  const navigate = useNavigate();

  const [user, setUser] = React.useState<UserType | null>(null);

  const logInAs = (user: UserType) => {
    setUser(user);
    localStorage.setItem('currentUserEmail', user.email);
    navigate("/");
  };

  const logOut = () => {
    setUser(null);
    localStorage.removeItem('currentUserEmail');
    navigate("/")
  };

  const isAuthenticated = () => {
    return user != null;
  };

  useEffect(() => {
    const email = localStorage.getItem('currentUserEmail');
    if (email) setUser({email: email} as UserType)
  }
  , []);

  const value = {
    user,
    logInAs,
    logOut,
    isAuthenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuthenticate = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error("must be used within a AuthProvider");
  }
  return context;
};

export { AuthContext, AuthProvider, useAuthenticate };
