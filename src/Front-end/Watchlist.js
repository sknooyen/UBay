import ListingsLayout from "./ListingsLayout";
import { useAuth, auth } from "../login/loginconfig";
import { useState, useEffect } from 'react';


const Watchlist = () => {
    const currentUser = useAuth()

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
        currentUser &&
        // render the listings page using the favorited listings data
        <ListingsLayout title="Watchlist" listings={products}/>
      );
}

 export default Watchlist