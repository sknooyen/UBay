import { render, screen, fireEvent } from '@testing-library/react';
import ListingsLayout from './ListingsLayout'
import { BrowserRouter } from 'react-router-dom';

const mock_listing = [
    {
        category: ['Clothing'], 
        condition: "New", 
        createdAt: "2024-04-15T22:21:08.218Z", 
        description: "Expensive but cool, nice and comfy t-shirt",
        favorite_id: [],
        id: "K10",
        id_email: "shubscher@umass.edu",
        imageURL: ['https://monos.com/cdn/shop/products/Kiyo-UVC-Bottle-500ml-Blue-Hour_900x.png?v=1678603856'],
        postDate: "2 days ago",
        price: 50,
        title: "T-shirt",
        updatedAt: "2024-04-27T19:30:00.259Z",
        __v: 0,
        _id: "661da854a278bf134b7f1919"
    },
    {
        category: ['Books'], 
        condition: "Acceptable", 
        createdAt: "2024-04-15T22:21:08.218Z", 
        description: "Expensive but cool, nice and comfy t-shirt",
        favorite_id: [],
        id: "K10",
        id_email: "shubscher@umass.edu",
        imageURL: ['https://monos.com/cdn/shop/products/Kiyo-UVC-Bottle-500ml-Blue-Hour_900x.png?v=1678603856'],
        postDate: "2 days ago",
        price: 50,
        title: "Cool Book",
        updatedAt: "2024-04-27T19:30:00.259Z",
        __v: 0,
        _id: "661da854a278bf134b7f1918"
    }
]

jest.mock('firebase/auth', () => ({
    getAuth: jest.fn(() => {
        return {currentUser: {email: 'test@example.com'}}
    }),
    GoogleAuthProvider: jest.fn(),
}));

test('renders header title', () => {
    render(<BrowserRouter><ListingsLayout title="Listings" listings={mock_listing} /></BrowserRouter>);
    const element = screen.getByText("Listings");
    expect(element).toBeInTheDocument();
});

test('renders T-shirt listing', () => {
    render(<BrowserRouter><ListingsLayout title="Listings" listings={mock_listing} /></BrowserRouter>);
    const element = screen.getByText("T-shirt");
    expect(element).toBeInTheDocument();
});

test('renders Cool Book listing', () => {
    render(<BrowserRouter><ListingsLayout title="Listings" listings={mock_listing} /></BrowserRouter>);
    const element = screen.getByText("Cool Book");
    expect(element).toBeInTheDocument();
});

test('search filters correctly', () => {
    render(<BrowserRouter><ListingsLayout title="Listings" listings={mock_listing} /></BrowserRouter>);
    const searchInput = screen.getByLabelText('Search');
    fireEvent.change(searchInput, { target: { value: 'BOok' } });
    const t_shirt_element = screen.queryByText("T-shirt");
    const cool_book_element = screen.getByText("Cool Book");
    expect(t_shirt_element).toBeNull();
    expect(cool_book_element).toBeInTheDocument();
});

test('categories filter correctly', () => {
    render(<BrowserRouter><ListingsLayout title="Listings" listings={mock_listing} /></BrowserRouter>);
    const booksCategory = screen.getByRole('button', { name: 'Books' });
    fireEvent.click(booksCategory);
    const t_shirt_element = screen.getByText("T-shirt");
    const cool_book_element = screen.queryByText("Cool Book");
    expect(cool_book_element).toBeNull();
    expect(t_shirt_element).toBeInTheDocument();
});

test('conditions filter correctly', () => {
    render(<BrowserRouter><ListingsLayout title="Listings" listings={mock_listing} /></BrowserRouter>);
    const booksCategory = screen.getByRole('button', { name: 'New' });
    fireEvent.click(booksCategory);
    const t_shirt_element = screen.queryByText("T-shirt");
    const cool_book_element = screen.getByText("Cool Book");
    expect(t_shirt_element).toBeNull();
    expect(cool_book_element).toBeInTheDocument();
});