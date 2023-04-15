import { act, waitFor } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import useLogin from "../useLogin";
import { enableFetchMocks } from "jest-fetch-mock";
enableFetchMocks();

var mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

var mockLogInAs = jest.fn();

jest.mock("../../../../contexts/AuthContext", () => ({
  ...jest.requireActual("../../../../contexts/AuthContext"),
  useAuthenticate: () => ({ logInAs: mockLogInAs }),
}));

describe("useLogin", () => {
  it("call API with correct url and method", async () => {
    fetch.resetMocks();
    fetch.mockResponse(
      JSON.stringify({ data: { user: { email: "user_test@mail.com" } } })
    );

    const { result } = renderHook(() => useLogin());

    act(() => {
      result.current.fetchLogin({
        user: {
          email: "email@mail.com",
          password: "password",
        },
      });
    });

    await waitFor(() => {
      expect(fetch.mock.calls[0][0]).toBe(
        "http://test.com/api/v1/users/sign_in"
      );
      expect(JSON.stringify(fetch.mock.calls[0][1])).toBe(
        JSON.stringify({
          method: "POST",
          mode: "cors",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: '{"user":{"email":"email@mail.com","password":"password"}}',
        })
      );
    });
  });

  it("returns data and fetchLogin function when API call is successful", async () => {
    const user = { email: "test@example.com", password: "123456" };

    global.fetch = () =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            data: { user: { email: "test@example.com" } },
          }),
      });

    const { result } = renderHook(() => useLogin());

    act(() => {
      result.current.fetchLogin({
        user: {
          email: user.email,
          password: user.password,
        },
      });
    });

    await waitFor(() => {
      expect(result.current.error).not.toBeDefined();
      expect(JSON.stringify(result.current.data)).toBe(
        JSON.stringify({ user: { email: user.email } })
      );
      expect(mockLogInAs).toHaveBeenCalled();
    });
  });

  it("returns error when API call fails", async () => {
    const user = { email: "test@example.com", password: "123456" };

    global.fetch = () =>
      Promise.resolve({
        ok: false,
        json: () =>
          Promise.resolve({
            error: "wrong email or password",
          }),
      });

    const { result } = renderHook(() => useLogin());

    act(() => {
      result.current.fetchLogin({
        user: {
          email: user.email,
          password: user.password,
        },
      });
    });

    await waitFor(() => {
      expect(result.current.error).toBe("wrong email or password");
      expect(result.current.data).not.toBeDefined();
      expect(mockLogInAs).not.toHaveBeenCalled();
    });
  });
});
