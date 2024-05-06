import ListingsLayout from "./ListingsLayout";
import { useState, useEffect } from 'react';
import { auth } from "../login/loginconfig";

const Watchlist = () => {

    const [products, setProducts] = useState([]);
    const userEmail = auth.currentUser ? auth.currentUser.email : '';

    // fetch user's favorited listings from database
    useEffect(() => {
        fetch(`http://localhost:8000/api/products?fav_of=${userEmail}`)
            .then(response => response.json())
            .then(data => {
                setProducts(data);
            })
            .catch(error => console.error('Error fetching products:', error));
    }, [userEmail]);

    return (
        // render the listings page using the favorited listings data
        <ListingsLayout title="Watchlist" listings={products}/>
      );
}

 export default Watchlist