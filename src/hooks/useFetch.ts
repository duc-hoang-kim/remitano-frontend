import { useEffect, useState } from "react";

declare var process: {
  env: {
    REACT_APP_REMITANO_BACKEND_URL: string;
  };
};

type useFetchProps = {
  path: string;
  method: "POST" | "GET" | "PUT" | "PATCH" | "DELETE";
  params: any;
};

const useFetch = ({ path, method, params }: useFetchProps) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const url =
    `${process.env.REACT_APP_REMITANO_BACKEND_URL}/${path}?` +
    (method === "GET" ? new URLSearchParams(params) : "");

  const fetch_params = (
    method === "GET" ?
    { method: method }
    : {
      method: method,
      body: JSON.stringify(params)
    }
  )

  useEffect(() => {
    fetch(url, fetch_params)
      .then((res) => res.json())
      .then((response) => {
        setError(response.error);
        setData(response.data);
        setIsLoading(false);
      });
  }, [url, JSON.stringify(params)]);

  return { data, isLoading, error };
};
export default useFetch;
