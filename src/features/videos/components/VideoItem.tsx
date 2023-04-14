import { Box, Grid, Typography } from "@mui/material";
import { VideoType } from "../types";
import ThumbUpIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbUpOffIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownIcon from "@mui/icons-material/ThumbDownAlt";
import ThumbDownOffIcon from "@mui/icons-material/ThumbDownOffAlt";
import truncateText from "../../../utils/truncateText";

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
          <iframe
            height="100%"
            width="100%"
            src={`https://www.youtube.com/embed/${video.youtubeId}`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            data-testid="embed-iframe"
          ></iframe>
        </Grid>
        <Grid item xs={12} md={7} pl={2}>
          <Typography variant="h5" color="red" fontWeight={600}>
            {truncateText(video.title, 50)}
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
          <Typography>{truncateText(video.description, 200)}</Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default VideoItem;
