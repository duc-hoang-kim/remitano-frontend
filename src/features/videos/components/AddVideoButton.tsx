import { Button } from "@mui/material";
import React, { useState } from "react";
import AddVideoModal from "./AddVideoModal";

type AddVideoButtonProps = {
  onClick: () => void;
};

const AddVideoButton = () => {
  const [openAddVideoModal, setOpenAddVideoModal] = useState<boolean>(false);

  const onClick = () => {
    setOpenAddVideoModal(true);
  };

  return (
    <>
      <Button
        onClick={onClick}
        sx={{ my: 2, color: "white", display: "block" }}
      >
        Share a Movie
      </Button>
      <AddVideoModal open={openAddVideoModal} onClose={()=> setOpenAddVideoModal(false)} />
    </>
  );
};

export default AddVideoButton;
