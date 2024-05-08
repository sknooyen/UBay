import { render, screen } from '@testing-library/react';
import NavBar from './NavBar';
import { BrowserRouter } from 'react-router-dom';

jest.mock('../login/loginconfig', () => ({
    logOut: jest.fn(() => {
        return {}
    }),
}));

test('renders Home button', () => {
  render(<BrowserRouter><NavBar /></BrowserRouter>);
  const element = screen.getByRole('button', { name: 'Home' });
  expect(element).toBeInTheDocument();
});

test('renders Profile button', () => {
    render(<BrowserRouter><NavBar /></BrowserRouter>);
    const element = screen.getByRole('button', { name: 'Profile' });
    expect(element).toBeInTheDocument();
});

test('renders Watchlist button', () => {
    render(<BrowserRouter><NavBar /></BrowserRouter>);
    const element = screen.getByRole('button', { name: 'Watchlist' });
    expect(element).toBeInTheDocument();
});

test('renders Sell button', () => {
    render(<BrowserRouter><NavBar /></BrowserRouter>);
    const element = screen.getByRole('button', { name: 'Sell' });
    expect(element).toBeInTheDocument();
});

test('renders Messages button', () => {
    render(<BrowserRouter><NavBar /></BrowserRouter>);
    const element = screen.getByRole('button', { name: 'Messages' });
    expect(element).toBeInTheDocument();
});