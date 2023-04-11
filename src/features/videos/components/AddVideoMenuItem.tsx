import { Button, MenuItem, Typography } from "@mui/material";
import React, { useState } from "react";
import AddVideoModal from "./AddVideoModal";

type AddVideoMenuItemProps = {
  onClick: () => void;
};

const AddVideoMenuItem = (props: AddVideoMenuItemProps) => {
  const [openAddVideoModal, setOpenAddVideoModal] = useState<boolean>(false);

  const onClick = () => {
    props.onClick();
    setOpenAddVideoModal(true);
  };

  return (
    <>
      <MenuItem onClick={onClick}>
        <Typography textAlign="center">Share a Movie</Typography>
      </MenuItem>
      <AddVideoModal
        open={openAddVideoModal}
        onClose={() => setOpenAddVideoModal(false)}
      />
    </>
  );
};

export default AddVideoMenuItem;
