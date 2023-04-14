import { Box, Button, Typography } from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";
import LoginForm from "../features/authentication/components/LoginForm";

const LoginPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const registerSuccess = searchParams.get("register-success");

  return (
    <Box data-testid="login-page">
      {registerSuccess == "true" && (
        <Typography sx={{ textAlign: "center", mb: 3, color: "green" }}>
          Your account was created successfully, you can login to your account
          now
        </Typography>
      )}
      <Typography variant="h4" sx={{ textAlign: "center" }}>
        Login to Funny Movies
      </Typography>
      <LoginForm />
      <Box sx={{ textAlign: "center" }}>
        <Typography>
          New to Funny Movies?
          <Button variant="text" onClick={() => navigate("/register")}>
            Register
          </Button>
        </Typography>
      </Box>
    </Box>
  );
};

export default LoginPage;
