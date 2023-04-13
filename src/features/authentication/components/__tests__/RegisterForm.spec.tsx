import {
  act,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import RegisterForm from "../RegisterForm";
import useRegister from "../../hooks/useRegister";
import userEvent from "@testing-library/user-event";

var mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(() => mockNavigate),
}));

let mockFetchRegister = jest.fn();

jest.mock("../../hooks/useRegister", () => ({
  __esModule: true,
  default: () => ({ data: [], error: null, fetchRegister: mockFetchRegister }),
}));

describe("RegisterForm", () => {
  it("renders the form inputs", () => {
    render(<RegisterForm />);

    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByLabelText("Password confirmation")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /register/i })
    ).toBeInTheDocument();
  });

  it("submits the form with user input", async () => {
    const { getByLabelText, getByRole } = render(<RegisterForm />);

    const emailInput = getByLabelText("Email");
    const passwordInput = getByLabelText("Password");
    const passwordConfirmationInput = screen.getByLabelText(
      "Password confirmation"
    );
    const registerButton = getByRole("button", { name: /register/i });

    userEvent.type(emailInput, "test@example.com");
    userEvent.type(passwordInput, "password");
    userEvent.type(passwordConfirmationInput, "password");
    userEvent.click(registerButton);

    await waitFor(() => {
      expect(mockFetchRegister).toHaveBeenCalledWith({
        user: {
          email: "test@example.com",
          password: "password",
          password_confirmation: "password",
        },
      });
    });
  });

  it("displays validation error message for password confirmation", async () => {
    const { getByLabelText, getByText, getByRole, container } = render(
      <RegisterForm />
    );

    const passwordInput = getByLabelText("Password");
    const passwordConfirmationInput = getByLabelText("Password confirmation");
    const registerButton = getByRole("button", { name: /register/i });

    userEvent.type(passwordInput, "password");
    userEvent.type(passwordConfirmationInput, "not the same");
    act(() => {
      userEvent.click(registerButton);
    })

    await waitFor(() => {
      const errorMessage = getByText("Password confirmation doesn't match");
      expect(errorMessage).toBeInTheDocument();
    });
  });
});
