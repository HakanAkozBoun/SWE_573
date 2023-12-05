import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";

import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function UserEdit() {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  const id = sessionStorage.getItem("user");
  let name = "";
  let email = "";

  const [textValue, setTextValue] = useState(name);
  const [textValue2, setTextValue2] = useState(email);

  const handleChange = (event) => {
    setTextValue(event.target.value);
  };

  const handleChange2 = (event) => {
    setTextValue2(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        axios
          .get(`${process.env.REACT_APP_API_URL}/api/UserList/`, {
            headers: { Authorization: `Basic ${token}` },
          })
          .then((response) => {
            name = response.data.filter((item) => item.id === Number(id));

            setTextValue(name[0].first_name);
            setTextValue2(name[0].email);
          });
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    let dataPost = {
      id: id,
      user: textValue,
      mail: textValue2,
    };

    axios
      .put(`${process.env.REACT_APP_API_URL}/api/UpdateUser/`, dataPost, {
        headers: { Authorization: `Basic ${token}` },
      })
      .then((response) => {
        navigate("/login");
        console.log(response);
      });
  };

  return (
    <React.Fragment>
      <Container maxWidth="lg">
        <Typography variant="h6" gutterBottom>
          Profile
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="user"
                label="User"
                autoFocus
                value={textValue}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                autoFocus
                value={textValue2}
                onChange={handleChange2}
              />
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
