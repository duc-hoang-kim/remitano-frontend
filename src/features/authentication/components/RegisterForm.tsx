import { Box, Button, TextField, Typography, styled } from "@mui/material";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { RegisterInputsType } from "../types";
import useRegister from "../hooks/useRegister";

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

const RegisterForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterInputsType>();
  const { error, fetchRegister } = useRegister({
    onSuccess: () => {
      navigate("/login?register-success=true");
    },
  });
  const onSubmit: SubmitHandler<RegisterInputsType> = (data) => {
    fetchRegister({
      user: {
        email: data.email,
        password: data.password,
        password_confirmation: data.passwordConfirmation,
      },
    });
  };
  return (
    <Box sx={{ textAlign: "center", marginTop: "35px" }}>
      <form id="register-form" onSubmit={handleSubmit(onSubmit)}>
        <StyledBox>
          <TextField
            id="email-input"
            test-dataid="email-input"
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
          <TextField
            id="password-confirmation-input"
            label="Password confirmation"
            variant="outlined"
            type="password"
            sx={{ width: "100%", marginTop: "20px" }}
            {...register("passwordConfirmation", {
              validate: (val: string) => {
                if (watch("password") != val) {
                  return "Password confirmation doesn't match";
                }
              },
            })}
          />
          <Typography test-dataid="form-error" color="red">{errors.passwordConfirmation?.message}</Typography>
        </StyledBox>
        <Typography color="red">{error}</Typography>
        <Button
          variant="contained"
          type="submit"
          sx={{ marginTop: "20px", marginBottom: "20px" }}
          onClick={handleSubmit(onSubmit)}
        >
          Register
        </Button>
      </form>
    </Box>
  );
};

export default RegisterForm;
