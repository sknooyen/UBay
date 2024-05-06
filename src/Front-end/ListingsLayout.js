import React, { useState, useMemo } from 'react';
import { Typography, Container, Grid, Paper, TextField, ThemeProvider, List, ListItem, Checkbox, ListItemText, Slider, Input, MenuItem, Select } from '@mui/material';
import {CATEGORIES, CONDITIONS, SORTING, MAXPRICE, pageTheme} from './util';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar'
import ListingItem from './ListingItem';
import { auth } from "../login/loginconfig";

const ListingsLayout = (props) => {
  const navigate = useNavigate();
  const userEmail = auth.currentUser ? auth.currentUser.email : '';
  const title = props.title;
  let listings = props.listings;
  const [checkedCategories, setCheckedCategories] = useState(CATEGORIES);
  const [checkedConditions, setCheckedConditions] = useState(CONDITIONS);
  const [priceRange, setPriceRange] = useState([0, MAXPRICE]);
  const [sortBy, setSortBy] = useState('Best Match');
  const [search, setSearch] = useState('');
  const [filteredListings, setFilteredListings] = useState([])

  // update the displayed listings based on filters
  useMemo(() => {
    // order based on sortBy dropdown
    switch (sortBy) {
      case 'Price: Low to High':
        listings.sort((a, b) => a.price - b.price);
        break;
      case 'Price: High to Low':
        listings.sort((a, b) => b.price - a.price);
        break;
      case 'Post Date: New to Old':
        listings.sort((a, b) => new Date(b.postDate) - new Date(a.postDate));
        break;
      case 'Post Date: Old to New':
        listings.sort((a, b) => new Date(a.postDate) - new Date(b.postDate));
        break;
      default:
        // TODO: implement best match (right now it just displays everything in the arrays original order)
        break;
    }
    // apply selected filters and search
    setFilteredListings(listings.filter(listing => 
      listing.category.some(category => checkedCategories.includes(category)) &&
      checkedConditions.includes(listing.condition) &&
      listing.price >= priceRange[0] && 
      listing.price <= priceRange[1] &&
      listing.title.toLowerCase().includes(search.toLowerCase())
    )
    );
  }, [checkedCategories, checkedConditions, priceRange, sortBy, listings, search]);

  // filter by category
  const handleToggleCategory = (category) => () => {
    setCheckedCategories(prev => {
      if (prev.includes(category)) {
        return prev.filter(c => c !== category);
      } else {
        return [...prev, category];
      }
    });
  };

  // filter by condition
  const handleToggleCondition = (condition) => () => {
    setCheckedConditions(prev => {
      if (prev.includes(condition)) {
        return prev.filter(c => c !== condition);
      } else {
        return [...prev, condition];
      }
    });
  };

  // filter by price
  const handlePriceChange = (_event, newValue) => {
    setPriceRange(newValue);
  };

  // filter by price
  const handlePriceInputChange = (index) => (event) => {
    const newPriceRange = [...priceRange];
    newPriceRange[index] = event.target.value === '' ? '' : Number(event.target.value);
    setPriceRange(newPriceRange);
  };

  const handlePriceInputBlur = (index) => () => {
    if (priceRange[index] < 0) {
      setPriceRange([0, priceRange[1]]);
    } else if (priceRange[index] > MAXPRICE) {
      setPriceRange([priceRange[0], MAXPRICE]);
    }
  };

  // filter by sort dropdown
  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  // open individual listing page
  const handleListingClick = (listing) => {
    var extension = '/'

    if (listing.id_email === userEmail) {
      extension = '/sell/' + listing.id;
    } else {
      extension = '/listing/' + listing.id;
    }

    navigate(extension);
  };

  return (
    <ThemeProvider theme={pageTheme}>
      <div>
        <NavBar />
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
                  {SORTING.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </Paper>

              <Paper>
                <Typography variant="h6">Categories</Typography>
                <List>
                  {CATEGORIES.map((category) => (
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
                      max={MAXPRICE}
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
                        max: MAXPRICE,
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
                        max: MAXPRICE,
                        step: 1,
                      }}
                    />
                  </Grid>
                </Grid>
              </Paper>

              <Paper>
                <Typography variant="h6">Conditions</Typography>
                <List>
                  {CONDITIONS.map((condition) => (
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
                      <TextField label="Search" variant="standard" style={{ flex: 1 }} onChange={(event) => setSearch(event.target.value)}/>
                    </Paper>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="h4">{title}</Typography>
                    {filteredListings.map((listing) => (
                      <ListingItem key={listing.id} listing={listing} handleListingClick={handleListingClick} />
                    ))}
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

export default ListingsLayout;
