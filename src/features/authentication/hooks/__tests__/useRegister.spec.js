import { act, render, screen, waitFor } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import useRegister from "../useRegister";
import useFetch from "../../../../hooks/useFetch";

import { AuthProvider } from "../../../../contexts/AuthContext";
import { enableFetchMocks } from "jest-fetch-mock";
enableFetchMocks();

var mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

describe("useRegister", () => {
  it("call API with correct url and method", async () => {
    fetch.resetMocks();
    fetch.mockResponse(
      JSON.stringify({ data: { user: { email: "user_test@mail.com" } } })
    );

    const wrapper = ({ children }) => <AuthProvider>{children}</AuthProvider>;
    const { result } = renderHook(() => useRegister({ onSuccess: jest.fn() }), {
      wrapper,
    });

    act(() => {
      result.current.fetchRegister({
        user: {
          email: "email@mail.com",
          password: "password",
          password_confirmation: "password",
        },
      });
    });

    await waitFor(() => {
      expect(fetch.mock.calls[0][0]).toMatch("http://test.com/api/v1/users");
      expect(JSON.stringify(fetch.mock.calls[0][1])).toBe(
        JSON.stringify({
          method: "POST",
          mode: "cors",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: '{"user":{"email":"email@mail.com","password":"password","password_confirmation":"password"}}',
        })
      );
    });
  });

  it("returns data and fetchRegister function when API call is successful", async () => {
    const user = { email: "test@example.com", password: "123456" };

    global.fetch = () =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            data: { user: { email: "test@example.com" } },
          }),
      });

    const onSuccess = jest.fn();
    const wrapper = ({ children }) => <AuthProvider>{children}</AuthProvider>;
    const { result } = renderHook(() => useRegister({ onSuccess: onSuccess }), {
      wrapper,
    });

    act(() => {
      result.current.fetchRegister({
        user: {
          email: user.email,
          password: user.password,
          password_confirmation: user.password,
        },
      });
    });

    await waitFor(() => {
      expect(result.current.error).not.toBeDefined();
      expect(JSON.stringify(result.current.data)).toBe(
        JSON.stringify({ user: { email: user.email } })
      );
      expect(onSuccess).toHaveBeenCalled();
    });
  });

  it("returns error when API call fails", async () => {
    const user = { email: "test@example.com", password: "123456" };

    global.fetch = () =>
      Promise.resolve({
        ok: false,
        json: () =>
          Promise.resolve({
            error: "Email was taken already",
          }),
      });

    const wrapper = ({ children }) => <AuthProvider>{children}</AuthProvider>;
    const { result } = renderHook(() => useRegister({ onSuccess: jest.fn() }), {
      wrapper,
    });

    act(() => {
      result.current.fetchRegister({
        user: {
          email: user.email,
          password: user.password,
        },
      });
    });

    await waitFor(() => {
      expect(result.current.error).toBe("Email was taken already");
      expect(result.current.data).not.toBeDefined();
    });
  });
});
