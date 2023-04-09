import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import VideoIframe from "./videoIframe";
import { VideoType } from "../types";
import ThumbUpIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbUpOffIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownIcon from "@mui/icons-material/ThumbDownAlt";
import ThumbDownOffIcon from "@mui/icons-material/ThumbDownOffAlt";

type VideoItemProps = {
  video: VideoType;
};

const VideoItem = ({ video }: VideoItemProps) => {
  return (
    <Box
      mb={1}
      p={2}
      sx={{
        backgroundColor: "#f8f8f8",
        borderRadius: "15px",
      }}
    >
      <Grid container>
        <Grid item xs={12} md={5} sx={{ minHeight: "20vh" }}>
          <VideoIframe video_id={video.youtubeId} />
        </Grid>
        <Grid item xs={12} md={7} pl={2}>
          <Typography variant="h5" color="red" fontWeight={600}>
            {video.title}
          </Typography>
          <Typography>Shared by: {video.sharedBy}</Typography>
          <Box sx={{ display: "flex" }}>
            <Typography mr={1}>{video.upvoteCount}</Typography>
            <ThumbUpOffIcon />
            <Typography ml={4} mr={1}>
              {video.downvoteCount}
            </Typography>
            <ThumbDownOffIcon />
            {/* <ThumbUpIcon/>
            <ThumbDownIcon/> */}
          </Box>
          <Typography>Description:</Typography>
          <Typography>{video.description}</Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default VideoItem;
