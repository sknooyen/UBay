import React, { useState, useMemo, useEffect } from 'react';
import { Typography, Container, Grid, Paper, TextField, Button, ThemeProvider, List, ListItem, Checkbox, ListItemText, Slider, Input, MenuItem, Select } from '@mui/material';
import axios from 'axios';
import {CATEGORIES, CONDITIONS, SORTING, MAXPRICE, pageTheme, SortList} from './util'
import NavBar from './NavBar'

const ListingsLayout = (props) => {
  const {title, HomePage} = props

  const [checkedCategories, setCheckedCategories] = useState(CATEGORIES);
  const [checkedConditions, setCheckedConditions] = useState(CONDITIONS);
  const [priceRange, setPriceRange] = useState([0, MAXPRICE]);
  const [sortBy, setSortBy] = useState('Best Match');
  const [listings, setListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([])

  useEffect(() => {
    if(HomePage){
      axios.get('http://localhost:8000/api/products')
      .then(response => {
        console.log('Response:', response.data); // Log the response data
        setListings(response.data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
    }
  }, [HomePage]);

  useMemo(() => {
    console.log('printing')
    console.log(listings)
    setFilteredListings(SortList(listings.filter(listing => 
      listing.category.some(category => checkedCategories.includes(category)) &&
      checkedConditions.includes(listing.condition) &&
      listing.price >= priceRange[0] && 
      listing.price <= priceRange[1]
    )
    ), sortBy);
  }, [checkedCategories, checkedConditions, priceRange, sortBy, listings]);

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
    } else if (priceRange[index] > MAXPRICE) {
      setPriceRange([priceRange[0], MAXPRICE]);
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
                      <TextField label="Search" variant="standard" style={{ flex: 1 }} />
                      <Button variant="contained" color="primary">Go</Button>
                    </Paper>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="h4">{title}</Typography>
                    {filteredListings.map((listing) => (
                      <div
                        key={listing.id}
                        onClick={() => handleListingClick(listing)}
                        style={{ cursor: 'pointer' }}
                      >
                        <Paper style={{ display: 'flex', alignItems: 'center', padding: '10px', marginBottom: '10px' }}>
                          <img src={listing.imageUrl} alt={listing.title} style={{ marginRight: '10px' }} />
                          <div>
                            <Typography variant="h6" style={{ fontWeight: 'bold' }}>{listing.title}</Typography>
                            <Typography variant="subtitle1" style={{ marginBottom: '5px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '300px' }}>{listing.description}</Typography>
                            <Typography variant="subtitle2">Condition: {listing.condition}</Typography>
                            <Typography variant="subtitle2">Price: ${listing.price}</Typography>
                          </div>
                        </Paper>
                      </div>
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
