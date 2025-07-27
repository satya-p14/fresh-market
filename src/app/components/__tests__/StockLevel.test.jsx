import { render, screen } from '@testing-library/react';
import StockLevel from '../StockLevel';
import useSWR from 'swr';

jest.mock('swr');

describe('StockLevel', () => {
    const productId = 1;

    it('shows loading state', () => {
        useSWR.mockReturnValue({ data: undefined, error: undefined, isLoading: true });

        render(<StockLevel productId={productId} />);
        expect(screen.getByText(/loading/i)).toBeInTheDocument();
    });

    it('shows error state', () => {
        useSWR.mockReturnValue({ data: undefined, error: new Error('Failed to load') });

        render(<StockLevel productId={productId} />);
        expect(screen.getByText(/error/i)).toBeInTheDocument();
    });

    it('shows stock count', () => {
        useSWR.mockReturnValue({ data: { stock: 7 }, error: undefined });

        render(<StockLevel productId={productId} />);
        expect(screen.getByText(/In stock: 7/i)).toBeInTheDocument();
    });
});
