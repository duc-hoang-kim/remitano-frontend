import { Box, Button, TextField, Typography, styled } from "@mui/material";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import ConfirmationInstruction from "../features/authentication/components/ConfirmationInstruction";
import useRegister from "../features/authentication/hooks/useRegister";

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

type InputsType = {
  email: string;
  password: string;
  passwordConfirmation: string;
};

const RegisterPage = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<InputsType>();
  const { data, error, fetchRegistry } = useRegister({
    onSuccess: () => {
      setFormSubmitted(true);
    },
  });
  const onSubmit: SubmitHandler<InputsType> = (data) => {
    fetchRegistry({
      user: {
        email: data.email,
        password: data.password,
        password_confirmation: data.passwordConfirmation,
      },
    });
  };

  if (formSubmitted) return <ConfirmationInstruction />;

  return (
    <Box>
      <Typography variant="h4" sx={{ textAlign: "center" }}>
        Register Funny Movies Account
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
            <TextField
              id="outlined-basic"
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
            <Typography color="red">
              {errors.passwordConfirmation?.message}
            </Typography>
          </StyledBox>
          <Typography color="red">{error}</Typography>
          <Button
            variant="contained"
            type="submit"
            sx={{ marginTop: "20px", marginBottom: "20px" }}
          >
            Register
          </Button>
          <Typography>
            Already had an account?{" "}
            <Button variant="text" onClick={() => navigate("/login")}>
              Login
            </Button>
          </Typography>
        </form>
      </Box>
    </Box>
  );
};

export default RegisterPage;
