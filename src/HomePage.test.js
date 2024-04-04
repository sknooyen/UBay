import { render, screen } from '@testing-library/react';
import HomePage from './HomePage';
import { BrowserRouter } from 'react-router-dom';

test('renders listings title', () => {
  render(<BrowserRouter><HomePage /></BrowserRouter>);
  const element = screen.getByText("Listings");
  expect(element).toBeInTheDocument();
});
