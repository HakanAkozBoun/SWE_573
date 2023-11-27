import * as React from "react";
import Grid from "@mui/material/Grid";
import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";




import axios from "axios";
import { useNavigate } from "react-router-dom";




export default function AdCategory() {


    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
    
        let dataPost = {
          "name": data.get('name'),
          "image": ""
      }
    
        const token = sessionStorage.getItem('token');;

        axios
          .post(`${process.env.REACT_APP_API_URL}/api/CreateCategory/`,dataPost,{headers: {Authorization: `Basic ${token}`,}} )
          .then((response) => {
            console.log(response)
           navigate("/");
          });
      };

  return (
    <React.Fragment>
      <Container maxWidth="lg">
        <Typography variant="h6" gutterBottom>
          Add Catgory
        </Typography>
        <Grid container spacing={3}>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              autoFocus
            />
          </Grid>

      
          <Grid item xs={12}>
            <Button type="submit" variant="contained">Save</Button>
          </Grid>

          </Box>
        </Grid>
      </Container>
    </React.Fragment>
  );
}
