import { act, waitFor } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import useLogout from "../useLogout";
import { enableFetchMocks } from "jest-fetch-mock";
enableFetchMocks();

var mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

var mockLogOut = jest.fn();

jest.mock("../../../../contexts/AuthContext", () => ({
  ...jest.requireActual("../../../../contexts/AuthContext"),
  useAuthenticate: () => ({ logOut: mockLogOut }),
}));

describe("useLogout", () => {
  it("call API with correct url and method", async () => {
    fetch.resetMocks();
    fetch.mockResponse(JSON.stringify(""));

    const { result } = renderHook(() => useLogout());

    act(() => {
      result.current.fetchLogout();
    });

    await waitFor(() => {
      expect(fetch.mock.calls[0][0]).toMatch(
        "http://test.com/api/v1/users/sign_out"
      );
      expect(JSON.stringify(fetch.mock.calls[0][1])).toBe(
        JSON.stringify({
          method: "DELETE",
          mode: "cors",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: "{}",
        })
      );
    });
  });

  it("returns data and fetchLogin function when API call is successful", async () => {
    global.fetch = () =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            data: { mock: "data" },
          }),
      });

    const { result } = renderHook(() => useLogout());

    act(() => {
      result.current.fetchLogout();
    });

    await waitFor(() => {
      expect(result.current.error).not.toBeDefined();
      expect(JSON.stringify(result.current.data)).toBe(
        JSON.stringify({ mock: "data" })
      );
      expect(mockLogOut).toHaveBeenCalled();
    });
  });

  it("returns error when API call fails", async () => {
    global.fetch = () =>
      Promise.resolve({
        ok: false,
        json: () =>
          Promise.resolve({
            error: "something was wrong",
          }),
      });

    const { result } = renderHook(() => useLogout());

    act(() => {
      result.current.fetchLogout();
    });

    await waitFor(() => {
      expect(result.current.error).toBe("something was wrong");
      expect(result.current.data).not.toBeDefined();
      expect(mockLogOut).not.toHaveBeenCalled();
    });
  });
});
