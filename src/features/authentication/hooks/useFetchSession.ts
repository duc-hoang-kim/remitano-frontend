import useFetch from "../../../hooks/useFetch";

const useFetchSession = () => {
  const { data, error, fetchApi } = useFetch({
    path: "api/v1/sessions",
    method: "GET",
  });

  return { data, error, fetchSession: fetchApi };
};

export default useFetchSession;
