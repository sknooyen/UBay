import React, {useEffect, useState} from 'react';
import ListingsLayout from './ListingsLayout';
import axios from 'axios';

const HomePage = () => {

  const [listings, setListings] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/products')
    .then(response => {
      console.log('Response:', response.data); // Log the response data
      setListings(response.data);
    })
    .catch(error => {
      console.error('Error fetching products:', error);
    });
  }, []);

  return (
    <ListingsLayout title="Listings" listings={listings}/>
  );
};

export default HomePage;
