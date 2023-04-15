import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";

describe("App component", () => {
  it("should render the AppBar component", () => {
    render(<App />);
    const appBarElement = screen.getByTestId("responsive-app-bar");
    expect(appBarElement).toBeInTheDocument();
  });

  it("should render the HomePage component on the index route", () => {
    render(<App />);
    const homePageElement = screen.getByTestId("home-page");
    expect(homePageElement).toBeInTheDocument();
  });

  it("should render the LoginPage component on the login route", () => {
    window.history.pushState({}, "", "/login");

    render(<App />);

    const loginPageElement = screen.getByTestId("login-page");
    expect(loginPageElement).toBeInTheDocument();
  });

  it("should render the RegisterPage component on the register route", () => {
    window.history.pushState({}, "", "/register");

    render(<App />);

    const registerPageElement = screen.getByTestId("register-page");
    expect(registerPageElement).toBeInTheDocument();
  });
});
