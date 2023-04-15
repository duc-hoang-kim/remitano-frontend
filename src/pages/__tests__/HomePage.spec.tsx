import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import HomePage from "./../HomePage";

const mockSetPage = jest.fn();

jest.mock("../../contexts/HomepageContext", () => ({
  useHomepageContext: () => ({
    videos: [
      {
        id: 1,
        title: "Video 1",
        description: "Description 1",
        thumbnailUrl: "https://example.com/thumbnail1.jpg",
        videoUrl: "https://example.com/video1.mp4",
      },
      {
        id: 2,
        title: "Video 2",
        description: "Description 2",
        thumbnailUrl: "https://example.com/thumbnail2.jpg",
        videoUrl: "https://example.com/video2.mp4",
      },
    ],
    numberOfPages: 2,
    page: 1,
    setPage: mockSetPage,
  }),
}));

describe("HomePage", () => {
  it("renders video items", () => {
    render(<HomePage />);
    expect(screen.getByText("Video 1")).toBeInTheDocument();
    expect(screen.getByText("Video 2")).toBeInTheDocument();
  });

  it("renders pagination", () => {
    render(<HomePage />);
    expect(screen.getByRole("navigation")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Go to page 2" })
    ).toBeInTheDocument();
  });

  it("calls setPage when clicking on pagination", () => {
    render(<HomePage />);
    userEvent.click(screen.getByRole("button", { name: "Go to page 2" }));
    expect(mockSetPage).toHaveBeenCalledWith(2);
  });
});
