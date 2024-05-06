import React, { useState, useEffect } from "react";
import { Button, Paper, Snackbar, IconButton, Container, Grid, ThemeProvider, Typography } from "@mui/material";
import { pageTheme } from "./util";
import { Favorite } from "@mui/icons-material";
import { Report } from "@mui/icons-material";
import axios from "axios";
import NavBar from "./NavBar";
import { useParams} from "react-router-dom";
import { useAuth, auth } from "../login/loginconfig";


const ListingPage = () => {
  const currentUser = useAuth();
  const userEmail = auth.currentUser ? auth.currentUser.email : '';
  const { id } = useParams();
  const [listing, setListing] = useState();
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isReport, setIsReport] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  // Get the product with the id
  useEffect(() => {
    axios.get(`http://localhost:8000/api/products?id=${id}`)
      .then((response) => {
        setListing(response.data);
      })
      .catch((error) => {
        console.error("Error fetching listing details:", error);
      });
  }, [id]);

  // set icon colors when listing loads
  useEffect(() => {
    if (listing) {
      setIsFavorite(listing.favorite_id.includes(userEmail));
      setIsReport(listing.report_count.includes(userEmail));
    }
  }, [listing, userEmail]);

  // display loading screen while fetching listing
  if (!listing) {
    return <div>Loading...</div>;
  }

  const handleNextPhoto = () => {
    setCurrentPhotoIndex((prevIndex) => (prevIndex + 1) % listing.imageURL.length);
  };

  const handlePreviousPhoto = () => {
    setCurrentPhotoIndex(
      (prevIndex) => (prevIndex - 1 + listing.imageURL.length) % listing.imageURL.length
    );
  };

  const handleMessageSeller = () => {
    // TODO: add logic here
  };

  const handleCloseAlertMessage = () => {
    setAlertMessage("");
  };

  const handleReport = () => {
    var updatedReport = [...listing.report_count];
    setIsReport(listing.report_count.includes(userEmail))

    // update depending on whether or not this product is already reported
    if (isReport) {
      updatedReport = [...listing.report_count].filter(email => email !== userEmail);
    } else {
      setAlertMessage("✅ Listing reported successfully. After ten reports, this listing will be removed.");
      updatedReport = [...listing.report_count, userEmail];
    }

    const reportData = {
      id: listing.id,
      title: listing.title,
      category: listing.category, // Ensure category is sent as an array as per backend schema
      description: listing.description,
      condition: listing.condition,
      price: listing.price,// Parse price as a number
      imageURL: listing.imageURL,
      id_email: listing.id_email,
      favorite_id: listing.favorite_id,
      report_count: updatedReport
    }

    // update database
    axios.put(`http://localhost:8000/api/products/${listing._id}`, reportData)
      .then(_response => {
        listing.report_count = updatedReport;
        setIsReport(!isReport)

        if (updatedReport.length >= 10) {
          axios.delete(`http://localhost:8000/api/products/${listing._id}`)
            .then(response => {
              // Perform additional actions needed after deletion
              console.log("Listing deleted:", response.data);
            })
            .catch(error => {
              console.error("Error deleting listing:", error);
            });
        }
      })
      .catch(error => {
        console.error("Error adding listing to Report:", error);
      });
  }

  // add item to watchlist
  const handleFavorite = () => {
    var updatedFavoriteId = ""

    setIsFavorite(listing.favorite_id.includes(userEmail))

    // update depending on whether or not this product is already favorited
    if (isFavorite) {
      updatedFavoriteId = [...listing.favorite_id].filter(email => email !== userEmail);
    } else {
      updatedFavoriteId = [...listing.favorite_id, userEmail];
    }

    const favoriteData = {
      id: listing.id,
      title: listing.title,
      category: listing.category, // Ensure category is sent as an array as per backend schema
      description: listing.description,
      condition: listing.condition,
      price: listing.price,// Parse price as a number
      imageURL: listing.imageURL,
      id_email: listing.id_email,
      report_count: listing.report_count,
      favorite_id: updatedFavoriteId
    }

    // update database
    axios.put(`http://localhost:8000/api/products/${listing._id}`, favoriteData)
      .then(response => {
        console.log("Favorites updated on listing:", response.data);
        listing.favorite_id = updatedFavoriteId
        setIsFavorite(!isFavorite)
      })
      .catch(error => {
        console.error("Error adding listing to favorites:", error);
      });
  };

  return (
    currentUser &&
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
                <IconButton
                  onClick={handleReport}
                  color={isReport ? "primary" : "default"}
                  style={{ position: "absolute", top: 0, right: 40, margin: "10px" }}
                >
                  <Report />
                </IconButton>
                <Typography variant="body2" style={{ position: "absolute", top: 40, right: 66 }}>{listing.report_count.length}</Typography>
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
                                alt={`${currentPhotoIndex + 1}`}
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
          <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={!!alertMessage}
            autoHideDuration={6000}
            onClose={handleCloseAlertMessage}
            message={alertMessage}
          />
        </Container>
      </div>
    </ThemeProvider>
  );
};

export default ListingPage;
