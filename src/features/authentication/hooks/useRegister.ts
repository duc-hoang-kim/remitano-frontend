import React, { useEffect, useState } from "react";
import useFetch from "../../../hooks/useFetch";

type useRegisterProps = {
  onSuccess: () => void;
};

const useRegister = ({ onSuccess }: useRegisterProps) => {
  const { data, error, fetchApi } = useFetch({
    path: "api/v1/users",
    method: "POST",
    onSuccess: () => onSuccess(),
  });

  return { data, error, fetchRegister: fetchApi };
};

export default useRegister;
