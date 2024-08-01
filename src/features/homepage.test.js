import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Home from './homepage';
import { AuthProvider } from '../Context/authContext';
import { MemoryRouter } from 'react-router-dom';
import useFetch from './customHook/useFetch';
import useAuth from './customHook/useAuth';

// Mock the custom useFetch hook
jest.mock('./customHook/useFetch');
const { userEmail } = useAuth() || {};

describe('Home Component', () => {
    test('renders initial state correctly', async () => {

        render(<Home />, { wrapper: MemoryRouter });

        expect(screen.getByText(/Hello sneha@gmail.com/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Not Checked/i)).toBeInTheDocument();
        const posts = screen.getAllByText(/post one/i);
        expect(posts.length).toBe(1); // Adjust this according to your expected output
        expect(screen.getByText(/post Two/i)).toBeInTheDocument();

    });
});
