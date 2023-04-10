import { Box, Modal, Typography, styled } from "@mui/material";
import React, { useState } from "react";
import VideoForm from "./VideoForm";

const ModalContainer = styled(Box)(({ theme }) => ({
  // position: "absolute",
  // top: "50%",
  // left: "50%",
  // transform: "translate(-50%, -50%)",
  // backgroundColor: '#fff',
  // borderRadius: "15px",
  // boxShadow: '24px',
  // padding: '15px',
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

const AddVideoModal = ({ open, onClose }: AddVideoModalProps) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <ModalContainer sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Share a youtube video
        </Typography>

        <VideoForm onSubmitSuccess={onClose}/>
      </ModalContainer>
    </Modal>
  );
};

export default AddVideoModal;
