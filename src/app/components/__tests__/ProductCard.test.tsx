import { render, screen } from '@testing-library/react';
import ProductCard from '../ProductCard';


test('renders product name', () => {
  render(<ProductCard product={{ id: '1', name: 'Apple', image: '', price: 2.0, unit:'', description:'', stock:0 }} />);
  expect(screen.getByText(/Apple/i)).toBeDefined();
});