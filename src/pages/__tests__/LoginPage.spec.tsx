import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginPage from "../LoginPage";

// mock useSearchParams hook
const mockNavigate = jest.fn();
const mockGetParams = jest.fn();

jest.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
  useSearchParams: () => [
    {
      get: (key: string) => mockGetParams(key),
    },
  ],
}));

describe("LoginPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render login form", () => {
    render(<LoginPage />);
    const loginForm = screen.getByTestId("login-form");
    expect(loginForm).toBeInTheDocument();
  });

  it("should show success message if register-success query param is true", () => {
    mockGetParams.mockImplementation((key) =>
      key === "register-success" ? "true" : null
    );
    render(<LoginPage />);
    const successMessage = screen.getByText(
      "Your account was created successfully, you can login to your account now"
    );
    expect(successMessage).toBeInTheDocument();
  });

  it("should navigate to register page when register button is clicked", () => {
    render(<LoginPage />);
    const registerButton = screen.getByRole("button", { name: /register/i });
    userEvent.click(registerButton);
    expect(mockNavigate).toHaveBeenCalledWith("/register");
  });
});
