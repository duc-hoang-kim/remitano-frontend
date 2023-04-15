import { useNavigate } from "react-router-dom";
import React, { ReactNode, useEffect } from "react";
import { UserType } from "../features/authentication/types";
import useFetchSession from "../features/authentication/hooks/useFetchSession";

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
  logInAs: () => {},
  logOut: () => {},
});

const AuthProvider = ({ children }: AuthProviderPropsType) => {
  const navigate = useNavigate();
  const { data: session, fetchSession } = useFetchSession();
  const [user, setUser] = React.useState<UserType | null>(null);

  const logInAs = (user: UserType) => {
    setUser(user);
    navigate("/");
  };

  const logOut = () => {
    setUser(null);
    navigate("/");
  };

  const isAuthenticated = () => {
    return user != null;
  };

  useEffect(() => {
    if (!session?.user?.email) return;

    const user: UserType = { email: session.user.email };
    setUser(user);
  }, [session]);

  useEffect(() => {
    fetchSession();
  }, []);

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
