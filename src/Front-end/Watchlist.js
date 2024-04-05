import ListingsLayout from "./ListingsLayout";

const Watchlist = () => {

    const temp_listings = [
        { id: 1, title: 'Fav CS 121 Textbook', category: 'Books', description: 'So many pages—all so exciting!', condition: 'Like New', price: 15, imageUrl: 'https://via.placeholder.com/150', postDate: '2024-03-28' },
        { id: 2, title: 'Fav Chair', category: 'Furniture', description: 'Good for sitting in. Excellent for dancing on.', condition: 'Very Good', price: 50, imageUrl: 'https://via.placeholder.com/150', postDate: '2024-03-27' },
      ];

    return (
        <ListingsLayout title="Watchlist" listings={temp_listings}/>
      );
}

 export default Watchlist