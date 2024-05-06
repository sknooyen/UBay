import { useState, useEffect } from 'react';
import { Typography, Grid, Container, Paper, ThemeProvider, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { pageTheme } from "./util";
import ListingItem from './ListingItem';
import NavBar from "./NavBar";
import { useAuth, auth } from '../login/loginconfig';
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const currentUser = useAuth()
    const navigate = useNavigate();
    
    const [products, setProducts] = useState([]);
    const [deleteListing, setDeleteListing] = useState(null);

    const userEmail = auth.currentUser ? auth.currentUser.email : '';

    useEffect(() => {
        // Fetch products associated with userEmail
        fetch(`http://localhost:8000/api/products?id_email=${userEmail}`)
            .then(response => response.json())
            .then(data => {
                setProducts(data);
            })
            .catch(error => console.error('Error fetching products:', error));
    }, [userEmail]);

    const handleListingClick = (listing) => {
        console.log('Listing clicked (profile):', listing);
        // TODO: add logic when listing is clicked
    };

    // open edit listing page
    const handleEdit = (listing) => {
        const extension = '/sell/' + listing.id;
        navigate(extension);
    };

    const handleDelete = (listing) => {
        setDeleteListing(listing);
    };

    // delete the listing
    const handleConfirmDelete = () => {
        fetch(`http://localhost:8000/api/products/${deleteListing._id}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (response.ok) {
                // Remove the deleted listing from the state
                setProducts(prevProducts => prevProducts.filter(product => product.id !== deleteListing.id));
            } else {
                throw new Error('Failed to delete listing');
            }
        })
        .catch(error => {
            // Handle error
            console.error('Error deleting listing:', error);
        })
        .finally(() => {
            setDeleteListing(null); // Close the dialog
        });
    };

    const handleCloseDeleteDialog = () => {
        setDeleteListing(null); // close the delete dialog
    };

    return (
        currentUser && <ThemeProvider theme={pageTheme}>
            <NavBar />
            <div>
                <Container>
                    <Paper style={{ display: "flex", padding: '10px', margin: '10px' }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography variant="h4">{"My Listings"}</Typography>
                                {products.map((listing) => (
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
