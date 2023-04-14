import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { UserType } from '../../features/authentication/types';
import { AuthProvider, useAuthenticate } from '../AuthContext';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate
}));

describe('Auth', () => {
  describe('AuthProvider', () => {
    it('should render children components', () => {
      const children = <div>Test children</div>;
      render(<AuthProvider>{children}</AuthProvider>);
      expect(screen.getByText(/test children/i)).toBeInTheDocument();
    });

    it('should log in and log out user', () => {
      const TestComponent = () => {
        const { user, isAuthenticated, logInAs, logOut } = useAuthenticate();
        return (
          <div>
            <span data-testid="is-authenticated">{String(isAuthenticated())}</span>
            <button onClick={() => logInAs({ email: 'test@example.com' } as UserType)}>
              Log in
            </button>
            <button onClick={() => logOut()}>Log out</button>
            {user && <span data-testid="user-email">{user.email}</span>}
          </div>
        );
      };
      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );
      const isAuthenticatedSpan = screen.getByTestId('is-authenticated');
      const logInButton = screen.getByText(/log in/i);
      const logOutButton = screen.getByText(/log out/i);

      expect(isAuthenticatedSpan.textContent).toBe('false');

      userEvent.click(logInButton);
      expect(isAuthenticatedSpan.textContent).toBe('true');
      expect(screen.getByTestId('user-email')).toHaveTextContent('test@example.com');

      userEvent.click(logOutButton);
      expect(isAuthenticatedSpan.textContent).toBe('false');
      expect(screen.queryByTestId('user-email')).not.toBeInTheDocument();
    });
  });
});
