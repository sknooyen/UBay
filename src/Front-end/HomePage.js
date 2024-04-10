import React from 'react';
import ListingsLayout from './ListingsLayout';


const HomePage = () => {

  const temp_listings = [
    { id: 1, title: 'CS 121 Textbook', category: 'Books', description: 'So many pages—all so exciting!', condition: 'Like New', price: 15, imageUrl: 'https://via.placeholder.com/150', postDate: '2024-03-28' },
    { id: 2, title: 'Chair', category: 'Furniture', description: 'Good for sitting in. Excellent for dancing on.', condition: 'Very Good', price: 50, imageUrl: 'https://via.placeholder.com/150', postDate: '2024-03-27' },
    { id: 3, title: 'MacBook Pro', category: 'Electronics', description: 'Still in its original box. Decided to give up on my CS degree, so I never ended up using this.', condition: 'New', price: 500, imageUrl: 'https://via.placeholder.com/150', postDate: '2024-03-26' },
  ];

  return (
    <ListingsLayout title="Listings" listings={temp_listings}/>
  );
};

export default HomePage;
