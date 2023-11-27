import  React, { useEffect }  from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import axios from "axios";
import { useNavigate } from "react-router-dom";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function AddPost() {
  const navigate = useNavigate();

  const [cate, setCate] = React.useState("");

  const [catelist, listCate] = React.useState([]);

  const handleChange = (event) => {
    setCate(event.target.value);
  };

  const token = sessionStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        axios
          .get(`${process.env.REACT_APP_API_URL}/api/CategoryList/`, {
            headers: { Authorization: `Basic ${token}` },
          })
          .then((response) => {
            console.log(response);
            listCate(response.data);
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
      category: cate,
      title: data.get("title"),
      slug: data.get("slug"),
      excerpt: data.get("excerpt"),
      content: data.get("content"),
      contentTwo: data.get("contentTwo"),
      image: "image/turkishbreakfast.jpg",
      ingredients: data.get("ingredients"),
      postlabel: "POPULAR",
    };

    const token = sessionStorage.getItem("token");

    axios
      .post(`${process.env.REACT_APP_API_URL}/api/CreateBlog/`, dataPost, {
        headers: { Authorization: `Basic ${token}` },
      })
      .then((response) => {
        console.log(response);
      });
  };

  return (
    <React.Fragment>
      <Container maxWidth="lg">
        <Typography variant="h6" gutterBottom>
          Add Post
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Category
                  </InputLabel>
                  <Select label="Age" onChange={handleChange}>
                    {catelist.map((res) => (
                      <MenuItem value={res.id}>{res.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}></Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="title"
                name="title"
                label="Title"
                fullWidth
                variant="standard"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="slug"
                name="slug"
                label="Slug"
                fullWidth
                variant="standard"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="excerpt"
                name="excerpt"
                label="Excerpt"
                fullWidth
                variant="standard"
              />
            </Grid>
            <Grid item xs={12} sm={6}></Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="content"
                name="content"
                label="Contetnt"
                fullWidth
                variant="standard"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="contentTwo"
                name="contentTwo"
                label="Content Two"
                fullWidth
                variant="standard"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="ingredients"
                name="ingredients"
                label="Ingredients"
                fullWidth
                variant="standard"
              />
            </Grid>

            {/* <Grid item xs={12}>
            <Button
              component="label"
              variant="contained"
              startIcon={<CloudUploadIcon />}
            >
              Upload file
              <VisuallyHiddenInput type="file" />
            </Button>
          </Grid> */}
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
