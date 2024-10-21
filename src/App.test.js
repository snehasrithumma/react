import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { AuthProvider } from './Context/authContext';

// Mocking AppRoute
jest.mock('./approute', () => () => <div>Mocked AppRoute</div>);

describe('App Component', () => {

  test('renders App with AuthProvider', () => {
    render(
      <AuthProvider>
        <App />
      </AuthProvider>
    );
    // Check if AuthProvider is rendering without issues
    expect(screen.getByText('Mocked AppRoute')).toBeInTheDocument();
  });
});
