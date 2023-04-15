import React  from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RegisterPage from '../RegisterPage';

// mock useSearchParams hook
const mockNavigate = jest.fn();
const mockGetParams = jest.fn()

jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
  useSearchParams: () => ([{
    get: (key: string) => mockGetParams(key)
  }]),
}));

describe('RegisterPage', () => {
  it('should render register form', () => {
    render(<RegisterPage />);
    const registerForm = screen.getByTestId('register-form');
    expect(registerForm).toBeInTheDocument();
  });

  it('should navigate to login page when register button is clicked', () => {
    render(<RegisterPage />);
    const loginButton = screen.getByRole('button', { name: /login/i });
    userEvent.click(loginButton);
    expect(mockNavigate).toHaveBeenCalledWith('/login');
  });
});
