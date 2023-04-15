import React  from 'react';
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import RegisterForm from "../features/authentication/components/RegisterForm";
import AnonymousPageWrapper from "./AnonymousPageWrapper";

const RegisterPage = () => {
  const navigate = useNavigate();

  return (
    <AnonymousPageWrapper>
      <Box data-testid="register-page">
        <Typography variant="h4" sx={{ textAlign: "center" }}>
          Register Funny Movies Account
        </Typography>
        <RegisterForm />
        <Box sx={{ textAlign: "center" }}>
          <Typography>
            Already had an account?
            <Button variant="text" onClick={() => navigate("/login")}>
              Login
            </Button>
          </Typography>
        </Box>
      </Box>
    </AnonymousPageWrapper>
  );
};

export default RegisterPage;
