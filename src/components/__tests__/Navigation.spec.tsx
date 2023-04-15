import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import ResponsiveAppBar from "../Navigation";

const mockFetchLogout = jest.fn();

jest.mock("../../features/authentication/hooks/useLogout", () => ({
  __esModule: true,
  default: () => ({ data: [], error: null, fetchLogout: mockFetchLogout }),
}));

describe("ResponsiveAppBar component", () => {
  const mockUser = {
    email: "testuser@example.com",
  };

  const mockIsAuthenticated = jest.fn().mockReturnValue(false);

  const setup = () => {
    render(
      <Router>
        <AuthContext.Provider
          value={{
            user: mockUser,
            isAuthenticated: mockIsAuthenticated,
            logInAs: jest.fn(),
            logOut: jest.fn(),
          }}
        >
          <ResponsiveAppBar />
        </AuthContext.Provider>
      </Router>
    );
  };

  it("should render the login button if the user is not authenticated", () => {
    setup();

    const welcomeMessage = screen.queryByRole(`Welcome ${mockUser.email}`);
    const logoutButton = screen.queryByRole("button", { name: /logout/i });
    const shareMovie = screen.queryByRole("button", { name: /share a movie/i });
    const loginButton = screen.getByRole("button", { name: /login \/ register/i });

    expect(welcomeMessage).not.toBeInTheDocument();
    expect(logoutButton).not.toBeInTheDocument();
    expect(shareMovie).not.toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });

  it("should render the logout button, share movie button and welcome message if the user is authenticated", () => {
    mockIsAuthenticated.mockReturnValue(true);
    setup();

    const welcomeMessage = screen.getByText(`Welcome ${mockUser.email}`);
    const logoutButton = screen.getByRole("button", { name: /logout/i });
    const shareMovie = screen.getByRole("button", { name: /share a movie/i });
    const loginButton = screen.queryByRole("button", { name: /login \/ register/i });

    expect(welcomeMessage).toBeInTheDocument();
    expect(logoutButton).toBeInTheDocument();
    expect(shareMovie).toBeInTheDocument();
    expect(loginButton).not.toBeInTheDocument();
  });

  it("should navigate to the login page when the login button is clicked", () => {
    setup();

    const loginButton = screen.getByRole("button", { name: /login \/ register/i });

    userEvent.click(loginButton);

    expect(window.location.pathname).toEqual("/login");
  });

  it("should call the fetchLogout function when the logout button is clicked", () => {
    mockIsAuthenticated.mockReturnValue(true);
    setup();

    const logoutButton = screen.getByRole("button", { name: /logout/i });

    userEvent.click(logoutButton);

    expect(mockFetchLogout).toHaveBeenCalled();
  });
});
