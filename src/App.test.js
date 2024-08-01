import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { act } from '@testing-library/react';
import { AuthProvider } from './Context/authContext';

jest.mock('./approute', () => () => <div>Test Component</div>)

test('approutee component rendered correctly', async () => {
  expect(screen.getByText('Test Component')).toBeInTheDocument();
})


test('renders App with AuthProvider', () => {
  render(
    <AuthProvider>
      <App />
    </AuthProvider>
  );
  // Check if AuthProvider is rendering without issues
  expect(screen.getByText('Test Component')).toBeInTheDocument();
});
