import { Box, Button, TextField, Typography, styled } from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import RegisterForm from "../features/authentication/components/RegisterForm";

const RegisterPage = () => {
  const navigate = useNavigate();

  return (
    <Box>
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
  );
};

export default RegisterPage;
