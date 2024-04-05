import React, { useState, useMemo, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Container, Grid, Paper, TextField, Button, ThemeProvider, List, ListItem, Checkbox, ListItemText, Slider, Input, MenuItem, Select } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import axios from 'axios';
import "./App.css"

const theme = createTheme({
  palette: {
    primary: {
      main: '#b2102f',
    },
    secondary: {
      main: '#6f252c',
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          padding: '15px',
          gap: '5px',
          margin: '1px',
          boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)',
        },
      },
    },
  },
});

const categories = ['Men', 'Women', 'Electronics', 'Clothing', 'Other'];
const conditions = ['New', 'Like New', 'Very Good', 'Good', 'Acceptable', 'Old', 'Normal'];
const sortingOptions = ['Best Match', 'Price: Low to High', 'Price: High to Low', 'Post Date: New to Old', 'Post Date: Old to New'];
const maxPrice = 500;

// const listings = [
//   { id: 1, title: 'CS 121 Textbook', category: 'Books', description: 'So many pages—all so exciting!', condition: 'Like New', price: 15, imageUrl: 'https://via.placeholder.com/150', postDate: '2024-03-28' },
//   { id: 2, title: 'Chair', category: 'Furniture', description: 'Good for sitting in. Excellent for dancing on.', condition: 'Very Good', price: 50, imageUrl: 'https://via.placeholder.com/150', postDate: '2024-03-27' },
//   { id: 3, title: 'MacBook Pro', category: 'Electronics', description: 'Still in its original box. Decided to give up on my CS degree, so I never ended up using this.', condition: 'New', price: 500, imageUrl: 'https://via.placeholder.com/150', postDate: '2024-03-26' },
// ];

