import React from "react";
import { useNavigate } from "react-router-dom";
import useLogin from "../hooks/useLogin";
import { SubmitHandler, useForm } from "react-hook-form";
import { LoginInputsType } from "../types";
import { Box, Button, TextField, Typography, styled } from "@mui/material";

const StyledBox = styled(Box)(({ theme }) => ({
  margin: "auto",
  [theme.breakpoints.down("md")]: {
    width: "90vw",
  },
  [theme.breakpoints.up("md")]: {
    width: "40vw",
  },
  [theme.breakpoints.up("lg")]: {
    width: "30vw",
  },
}));

const LoginForm = () => {
  const { fetchLogin, error } = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputsType>();
  const onSubmit: SubmitHandler<LoginInputsType> = (data) => {
    fetchLogin({
      user: {
        email: data.email,
        password: data.password,
      },
    });
  };

  return (
    <Box sx={{ textAlign: "center", marginTop: "35px" }}>
      <form id="login-form" data-testid="login-form" onSubmit={handleSubmit(onSubmit)}>
        <StyledBox>
          <TextField
            id="email-input"
            label="Email"
            variant="outlined"
            sx={{ width: "100%" }}
            {...register("email")}
          />
          <TextField
            id="password-input"
            label="Password"
            variant="outlined"
            type="password"
            sx={{ width: "100%", marginTop: "20px" }}
            {...register("password")}
          />
        </StyledBox>
        <Typography color="red">{error}</Typography>
        <Button
          variant="contained"
          type="submit"
          sx={{ marginTop: "20px", marginBottom: "20px" }}
          data-testid='login-btn'
        >
          Login
        </Button>
      </form>
    </Box>
  );
};

export default LoginForm;
