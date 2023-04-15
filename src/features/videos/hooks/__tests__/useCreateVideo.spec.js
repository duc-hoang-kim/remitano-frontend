import { act, waitFor } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import useCreateVideo from "../useCreateVideo";
import { enableFetchMocks } from "jest-fetch-mock";
enableFetchMocks();

var mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

var mockRefresh = jest.fn();

jest.mock("../../../../contexts/HomepageContext", () => ({
  ...jest.requireActual("../../../../contexts/HomepageContext"),
  useHomepageContext: () => ({ refresh: mockRefresh }),
}));

describe("useCreateVideo", () => {
  it("call API with correct url and method", async () => {
    fetch.resetMocks();
    fetch.mockResponse(JSON.stringify(""));

    const { result } = renderHook(() =>
      useCreateVideo({ onSuccess: jest.fn() })
    );

    const youtubeUrl = "https://www.youtube.com/watch?v=V-pqu85UBSY";
    act(() => {
      result.current.fetchCreateVideo({ youtube_url: youtubeUrl });
    });

    await waitFor(() => {
      expect(fetch.mock.calls[0][0]).toBe("http://test.com/api/v1/videos");
      expect(JSON.stringify(fetch.mock.calls[0][1])).toBe(
        JSON.stringify({
          method: "POST",
          mode: "cors",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ youtube_url: youtubeUrl }),
        })
      );
    });
  });

  it("returns data and fetchLogin function when API call is successful", async () => {
    const youtubeUrl = "https://www.youtube.com/watch?v=V-pqu85UBSY";
    const video_data = {
      youtube_url: "https://www.youtube.com/watch?v=V-pqu85UBSY",
      downvote_count: 0,
      upvote_count: 0,
      description: "Post Malone at Prudential Center",
      title: "Post Malone  - Cooped Up ft. Roddy Ricch (LIVE)",
      created_at: "2023-04-13T16:37:38.668Z",
      sharer_email: "hoangkimduclqddd@gmail.com",
      youtube_id: "V-pqu85UBSY",
      id: 38,
    };

    global.fetch = () =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            data: video_data,
          }),
      });

    const onSuccess = jest.fn();
    const { result } = renderHook(() =>
      useCreateVideo({ onSuccess: onSuccess })
    );

    act(() => {
      result.current.fetchCreateVideo({ youtube_url: youtubeUrl });
    });

    await waitFor(() => {
      expect(result.current.error).not.toBeDefined();
      expect(JSON.stringify(result.current.data)).toBe(
        JSON.stringify(video_data)
      );
      expect(onSuccess).toBeCalled;
      expect(mockRefresh).toBeCalled;
    });
  });

  it("returns error when API call fails", async () => {
    const youtubeUrl = "https://www.youtube.com/watch?v=V-pqu85UBSY";

    global.fetch = () =>
      Promise.resolve({
        ok: false,
        json: () =>
          Promise.resolve({
            error: "invalid youtube url",
          }),
      });

    const onSuccess = jest.fn();
    const { result } = renderHook(() =>
      useCreateVideo({ onSuccess: onSuccess })
    );

    act(() => {
      result.current.fetchCreateVideo({ youtube_url: youtubeUrl });
    });

    await waitFor(() => {
      expect(result.current.error).toBe("invalid youtube url");
      expect(result.current.data).not.toBeDefined();
      expect(onSuccess).not.toHaveBeenCalled();
      expect(mockRefresh).not.toBeCalled;
    });
  });
});
