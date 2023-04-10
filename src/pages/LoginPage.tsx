import { Box, Button, TextField, Typography, styled } from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useLogin from "../features/authentication/hooks/useLogin";

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

type Props = {};

type InputsType = {
  email: string;
  password: string;
};

const LoginPage = (props: Props) => {
  const navigate = useNavigate();
  const { fetchLogin, error } = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputsType>();
  const onSubmit: SubmitHandler<InputsType> = (data) => {
    fetchLogin({
      user: {
        email: data.email,
        password: data.password
      }
    })
  }

  return (
    <Box>
      <Typography variant="h4" sx={{ textAlign: "center" }}>
        Login to Funny Movies
      </Typography>

      <Box sx={{ textAlign: "center", marginTop: "35px" }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <StyledBox>
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              sx={{ width: "100%" }}
              {...register("email")}
            />
            <TextField
              id="outlined-basic"
              label="Password"
              variant="outlined"
              type="password"
              sx={{ width: "100%", marginTop: "20px" }}
              {...register("password")}
            />
          </StyledBox>
          <Typography color="red">{error}</Typography>
          <Button variant="contained" type="submit" sx={{ marginTop: "20px", marginBottom: '20px' }}>
            Login
          </Button>
          <Typography>
            New to Funny Movies? <Button variant="text" onClick={() => navigate('/register')}>Sign up</Button>
          </Typography>
        </form>
      </Box>
    </Box>
  );
};

export default LoginPage;
