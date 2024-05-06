import React, {useEffect, useState} from 'react';
import ListingsLayout from './ListingsLayout';
import axios from 'axios';

const HomePage = () => {

  const [listings, setListings] = useState([]);

  // fetch all listings data from the database
  useEffect(() => {
    axios.get('http://localhost:8000/api/products')
    .then(response => {
      setListings(response.data);
    })
    .catch(error => {
      console.error('Error fetching products:', error);
    });
  }, []);

  return (
    // render the listings homepage using the listings data
    <ListingsLayout title="Listings" listings={listings}/>
  );
};

export default HomePage;
