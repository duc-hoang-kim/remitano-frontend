import { useCallback, useEffect, useMemo, useState } from "react";

declare var process: {
  env: {
    REACT_APP_REMITANO_BACKEND_URL: string;
  };
};

type useFetchProps = {
  path: string;
  method: "POST" | "GET" | "PUT" | "PATCH" | "DELETE";
  onSuccess?: (data: any) => any;
};

const useFetch = ({ path, method, onSuccess }: useFetchProps) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [total, setTotal] = useState(0);

  const fetchApi = useCallback(
    (params: any = {}) => {
      const url =
        `${process.env.REACT_APP_REMITANO_BACKEND_URL}/${path}?` +
        (method === "GET" ? new URLSearchParams(params) : "");

      const common_params = {
        method: method,
        mode: "cors" as RequestMode,
        credentials: "include" as RequestCredentials,
        headers: { "Content-Type": "application/json" },
      };

      const fetch_params =
        method === "GET"
          ? common_params
          : { ...common_params, body: JSON.stringify(params) };

      fetch(url, fetch_params).then((res) => {
        setTotal(parseInt(res.headers?.get("Total") || "0"));
        if (res.ok) {
          res.json().then((resBody) => {
            setData(resBody.data);
            setError(resBody.error);
            setIsLoading(false);
            onSuccess?.(resBody);
          });
        } else {
          res.json().then((resBody) => {
            setError(resBody.error);
            setData(resBody.data);
            setIsLoading(false);
          });
        }
      });
    },
    [path]
  );

  return { data, isLoading, error, total, fetchApi };
};
export default useFetch;
