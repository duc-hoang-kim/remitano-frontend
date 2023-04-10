import React from "react";

type VideoIframeProps = {
  video_id: string;
};

const VideoIframe = ({video_id}: VideoIframeProps) => {
  const video_youtube_url = "https://www.youtube.com/embed/" + video_id;

  return (
    <iframe
      height="100%"
      width="100%"
      src={ video_youtube_url }
      title="YouTube video player"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
    ></iframe>
  );
};

export default VideoIframe;
