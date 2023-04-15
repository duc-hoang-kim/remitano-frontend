import React  from 'react';
import { render } from "@testing-library/react";
import AnonymousPageWrapper from "../AnonymousPageWrapper";
import { Box } from "@mui/material";

const mockIsAuthenticated = jest.fn();

jest.mock("../../contexts/AuthContext", () => ({
  ...jest.requireActual("../../contexts/AuthContext"),
  isAuthentication: () => mockIsAuthenticated(),
}));

const mockNavigate = jest.fn()

jest.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

const setup = () => {
  return render(
    <AnonymousPageWrapper>
      <Box data-testid="test-page">Dummy page</Box>
    </AnonymousPageWrapper>
  );
};

describe("AnonymousPageWrapper", () => {
  it("navigates to root if user logged in", () => {
    mockIsAuthenticated.mockReturnValue(true);
    setup();
  });

  it("renders page if user didn't logged in", () => {
    mockIsAuthenticated.mockReturnValue(false);
    const { queryByTestId } = setup();

    const page = queryByTestId("test-page");

    expect(page).toBeInTheDocument();
  });
});
