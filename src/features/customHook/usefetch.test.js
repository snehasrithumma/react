import { renderHook, act, waitFor } from '@testing-library/react';
import useFetch from './useFetch';

// Mocking the fetch function
global.fetch = jest.fn();

describe('useFetch', () => {
    afterEach(() => {
        jest.clearAllMocks(); // Clear mocks after each test
    });

    test('should return loading true while fetching data', async () => {
        const { result } = renderHook(() => useFetch('https://api.example.com/data', 3, 1000));
        const { data, error, loading } = result.current;
        expect(loading).toBe(true); // Check loading state
        expect(data).toBe(null); // Loading should be false after the fetch
        expect(error).toBe(null);
    });

    it('should return data on successful fetch', async () => {
        const mockData = { message: 'Success' };
        fetch.mockResolvedValueOnce({
            ok: true,
            json: jest.fn().mockResolvedValueOnce(mockData),
        });

        const { result } = renderHook(() => useFetch('https://api.example.com/data', 3, 1000));

        await waitFor(() => {
            expect(result.current).toEqual({ data: mockData, loading: false, error: null });
        }) // Wait for the fetch to complete
    });

    it('should return an error', async () => {
        const errorMessage = new Error('Network Error'); // Keep it simple with a string
        fetch.mockRejectedValueOnce(errorMessage); // Mock fetch to reject with an error

        const { result } = renderHook(() => useFetch('https://api.example.com/data', 0, 1000));

        await waitFor(() => {
            expect(result.current).toEqual({ data: null, loading: false, error: errorMessage.message });
        }); // Wait for the fetch to complete
    });
});


describe("should abort the fetch request on unmount", () => {
    const mockedAbortController = {
        abort: jest.fn(),
    };

    beforeEach(() => {
        global.AbortController = jest.fn(() => mockedAbortController);
    });

    it("should abort the fetch request", async () => {
        const { unmount } = renderHook(() => useFetch());
        unmount();

        expect(mockedAbortController.abort).toHaveBeenCalled();
    });
});