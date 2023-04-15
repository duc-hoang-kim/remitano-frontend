import React from "react";
import { render } from "@testing-library/react";
import VideoItem from "../VideoItem";
import { VideoType } from "../../types";

const mockVideo: VideoType = {
  id: 13,
  youtubeUrl: "https://www.youtube.com/watch?v=WfGn1yTL8TI",
  youtubeId: "WfGn1yTL8TI",
  sharedBy: "duc.hoang@mail.com",
  upvoteCount: 12,
  downvoteCount: 21,
  description: "best movie ever",
  title: "Remitano",
  createdAt: new Date(2000, 6, 22),
};

describe("VideoItem", () => {
  it("Render add button and can open modal", () => {
    const { getByTestId, getByText } = render(<VideoItem video={mockVideo} />);

    const videoEmbedIframe = getByTestId("embed-iframe");
    const videoTitle = getByText(mockVideo.title);
    const videoDescription = getByText(mockVideo.description);
    const videoUpvote = getByText(mockVideo.upvoteCount);
    const videoDownvote = getByText(mockVideo.downvoteCount);

    expect(videoUpvote).toBeInTheDocument();
    expect(videoDownvote).toBeInTheDocument();
    expect(videoTitle).toBeInTheDocument();
    expect(videoDescription).toBeInTheDocument();
    expect(videoEmbedIframe).toHaveAttribute(
      "src",
      `https://www.youtube.com/embed/${mockVideo.youtubeId}`
    );
  });
});
