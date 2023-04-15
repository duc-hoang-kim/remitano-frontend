import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import React from "react";
import useCreateVideo from "../hooks/useCreateVideo";
import { SubmitHandler, useForm } from "react-hook-form";

const ModalContainer = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    width: "85vw",
  },
  [theme.breakpoints.up("md")]: {
    width: "40vw",
  },
  [theme.breakpoints.up("lg")]: {
    width: "30vw",
  },
}));

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  borderRadius: "15px",
  boxShadow: 24,
  p: 3,
};

type AddVideoModalProps = {
  open: boolean;
  onClose: () => void;
};

type InputsType = {
  youtubeUrl: string;
};

const AddVideoModal = ({ open, onClose }: AddVideoModalProps) => {
  const { error, fetchCreateVideo } = useCreateVideo({
    onSuccess: () => {
      reset();
      onClose();
    },
  });
  const {
    reset,
    register,
    handleSubmit,
  } = useForm<InputsType>();
  const onSubmit: SubmitHandler<InputsType> = (data) => {
    fetchCreateVideo({
      youtube_url: data.youtubeUrl,
    });
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      data-testid="add-video-modal"
    >
      <ModalContainer sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Share a youtube video
        </Typography>

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
      </ModalContainer>
    </Modal>
  );
};

export default AddVideoModal;
