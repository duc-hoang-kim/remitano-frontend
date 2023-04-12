import { Box, Button, TextField, Typography, styled } from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useRegister from "../features/authentication/hooks/useRegister";
import RegisterForm from "../features/authentication/components/RegisterForm";

const RegisterPage = () => {
  return (
    <Box>
      <Typography variant="h4" sx={{ textAlign: "center" }}>
        Register Funny Movies Account
      </Typography>
      <RegisterForm />
    </Box>
  );
};

export default RegisterPage;
