import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LoginForm from "../LoginForm";
import useLogin from "../../hooks/useLogin";
import { Button } from "@mui/material";

var mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(() => mockNavigate),
}));

let mockFetchLogin = jest.fn();

jest.mock("../../hooks/useLogin", () => ({
  __esModule: true,
  default: () => ({ data: [], error: null, fetchLogin: mockFetchLogin }),
}));

describe("LoginForm", () => {
  it("renders the login form with email and password inputs", () => {
    render(<LoginForm />);
    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");
    const loginButton = screen.getByRole("button", { name: "Login" });

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
    expect(loginButton).toHaveProperty("type", "submit");
  });

  it("submits the form with the entered email and password when click login button", async () => {
    const { getByLabelText, getByRole } = render(<LoginForm />);

    const emailInput = getByLabelText("Email");
    const passwordInput = getByLabelText("Password");
    const loginButton = getByRole("button", { name: /login/i });

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(mockFetchLogin).toHaveBeenCalledWith({
        user: {
          email: "test@example.com",
          password: "password123",
        },
      });
    });
  });
});