const App = () => {
  const [checkedCategories, setCheckedCategories] = useState(categories);
  const [checkedConditions, setCheckedConditions] = useState(conditions);
  const [priceRange, setPriceRange] = useState([0, maxPrice]);
  const [sortBy, setSortBy] = useState('Best Match');
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

  // console.log('listings now:', listings);

  const filteredListings = useMemo(() => {
    let filteredListings = listings.filter(listing => 
      listing.category.some(category => checkedCategories.includes(category)) &&
      checkedConditions.includes(listing.condition) &&
      listing.price >= priceRange[0] && 
      listing.price <= priceRange[1]
    );

    console.log('Filtered listings:', filteredListings);

    // sort listings
    switch (sortBy) {
      case 'Price: Low to High':
        filteredListings.sort((a, b) => a.price - b.price);
        break;
      case 'Price: High to Low':
        filteredListings.sort((a, b) => b.price - a.price);
        break;
      case 'Post Date: New to Old':
        filteredListings.sort((a, b) => new Date(b.postDate) - new Date(a.postDate));
        break;
      case 'Post Date: Old to New':
        filteredListings.sort((a, b) => new Date(a.postDate) - new Date(b.postDate));
        break;
      default:
        // TODO: implement best match (right now it just displays everything in the arrays original order)

        break;
    }

    return filteredListings;
  }, [listings, checkedCategories, checkedConditions, priceRange, sortBy]);

  console.log("Start testing NOW2")
  console.log(filteredListings)

  const handleToggleCategory = (category) => () => {
    setCheckedCategories(prev => {
      if (prev.includes(category)) {
        return prev.filter(c => c !== category);
      } else {
        return [...prev, category];
      }
    });
  };

  const handleToggleCondition = (condition) => () => {
    setCheckedConditions(prev => {
      if (prev.includes(condition)) {
        return prev.filter(c => c !== condition);
      } else {
        return [...prev, condition];
      }
    });
  };

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const handlePriceInputChange = (index) => (event) => {
    const newPriceRange = [...priceRange];
    newPriceRange[index] = event.target.value === '' ? '' : Number(event.target.value);
    setPriceRange(newPriceRange);
  };

  const handlePriceInputBlur = (index) => () => {
    if (priceRange[index] < 0) {
      setPriceRange([0, priceRange[1]]);
    } else if (priceRange[index] > maxPrice) {
      setPriceRange([priceRange[0], maxPrice]);
    }
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleListingClick = (listing) => {
    console.log('Listing clicked:', listing);

    // TODO: add logic when listing is clicked
  };

  return (
    <ThemeProvider theme={theme}>
      <div>
        <AppBar position="sticky">
          <Toolbar>
            <Typography variant="h6" flexGrow={1}>UBay</Typography>
            <Button color="inherit">Home</Button>
            <Button color="inherit">Profile</Button>
            <Button color="inherit">Watchlist</Button>
            <Button color="inherit">Sell</Button>
            <Button color="inherit">Messages</Button>
          </Toolbar>
        </AppBar>

        <Container>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <Paper>
                <Typography variant="h6">Sort by</Typography>
                <Select
                  value={sortBy}
                  onChange={handleSortChange}
                  fullWidth
                >
                  {sortingOptions.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </Paper>

              <Paper>
                <Typography variant="h6">Categories</Typography>
                <List>
                  {categories.map((category) => (
                    <ListItem key={category} button onClick={handleToggleCategory(category)}>
                      <Checkbox
                        edge="start"
                        checked={checkedCategories.indexOf(category) !== -1}
                        tabIndex={-1}
                        disableRipple
                      />
                      <ListItemText primary={category} />
                    </ListItem>
                  ))}
                </List>
              </Paper>

              <Paper>
                <Typography variant="h6">Price range</Typography>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs>
                    <Slider
                      value={priceRange}
                      onChange={handlePriceChange}
                      valueLabelDisplay="auto"
                      aria-labelledby="range-slider"
                      min={0}
                      max={maxPrice}
                    />
                  </Grid>
                  <Grid item>
                    <Input
                      value={priceRange[0]}
                      onChange={handlePriceInputChange(0)}
                      onBlur={handlePriceInputBlur(0)}
                      inputProps={{
                        type: 'number',
                        'aria-labelledby': 'range-slider',
                        min: 0,
                        max: maxPrice,
                        step: 1,
                      }}
                    />
                  </Grid>
                  <Grid item>-</Grid>
                  <Grid item>
                    <Input
                      value={priceRange[1]}
                      onChange={handlePriceInputChange(1)}
                      onBlur={handlePriceInputBlur(1)}
                      inputProps={{
                        type: 'number',
                        'aria-labelledby': 'range-slider',
                        min: 0,
                        max: maxPrice,
                        step: 1,
                      }}
                    />
                  </Grid>
                </Grid>
              </Paper>

              <Paper>
                <Typography variant="h6">Conditions</Typography>
                <List>
                  {conditions.map((condition) => (
                    <ListItem key={condition} button onClick={handleToggleCondition(condition)}>
                      <Checkbox
                        edge="start"
                        checked={checkedConditions.indexOf(condition) !== -1}
                        tabIndex={-1}
                        disableRipple
                      />
                      <ListItemText primary={condition} />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </Grid>

            <Grid item xs={9}>
              <Paper>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Paper style={{ display: 'flex', alignItems: 'center' }}>
                      <TextField label="Search" variant="standard" style={{ flex: 1 }} />
                      <Button variant="contained" color="primary">Go</Button>
                    </Paper>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="h4">Listings</Typography>
                    {filteredListings.length > 0 ? (
                      filteredListings.map((listing) => (
                        <div
                          key={listing.id}
                          onClick={() => handleListingClick(listing)}
                          style={{ cursor: 'pointer' }}
                        >
                          <Paper style={{ display: 'flex', alignItems: 'center', padding: '10px', marginBottom: '10px' }}>
                            <img src={"https://via.placeholder.com/150"} alt={listing.title} style={{ marginRight: '10px' }} />
                            <div>
                              <Typography variant="h6" style={{ fontWeight: 'bold' }}>{listing.title}</Typography>
                              <Typography variant="subtitle1" style={{ marginBottom: '5px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '300px' }}>{listing.description}</Typography>
                              <Typography variant="subtitle2">Condition: {listing.condition}</Typography>
                              <Typography variant="subtitle2">Price: ${listing.price}</Typography>
                            </div>
                          </Paper>
                        </div>
                      ))
                    ) : (
                      <Typography variant="subtitle1">No listings found.</Typography>
                    )}
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </div>
    </ThemeProvider>
  );
};

export default App;

// Testing the connection backend frontend

// import React, { useState, useEffect } from 'react';

// function ProductDisplay() {
//     const [products, setProducts] = useState([]);

//     useEffect(() => {
//         fetch('http://localhost:8000/api/products')
//             .then(response => response.json())
//             .then(data => setProducts(data))
//             .catch(error => console.error('Error fetching data:', error));
//     }, []);

//     return (
//         <div>
//             {products.map(product => (
//                 <div key={product._id}>
//                     <h2>{product.title}</h2>
//                     <p>Description: {product.desc}</p>
//                     <p>Price: ${product.price}</p>
//                     <p>Size: {product.size}</p>
//                     <p>Color: {product.color}</p>
//                     <p>Categories: {product.categories.join(', ')}</p>
//                     <img src={product.img} alt={product.title} />
//                 </div>
//             ))}
//         </div>
//     );
// }

// export default ProductDisplay;