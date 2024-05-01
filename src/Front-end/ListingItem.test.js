import { render, screen } from '@testing-library/react';
import ListingItem from './ListingItem'

const mock_listing = {
    category: ['Clothing'], 
    condition: "New", 
    createdAt: "2024-04-15T22:21:08.218Z", 
    description: "Expensive but cool, nice and comfy t-shirt",
    favorite_id: [],
    report_count: [],
    id: "K10",
    id_email: "shubscher@umass.edu",
    imageURL: ['https://monos.com/cdn/shop/products/Kiyo-UVC-Bottle-500ml-Blue-Hour_900x.png?v=1678603856'],
    postDate: "2 days ago",
    price: 50,
    title: "T-shirt",
    updatedAt: "2024-04-27T19:30:00.259Z",
    __v: 0,
    _id: "661da854a278bf134b7f1919"
}

test('renders listing item title', () => {
  render(<ListingItem listing={mock_listing}/>);
  const element = screen.getByText(mock_listing.title);
  expect(element).toBeInTheDocument();
});

test('renders condition', () => {
    render(<ListingItem listing={mock_listing}/>);
    const element = screen.getByText(mock_listing.description);
    expect(element).toBeInTheDocument();
});