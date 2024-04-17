import { useState } from 'react';
import { Typography, Grid, Container, Paper, ThemeProvider, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { pageTheme } from "./util";
import ListingItem from './ListingItem';
import NavBar from "./NavBar";

const Profile = () => {
    // TODO: add actual name logic
    const name = "Professor Rattigan";

    const temp_listings = [
        { id: 1, title: 'Fav CS 121 Textbook', category: ['Books'], description: 'So many pages—all so exciting!', condition: 'Like New', price: 15, imageURL: ['https://www.mrporter.com/variants/images/38063312418276845/in/w2000_q60.jpg'], postDate: '2024-03-28' },
        { id: 2, title: 'Fav Chair', category: ['Furniture'], description: 'Good for sitting in. Excellent for dancing on.', condition: 'Very Good', price: 50, imageURL: ['https://www.mrporter.com/variants/images/38063312418276845/in/w2000_q60.jpg'], postDate: '2024-03-27' },
    ];

    const handleListingClick = (listing) => {
        console.log('Listing clicked (profile):', listing);
        // TODO: add logic when listing is clicked
    };

    const handleEdit = (listing) => {
        console.log('Edit clicked (profile):', listing);
        // TODO: add logic when listing is clicked
    };

    const [deleteListing, setDeleteListing] = useState(null);

    const handleDelete = (listing) => {
        setDeleteListing(listing);
    };

    const handleConfirmDelete = () => {
        console.log('Deletion confirmed (profile):', deleteListing);
        // TODO: add logic to delete the listing
        setDeleteListing(null); // Close the dialog
    };

    const handleCloseDeleteDialog = () => {
        setDeleteListing(null); // close the delete dialog
    };

    return (
        <ThemeProvider theme={pageTheme}>
            <NavBar />
            <div>
                <Container>
                    <Paper style={{ display: "flex", padding: '10px', margin: '10px' }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography variant="h4">{name + "'s Listings"}</Typography>
                                {temp_listings.map((listing) => (
                                    <Grid container key={listing.id} alignItems="center" spacing={2}>
                                        <Grid item xs={10}>
                                            <ListingItem listing={listing} handleListingClick={handleListingClick} />
                                        </Grid>
                                        <Grid item xs={2} container justifyContent="flex-end" spacing={1}>
                                            <Grid item>
                                                <Button variant="contained" onClick={() => handleEdit(listing)}>Edit</Button>
                                            </Grid>
                                            <Grid item>
                                                <Button variant="contained" onClick={() => handleDelete(listing)}>Delete</Button>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>
                    </Paper>
                </Container>
                <Dialog
                    open={Boolean(deleteListing)}
                    onClose={handleCloseDeleteDialog}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">Confirm Delete</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Are you sure you want to delete the listing "{deleteListing ? deleteListing.title : ''}"?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDeleteDialog} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handleConfirmDelete} color="primary" autoFocus>
                            Confirm
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </ThemeProvider>
    );
}

export default Profile;
