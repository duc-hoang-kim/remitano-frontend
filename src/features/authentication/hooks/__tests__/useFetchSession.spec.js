import { act, waitFor } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import useFetchSession from "../useFetchSession";
import { enableFetchMocks } from "jest-fetch-mock";
enableFetchMocks();

var mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

describe("useFetchSession", () => {
  beforeEach(() => {
    fetch.resetMocks();
    jest.clearAllMocks();
  });

  it("call API with correct url and method", async () => {
    fetch.resetMocks();
    fetch.mockResponse(JSON.stringify(""));

    const { result } = renderHook(() => useFetchSession());

    act(() => {
      result.current.fetchSession();
    });

    await waitFor(() => {
      expect(fetch.mock.calls[0][0]).toMatch("http://test.com/api/v1/sessions");
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

  it("returns data and fetchSession function when API call is successful", async () => {
    const mockResponse = {
      user: {
        email: "duc.hoang@mail.com",
      },
    };
    fetch.mockResponse(JSON.stringify({ data: mockResponse }));

    const { result } = renderHook(() => useFetchSession());

    act(() => {
      result.current.fetchSession();
    });

    await waitFor(() => {
      expect(result.current.error).not.toBeDefined();
      expect(JSON.stringify(result.current.data)).toBe(
        JSON.stringify(mockResponse)
      );
    });
  });

  it("returns error when API call fails", async () => {
    global.fetch = () =>
    Promise.resolve({
      ok: false,
      json: () =>
        Promise.resolve({
          error: "Unauthorized",
        }),
    });

    const { result } = renderHook(() => useFetchSession());

    act(() => {
      result.current.fetchSession();
    });

    await waitFor(() => {
      expect(result.current.error).toBe("Unauthorized");
      expect(result.current.data).not.toBeDefined();
    });
  });
});
