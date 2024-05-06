## Front-end Files Overview

### JavaScript Files
- **HomePage.js**: Displays all listings. Users can search, filter, and sort. Clicking on a listing on this home page will lead users to ListingPage.js.
- **ListingItem.js**: Contains boilerplate for small listing item view on ListingsLayout.js.
- **ListingPage.js**: Displays buyer view of listing information (title, price, photos, description, category, and condition).
- **ListingsLayout.js**: Contains boilerplate for searching, filtering, etc. (used on HomePage.js and Watchlist.js).
- **Messages.js**: Displays messages. Users can toggle between all conversations on this page and send and receive messages.
- **NavBar.js**: Allows users to navigate between Home, Profile, Watchlist, Sell, and Messages. Contains a sign-out button.
- **Profile.js**: Displays all of a user's listings. Contains buttons for editting and deletion of each listing.
- **Sell.js**: Displays template for creating a listing. The code for the pages /sell/{id} for different listing IDs is also contained in this file. These pages are where users can edit their previously posted listings.
- **Watchlist.js**: Displays all listings that users marked with the heart button.
- **util.js**: Contains CATEGORIES, CONDITIONS, SORTING, and MAXPRICE exports used across the site as well as pageTheme, a Material UI custom theme.

### Test Files
- **ListingItem.test.js**
- **ListingsLayout.test.js**
- **NavBar.test.js**