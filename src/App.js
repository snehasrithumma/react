import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './Context/authContext';
import AppRoute from './approute';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoute />
      </Router>
    </AuthProvider>
  );
}