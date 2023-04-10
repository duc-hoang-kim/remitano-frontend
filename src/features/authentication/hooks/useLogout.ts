import { useAuthenticate } from "../../../contexts/AuthContext";
import useFetch from "../../../hooks/useFetch";
import { UserType } from "../types";

const useLogout = () => {
  const { logOut } = useAuthenticate();

  const { data, error, fetchApi } = useFetch({
    path: "api/v1/users/sign_out",
    method: "DELETE",
    onSuccess: () => {
      logOut();
    }
  });


  return { data, error, fetchLogout: fetchApi };
};

export default useLogout;
