import React, { useState, useEffect } from "react";
import { Button, Paper, IconButton, Container, Grid, ThemeProvider, Typography } from "@mui/material";
import { pageTheme } from "./util";
import { Favorite } from "@mui/icons-material";
import axios from "axios";
import NavBar from "./NavBar";
import { useParams, useNavigate } from "react-router-dom";

const ListingPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [listings, setListing] = useState([]);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/products/`)
      .then((response) => {
        setListing(response.data);
      })
      .catch((error) => {
        console.error("Error fetching listing details:", error);
      });
  }, [id]);

  const listing = listings.find((listing) => listing.id == id);

  // display loading screen while fetching listing
  if (!listing) {
    return <div>Loading...</div>;
  }

  const handleNextPhoto = () => {
    setCurrentPhotoIndex((prevIndex) => (prevIndex + 1) % listing.imageURL.length);
  };

  const handleMessageSeller = () => {
    // TODO: add logic here
  };

  const handlePreviousPhoto = () => {
    setCurrentPhotoIndex(
      (prevIndex) => (prevIndex - 1 + listing.imageURL.length) % listing.imageURL.length
    );
  };

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
    // TODO: add logic here
  };

  return (
    <ThemeProvider theme={pageTheme}>
      <NavBar />
      <div>
        <Container>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Paper style={{ position: "relative" }}>
                <Typography variant="h4" gutterBottom>{listing.title} – ${listing.price}</Typography>
                <IconButton
                  onClick={handleFavorite}
                  color={isFavorite ? "primary" : "default"}
                  style={{ position: "absolute", top: 0, right: 0, margin: "10px" }}
                >
                  <Favorite />
                </IconButton>
                <Typography variant="h8" fontStyle='oblique' gutterBottom>Posted by {listing.id_email.substring(0, listing.id_email.indexOf('@'))} on {listing.updatedAt.substring(0, 10)}</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <div
                        style={{
                        width: "100%",
                        marginTop: "10px",
                        height: "auto",
                        display: "flex",
                        justifyContent: "center",
                        }}
                    >
                        <div style={{ width: "fit-content" }}>
                        {listing.imageURL.length > 0 && (
                            <>
                            <img
                                src={listing.imageURL[currentPhotoIndex]}
                                alt={`Photo ${currentPhotoIndex + 1}`}
                                style={{ maxWidth: "100%", maxHeight: "400px", margin: "10px 0" }}
                            />
                            {listing.imageURL.length > 1 && (
                                <div
                                    style={{
                                    marginTop: "5px",
                                    display: "flex",
                                    justifyContent: "center",
                                    }}
                                >
                                <Button variant="contained" color="primary" onClick={handlePreviousPhoto} style={{ marginRight: "10px" }}>◄</Button>
                                <Button variant="contained" color="primary" onClick={handleNextPhoto}>►</Button>
                                </div>
                            )}
                            </>
                        )}
                        </div>
                    </div>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="h6"><strong>Description:</strong></Typography>
                    <Typography variant="h6" gutterBottom>{listing.description}</Typography>

                    <Typography variant="h6" gutterBottom><strong>Category:</strong> {listing.category}</Typography>
                    <Typography variant="h6" gutterBottom><strong>Condition:</strong> {listing.condition}</Typography>
                  </Grid>
                  <Grid container spacing={12}>
                  <Grid item xs={9}>
                  </Grid>
                  <Grid item xs={3}>
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={handleMessageSeller}
                        style={{ marginTop: "10px" }}
                        >
                        Message Seller
                    </Button>
                  </Grid>
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

export default ListingPage;
