import ListingsLayout from "./ListingsLayout";
import { useState, useEffect } from 'react';
import { auth } from "../login/loginconfig";

const Watchlist = () => {

    // const temp_listings = [
    //     { id: 1, title: 'Fav CS 121 Textbook', category: ['Books'], description: 'So many pages—all so exciting!', condition: 'Like New', price: 15, imageURL: ['https://www.mrporter.com/variants/images/38063312418276845/in/w2000_q60.jpg'], postDate: '2024-03-28' },
    //     { id: 2, title: 'Fav Chair', category: ['Furniture'], description: 'Good for sitting in. Excellent for dancing on.', condition: 'Very Good', price: 50, imageURL: ['https://www.mrporter.com/variants/images/38063312418276845/in/w2000_q60.jpg'], postDate: '2024-03-27' },
    //   ];

    const [products, setProducts] = useState([]);
    const userEmail = auth.currentUser ? auth.currentUser.email : '';

    // useEffect(() => {
    //     // Fetch products associated with userEmail
    //     fetch(`http://localhost:8000/api/favorite?id_email=${userEmail}`)
    //         .then(response => response.json())
    //         .then(data => {
    //             setProducts(data);
    //         })
    //         .catch(error => console.error('Error fetching products:', error));
    // }, [userEmail]);

    useEffect(() => {
        // Fetch all products from the backend
        fetch(`http://localhost:8000/api/products`)
            .then(response => response.json())
            .then(data => {
                // Filter products to only include those where userEmail is in favorite_id array
                const filteredProducts = data.filter(product => product.favorite_id.includes(userEmail));
                setProducts(filteredProducts);
            })
            .catch(error => console.error('Error fetching products:', error));
    }, [userEmail]);

    return (
        <ListingsLayout title="Watchlist" listings={products}/>
      );
}

 export default Watchlist