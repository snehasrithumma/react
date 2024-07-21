import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { act } from '@testing-library/react';

test('renders Welcome', async () => {
  await act(async () => render(<App />));
  expect(screen.getByText('Welcome')).toBeInTheDocument();
});
