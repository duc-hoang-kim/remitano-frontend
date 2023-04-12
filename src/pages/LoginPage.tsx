import { Box, Typography } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import LoginForm from "../features/authentication/components/LoginForm";

const LoginPage = () => {
  const [searchParams] = useSearchParams();
  const registerSuccess = searchParams.get("register-success");

  return (
    <Box>
      {registerSuccess == "true" && (
        <Typography sx={{ textAlign: "center", mb: 3, color: 'green' }}>
          Your account was created successfully, you can login to your account now
        </Typography>
      )}
      <Typography variant="h4" sx={{ textAlign: "center" }}>
        Login to Funny Movies
      </Typography>
      <LoginForm/>
    </Box>
  );
};

export default LoginPage;
