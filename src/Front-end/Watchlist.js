import ListingsLayout from "./ListingsLayout";
import { useAuth } from "../login/loginconfig";

const Watchlist = () => {
    const currentUser = useAuth()
    const temp_listings = [
        { id: 1, title: 'Fav CS 121 Textbook', category: ['Books'], description: 'So many pages—all so exciting!', condition: 'Like New', price: 15, imageURL: ['https://www.mrporter.com/variants/images/38063312418276845/in/w2000_q60.jpg'], postDate: '2024-03-28' },
        { id: 2, title: 'Fav Chair', category: ['Furniture'], description: 'Good for sitting in. Excellent for dancing on.', condition: 'Very Good', price: 50, imageURL: ['https://www.mrporter.com/variants/images/38063312418276845/in/w2000_q60.jpg'], postDate: '2024-03-27' },
      ];

    return (
        currentUser && <ListingsLayout title="Watchlist" listings={temp_listings}/>
      );
}

 export default Watchlist