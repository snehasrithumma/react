import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Home from './homepage';
import { useAuth } from '../Context/authContext';
import useFetch from './customHook/useFetch';
import { BrowserRouter as Router } from 'react-router-dom'; // Mock router context

// Mocking the authContext
jest.mock('../Context/authContext', () => ({
    useAuth: jest.fn(),
}));

// Mocking the useFetch default export
jest.mock('./customHook/useFetch', () => ({
    __esModule: true,
    default: jest.fn(),
}));

describe('Home Component', () => {
    beforeEach(() => {
        // Mocking useAuth to return a fake user email
        useAuth.mockReturnValue({ userEmail: 'test@example.com' });

        // Mocking useFetch to return some test data
        useFetch.mockReturnValue({
            contentList: [{ id: 1, title: 'Test Post' }],
            loading: false,
            error: null,
        });
    });

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

        expect(screen.getByText('Content 1')).toBeInTheDocument();
        expect(screen.getByText('Content 2')).toBeInTheDocument();
    });

    test('search and highlight text correctly', () => {
        render(
            <Router>
                <Home />
            </Router>);

        // Change the input value and click the search button
        fireEvent.change(screen.getByLabelText('TEXT:'), { target: { value: 'load' } });
        fireEvent.click(screen.getByText(''));

        // Assert that the text was highlighted
        const textDiv = screen.getByText(/The load event fires/i);
        expect(textDiv.innerHTML).toContain('<span class="highlight">load</span>');
    });
});