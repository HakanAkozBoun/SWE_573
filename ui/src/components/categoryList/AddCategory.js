import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";

import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";



export default function AdCategory() {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  const location = useLocation();

  console.log(location.name)


  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);




    const formData = new FormData();
    formData.append("file", selectedFile);

    axios
      .post(`${process.env.REACT_APP_API_URL}/api/File/`, formData, {
        headers: {
          Authorization: `Basic ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response);
      });

    let dataPost


    if (location.state.edit === 1) {

      dataPost = {
        id: location.state.id,
        name: data.get("name"),
        image: selectedFile?"image/" + selectedFile.name:location.state.image,
      };
    } else {
      dataPost = {
        name: data.get("name"),
        image: "image/" + selectedFile.name,
      };
    }


    axios
      .post(`${process.env.REACT_APP_API_URL}/api/CreateCategory/`, dataPost, {
        headers: { Authorization: `Basic ${token}` },
      })
      .then((response) => {
        console.log(response);
        navigate("/");
      });
  };

  return (
    <React.Fragment>
      <Container maxWidth="lg">
        <Typography variant="h6" gutterBottom>
          Add Category
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
                defaultValue={location.state === null ? null : location.state.name}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <input type="file" id="file" onChange={handleFileChange} />
              {selectedFile && <p>Seçilen Dosya: {selectedFile.name}</p>}
            </Grid>

            <Grid item xs={12}>
              <Button type="submit" variant="contained">
                Save
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </React.Fragment>
  );
}
