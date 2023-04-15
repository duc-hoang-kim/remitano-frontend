import { useCallback, useState } from "react";

declare const process: {
  env: {
    REACT_APP_REMITANO_BACKEND_URL: string;
  };
};

type useFetchProps = {
  path: string;
  method: "POST" | "GET" | "PUT" | "PATCH" | "DELETE";
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  onSuccess?: (data: any) => void;
};

const useFetch = ({ path, method, onSuccess }: useFetchProps) => {
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState<number>(0);

  const fetchApi = useCallback(
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    (params: any = {}) => {
      const decodedParams =
        method === "GET" && Object.keys(params).length !== 0
          ? `?${new URLSearchParams(params)}`
          : "";

      const url =
        `${process.env.REACT_APP_REMITANO_BACKEND_URL}/${path}` + decodedParams;

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
