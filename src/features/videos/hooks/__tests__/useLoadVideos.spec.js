import { waitFor } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import { AuthProvider } from "../../../../contexts/AuthContext";
import { enableFetchMocks } from "jest-fetch-mock";
import useLoadVideos from "../useLoadVideos";
import { mockFetchVideosData, mockParsedVideos } from "../__mocks__/videos";

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

describe("useLoadVideos", () => {
  beforeEach(() => {
    fetch.resetMocks();
    jest.clearAllMocks();
  });

  it("call API with correct url and method", async () => {
    fetch.mockResponse(JSON.stringify(""));

    renderHook(() => useLoadVideos({ pageIndex: 2 }));

    await waitFor(() => {
      expect(fetch.mock.calls[0][0]).toBe(
        "http://test.com/api/v1/videos?page=2"
      );
      expect(JSON.stringify(fetch.mock.calls[0][1])).toBe(
        JSON.stringify({
          method: "GET",
          mode: "cors",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        })
      );
    });
  });

  it("returns data and fetchLogin function when API call is successful", async () => {
    fetch.mockResponse(JSON.stringify({ data: mockFetchVideosData }));

    const onSuccess = jest.fn();
    const { result } = renderHook(() => useLoadVideos({ pageIndex: 1 }));

    await waitFor(() => {
      expect(result.current.error).not.toBeDefined();
      expect(JSON.stringify(result.current.data)).toBe(
        JSON.stringify(mockParsedVideos)
      );
      expect(onSuccess).toBeCalled;
      expect(mockRefresh).toBeCalled;
    });
  });
});
