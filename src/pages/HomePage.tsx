import React from "react";
import { Box, Pagination } from "@mui/material";
import VideoItem from "../features/videos/components/VideoItem";
import { useHomepageContext } from "../contexts/HomepageContext";

const HomePage = () => {
  const { videos, numberOfPages, page, setPage } = useHomepageContext();

  return (
    <Box data-testid="home-page">
      {videos.map((video) => (
        <VideoItem key={video.id} video={video} />
      ))}
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Pagination
          count={numberOfPages}
          page={page}
          onChange={(e, page) => setPage(page)}
        />
      </Box>
    </Box>
  );
};

export default HomePage;
