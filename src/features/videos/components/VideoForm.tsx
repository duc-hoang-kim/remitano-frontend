import { Box, Button, TextField, Typography } from "@mui/material";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import useCreateVideo from "../hooks/useCreateVideo";

type InputsType = {
  youtubeUrl: string;
};

const VideoForm = ({ onSubmitSuccess }: { onSubmitSuccess: () => void }) => {
  const { error, fetchCreateVideo } = useCreateVideo({
    onSuccess: onSubmitSuccess,
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputsType>();
  const onSubmit: SubmitHandler<InputsType> = (data) => {
    fetchCreateVideo({
      youtube_url: data.youtubeUrl
    });
  };

  return (
    <Box sx={{ textAlign: "center", marginTop: "35px" }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box>
          <TextField
            id="outlined-basic"
            label="Youtube URL"
            variant="outlined"
            sx={{ width: "100%" }}
            {...register("youtubeUrl")}
          />
        </Box>
        <Typography color="red">{error}</Typography>
        <Button
          variant="contained"
          type="submit"
          sx={{ marginTop: "20px", marginBottom: "20px" }}
        >
          Share
        </Button>
      </form>
    </Box>
  );
};

export default VideoForm;
