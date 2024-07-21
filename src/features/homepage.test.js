import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom';
import Home from './homepage';
import fetchMock from 'jest-fetch-mock';

beforeEach(() => {
    fetchMock.resetMocks();
});


describe('Home component', () => {
    test('renders initial state correctly', async () => {

        await act(async () => render(<Home />, { wrapper: MemoryRouter }));

        await waitFor(() => {
            expect(screen.getByText(/Hello Sasha/i)).toBeInTheDocument();
            expect(screen.getByLabelText(/Not Checked/i)).toBeInTheDocument();
            const posts = screen.getAllByText(/post one/i);
            expect(posts.length).toBe(1); // Adjust this according to your expected output
            expect(screen.getByText(/post Two/i)).toBeInTheDocument();
        });
    });

    test('changes name on button click', async () => {
        await act(async () => render(<Home />, { wrapper: MemoryRouter }));
        fireEvent.click(screen.getByText('Sneha'));
        expect(screen.getByText(/Hello Sneha/i)).toBeInTheDocument();
    });

    test('toggles checkbox state', async () => {
        await act(async () => render(<Home />, { wrapper: MemoryRouter }));
        const checkbox = screen.getByRole('checkbox');
        fireEvent.click(checkbox);
        expect(screen.getByLabelText(/Checked/i)).toBeInTheDocument();
    });

    test('adds a new post after async function call', async () => {
        fetchMock.mockResponseOnce(
            JSON.stringify([{ id: 1, title: 'post 3' }])
        );

        await act(async () => render(<Home />, { wrapper: MemoryRouter }));

        await waitFor(() => expect(screen.getByText(/post 3/i)).toBeInTheDocument(), {
            timeout: 3000,
        });
    });

    test('fetches and displays content from backend', async () => {
        fetchMock.mockResponseOnce(
            JSON.stringify([{ id: 1, title: 'Mocked post from backend' }])
        );

        await act(async () => render(<Home />, { wrapper: MemoryRouter }));

        await waitFor(() => expect(screen.getByText(/Mocked post from backend/i)).toBeInTheDocument());
    });

    test('renders links correctly', async () => {
        await act(async () => render(<Home />, { wrapper: MemoryRouter }));
        expect(screen.getByText('Home')).toHaveAttribute('href', '/');
        expect(screen.getByText('Reducer')).toHaveAttribute('href', '/reducer');
        expect(screen.getByText('Redux')).toHaveAttribute('href', '/redux');
        expect(screen.getByText('Messenger')).toHaveAttribute('href', '/messenger');
        expect(screen.getByText('Lazy')).toHaveAttribute('href', '/lazy');
    });
});
