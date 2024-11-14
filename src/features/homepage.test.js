import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Home from './homepage'; // adjust the path as needed
import { BrowserRouter as Router } from 'react-router-dom';
import { useAuth } from '../Context/authContext';
import useFetch from './customHook/useFetch';

jest.mock('../Context/authContext', () => ({
    useAuth: jest.fn(),
}));

jest.mock('./customHook/useFetch', () => ({
    __esModule: true,
    default: jest.fn(),
}));

beforeEach(() => {
    useAuth.mockReturnValue({ userEmail: 'test@example.com' });
    useFetch.mockReturnValue({
        contentList: [{ id: 1, title: 'Test Post' }],
        loading: false,
        error: null,
    });

    // Mock fetch API
    global.fetch = jest.fn(() =>
        Promise.resolve({
            json: () => Promise.resolve([{ postId: 1, id: 1, name: 'mock comment' }]),
        })
    );
});

afterEach(() => {
    jest.clearAllMocks();
});

describe('Home Component', () => {
    test('renders posts from useFetch', () => {
        // Wrap the component in Router or any necessary context
        render(
            <Router>
                <Home />
            </Router>
        );

        // Expect the post from useFetch to be in the document
        expect(screen.getByText('Test Post')).toBeInTheDocument();
    });

    test('displays user email from auth context', () => {
        render(
            <Router>
                <Home />
            </Router>
        );

        // Expect the user email from the auth context to be in the document
        expect(screen.getByText('Hello test@example.com')).toBeInTheDocument();
    });
    test('checkbox toggles correctly', () => {
        render(
            <Router>
                <Home />
            </Router>);
        const checkbox = screen.getByLabelText(/Not Checked/i);
        fireEvent.click(checkbox);
        expect(screen.getByLabelText(/Checked/i)).toBeInTheDocument();
    });

    test('renders fetched content from backend correctly', async () => {
        const mockContentList = [
            { id: 1, title: 'Content 1' },
            { id: 2, title: 'Content 2' },
        ];
        useFetch.mockReturnValue({ contentList: mockContentList, loading: false, error: null });

        render(
            <Router>
                <Home />
            </Router>);

        expect(screen.getByText('From Backend')).toBeInTheDocument();
        expect(screen.getByText('Content 1')).toBeInTheDocument();
        expect(screen.getByText('Content 2')).toBeInTheDocument();
    });

    test('No DATA', async () => {
        useFetch.mockReturnValue({ contentList: [], loading: true, error: null });

        render(
            <Router>
                <Home />
            </Router>);

        expect(screen.queryByText('From Backend')).not.toBeInTheDocument();
    });

    test('adds a post asynchronously on mount', async () => {
        render(
            <Router>
                <Home />
            </Router>
        );

        // Wait for the async post to appear
        await waitFor(() => {
            expect(screen.getByText('Test Post')).toBeInTheDocument();
        });
    });

    test('changes user email on button click', () => {
        render(
            <Router>
                <Home />
            </Router>
        );

        const changeUserButton = screen.getByText('Sneha');
        fireEvent.click(changeUserButton);
        expect(screen.getByText('Hello Sneha')).toBeInTheDocument();
    });

    // test('search input highlights text correctly', () => {
    //     render(
    //         <Router>
    //             <Home />
    //         </Router>
    //     );

    //     fireEvent.change(screen.getByLabelText('TEXT:'), { target: { value: 'load' } });
    //     fireEvent.click(screen.getByText('Search'));

    //     const textDiv = screen.getByText(/The load event fires/i);
    //     expect(textDiv.innerHTML).toContain('<span class="highlight">load</span>');
    // });

    test('renders link items correctly', () => {
        render(
            <Router>
                <Home />
            </Router>
        );

        // Check that a sample link item appears
        expect(screen.getByText('Home')).toBeInTheDocument();
        expect(screen.getByText('Reducer')).toBeInTheDocument();
    });
});