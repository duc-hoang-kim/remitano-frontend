import { useAuthenticate } from "../../../contexts/AuthContext";
import useFetch from "../../../hooks/useFetch";
import { UserType } from "../types";

const useLogin = () => {
  const { logInAs } = useAuthenticate();

  const { data, error, fetchApi } = useFetch({
    path: "api/v1/users/sign_in",
    method: "POST",
    onSuccess: (res_body) => {
      const user: UserType = { email: res_body.data.user.email };
      logInAs(user);
    }
  });

  return { data, error, fetchLogin: fetchApi };
};

export default useLogin;
