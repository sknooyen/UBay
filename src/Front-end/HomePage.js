import React, {useEffect, useState} from 'react';
import ListingsLayout from './ListingsLayout';
import axios from 'axios';
import { useAuth } from '../login/loginconfig';

const HomePage = () => {

  const [listings, setListings] = useState([]);
  const currentUser = useAuth()

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
    currentUser && <ListingsLayout title="Listings" listings={listings}/>
  );
};

export default HomePage;
