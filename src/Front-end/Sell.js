import NavBar from "./NavBar";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TextField, Button, Snackbar, Paper, Container, MenuItem, Grid, ThemeProvider, Typography } from "@mui/material";
import { CATEGORIES, CONDITIONS, pageTheme } from "./util";
import axios from 'axios';
import { useAuth, auth } from "../login/loginconfig";

const Sell = () => {
  const currentUser = useAuth()
  const { id } = useParams();
  const navigate = useNavigate();
  
  const userEmail = auth.currentUser ? auth.currentUser.email : '';
  const [listings, setListing] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("");
  const [photos, setPhotos] = useState([]);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [alertMessage, setAlertMessage] = useState("");

  // max file size for uploads
  const maxSize = "500 kB";

  // crop image to square from center
  const cropImageToSquare = (imageSrc, size) => {
    return new Promise((resolve) => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();
      img.onload = () => {
        const aspect = img.width / img.height;
        let width, height, xOffset, yOffset;
        if (aspect > 1) {
          width = img.height;
          height = img.height;
          xOffset = (img.width - img.height) / 2;
          yOffset = 0;
        } else {
          width = img.width;
          height = img.width;
          xOffset = 0;
          yOffset = (img.height - img.width) / 2;
        }
        canvas.width = size;
        canvas.height = size;
        ctx.drawImage(img, xOffset, yOffset, width, height, 0, 0, size, size);
        resolve(canvas.toDataURL());
      };
      img.src = imageSrc;
    });
  };

  // handle photo change
  const handlePhotoChange = async (e) => {
    const files = Array.from(e.target.files); // convert FileList to array
    const croppedPhotos = await Promise.all(
      files.map(async (file) => {
        const croppedImage = await cropImageToSquare(
          URL.createObjectURL(file),
          300
        );
        return croppedImage;
      })
    );
    setPhotos(croppedPhotos);
    setCurrentPhotoIndex(0); // reset current photo index when new photos are selected
  };

  const handleNextPhoto = () => {
    setCurrentPhotoIndex((prevIndex) => (prevIndex + 1) % photos.length);
  };

  const handlePreviousPhoto = () => {
    setCurrentPhotoIndex(
      (prevIndex) => (prevIndex - 1 + photos.length) % photos.length
    );
  };

  const handleCloseAlertMessage = () => {
    setAlertMessage("");
  };

  const handlePost = () => {
    if (title && price && description && category && condition && photos.length === 0) {
      // if only the photo is missing, alert
      setAlertMessage("⚠️ Listings must contain at least one photo.");
    } else if (!title || !price || !description || !category || !condition || photos.length === 0) {
      // if any component is missing, alert
      setAlertMessage("⚠️ All fields are required to create a listing.");
    } else {
      console.log({ title, price, description, category, condition, photos });
      // Get the email here
      const userEmail = auth.currentUser ? auth.currentUser.email : '';
      // Upload to back-end
      const data = {
        title,
        category: [category], // Ensure category is sent as an array as per backend schema
        description,
        condition,
        price: parseFloat(price), // Parse price as a number
        imageURL: photos,
        id_email: userEmail,
        favorite_id: [],
        report_id: []
      }

      // This needs to be async, upload then clean
      axios.post('http://localhost:8000/api/products', data).then(res => {
        // clear the form fields
        setTitle("");
        setPrice("");
        setDescription("");
        setCategory("");
        setCondition("");
        setPhotos([]);
        setCurrentPhotoIndex(0);

        // notify user that their listing was posted
        setAlertMessage("✅ Listing posted succesfully.");
      }).catch(error => {
        console.error('Error posting data:', error);

        // alert user of post failure -- if payload is too large, explain that
        if (error.response.status === 413) {
          setAlertMessage("⚠️ Error posting listing. Please upload images less than " + maxSize + " in total.");
        } else {
          setAlertMessage("⚠️ Error posting listing. Please try again.");
        }
      });
    }
  };

  const handleCancel = () => {
    navigate('/home')
  };

  const handleDelete = () => {
    if (listing && listing._id) {
      axios.delete(`http://localhost:8000/api/products/${listing._id}`)
        .then(() => {
          // Clear form fields
          setTitle("");
          setPrice("");
          setDescription("");
          setCategory("");
          setCondition("");
          setPhotos([]);
          setCurrentPhotoIndex(0);
          setAlertMessage("✅ Listing deleted successfully.");
          navigate('/home');
        })
        .catch((error) => {
          console.error("Error deleting listing:", error);
          setAlertMessage("⚠️ Error deleting listing. Please try again.");
        });
    }
  };

  const handleUpdate = () => {
    if (listing && listing._id) {
      const data = {
        title,
        category: category,
        description,
        condition,
        price: parseFloat(price),
        imageURL: photos,
        id_email: userEmail,
        favorite_id: [],
        report_count: []
      };
  
      axios.put(`http://localhost:8000/api/products/${listing._id}`, data)
        .then(() => {
          setAlertMessage("✅ Listing updated successfully.");
          navigate('/home')
        })
        .catch((error) => {
          console.error("Error updating listing:", error);
          setAlertMessage("⚠️ Error updating listing. Please try again.");
        });
    }
  };

  // if id is in url, load all listings
  useEffect(() => {
    if(id) {
      axios
        .get(`http://localhost:8000/api/products/`)
        .then((response) => {
          setListing(response.data);
          const listing = response.data.find((listing) => listing.id === id);

          // update fields to contain listing information
          if (listing) {
            setTitle(listing.title);
            setPrice(listing.price);
            setDescription(listing.description);
            setCategory(listing.category);
            setCondition(listing.condition);
            setPhotos(listing.imageURL);
          }
        })
        .catch((error) => {
          console.error("Error fetching listing details:", error);
        });
    } else {
      setTitle("");
      setPrice("");
      setDescription("");
      setCategory("");
      setCondition("");
      setPhotos([]);
      setEditMode(false);
    }
  }, [id]);

  const listing = listings.find((listing) => listing.id === id);

  // if not authorized owner of this listing, go back to home page, otherwise, set to edit mode
  useEffect(() => {
    if (listing && !(listing.id_email === userEmail)) {
      navigate('/home');
    } else {
      if (listing) {
        setEditMode(true)
      }
    }
  }, [listing, userEmail, navigate]);

  return (
    currentUser &&
    <ThemeProvider theme={pageTheme}>
      <NavBar />
      <div>
      <Container>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Paper>
            <TextField
              label="Listing Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              fullWidth
              margin="normal"
            />
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    multiple // allow selecting multiple photos
                    style={{ display: "none" }}
                    id="upload-photo-input"
                  />
                  <label htmlFor="upload-photo-input">
                    <Button
                      variant="contained"
                      component="span"
                      color="primary"
                      fullWidth
                      style={{ marginTop: "10px" }}
                    >
                      Choose Photos
                    </Button>
                  </label>
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
                      {photos.length > 0 && (
                        <>
                          <img
                            src={photos[currentPhotoIndex]}
                            alt={`Selected ${currentPhotoIndex + 1}`}
                            style={{ maxWidth: "100%", height: "auto" }}
                          />
                          {photos.length > 1 && (
                            <div
                              style={{
                                marginTop: "5px",
                                display: "flex",
                                justifyContent: "center",
                              }}
                            >
                              <Button
                                variant="contained"
                                color="primary"
                                onClick={handlePreviousPhoto}
                                style={{ marginRight: "10px" }}
                              >
                                ◄
                              </Button>
                              <Button
                                variant="contained"
                                color="primary"
                                onClick={handleNextPhoto}
                              >
                                ►
                              </Button>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Price"
                  value={price}
                  onChange={(e) => {
                    let value = e.target.value.replace(/[^0-9.]/g, ""); // allow only ints and decimals
                    const parts = value.split(".");
                    if (parts.length > 1) {
                      // take only the first two decimal places
                      value = parts[0] + "." + parts[1].slice(0, 2);
                    }
                    setPrice(value);
                  }}
                  InputProps={{
                    startAdornment: (
                      <Typography
                        variant="subtitle1"
                        style={{ marginRight: "5px" }}
                      >
                        $
                      </Typography>
                    ),
                  }}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Description"
                  multiline
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  select
                  label="Category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  fullWidth
                  margin="normal"
                >
                  {CATEGORIES.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  select
                  label="Condition"
                  value={condition}
                  onChange={(e) => setCondition(e.target.value)}
                  fullWidth
                  margin="normal"
                >
                  {CONDITIONS.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
                {editMode ? ( // render cancel, delete, and update buttons if editMode is true
                    <>
                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <Button
                        variant="contained"
                        color="grey"
                        onClick={handleCancel}
                        style={{ width: "30%" }}
                        >
                        Cancel
                        </Button>
                        <Button
                        variant="contained"
                        color="grey"
                        onClick={handleDelete}
                        style={{ width: "30%" }}
                        >
                        Delete
                        </Button>
                        <Button
                        variant="contained"
                        color="primary"
                        onClick={handleUpdate}
                        style={{ width: "30%" }}
                        >
                        Update
                        </Button>
                    </div>
                    </>
                  ) : ( // otherwise, render Post button
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handlePost}
                      fullWidth
                    >
                      Post
                    </Button>
                  )}                  
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

export default Sell;
