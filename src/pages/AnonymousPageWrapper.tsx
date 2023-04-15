import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthenticate } from "../contexts/AuthContext";

const AnonymousPageWrapper = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated } = useAuthenticate();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated()) {
      navigate("/");
    }
  }, [isAuthenticated()]);

  return children;
};

export default AnonymousPageWrapper;
