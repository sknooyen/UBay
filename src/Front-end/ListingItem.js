import React from 'react';
import { Typography, Paper } from '@mui/material';

// individual listing item
const ListingItem = ({ listing, handleListingClick }) => {
  return (
    <div
      key={listing.id}
      onClick={() => handleListingClick(listing)}
      style={{ cursor: 'pointer' }}
    >
      <Paper style={{ display: 'flex', alignItems: 'center', padding: '10px', marginBottom: '10px' }}>
        <img src={listing.imageURL[0]} alt={listing.title} style={{ marginRight: '10px', maxWidth: '100px', borderRadius: '10px'}} />
        <div>
          <Typography variant="h6" style={{ fontWeight: 'bold' }}>{listing.title}</Typography>
          <Typography variant="subtitle1" style={{ marginBottom: '5px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '300px' }}>{listing.description}</Typography>
          <Typography variant="subtitle2">Condition: {listing.condition}</Typography>
          <Typography variant="subtitle2">Price: ${listing.price}</Typography>
        </div>
      </Paper>
    </div>
  );
};

export default ListingItem;
