import  React, { useEffect ,useState}  from "react";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";


import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import axios from "axios";
import { useNavigate } from "react-router-dom";


export default function AddPost() {
  const navigate = useNavigate();

  const [cate, setCate] = React.useState("");

  const [catelist, listCate] = React.useState([]);

  const handleChange = (event) => {
    setCate(event.target.value);
  };

  const token = sessionStorage.getItem("token");



  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    
  };

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

      let dataPost = {
        category: cate,
        title: data.get("title"),
        slug: data.get("slug"),
        excerpt: data.get("excerpt"),
        content: data.get("content"),
        contentTwo: data.get("contentTwo"),
        image: "image/"+selectedFile.name,
        ingredients: data.get("ingredients"),
        postlabel: "POPULAR",
      };

    axios
      .post(`${process.env.REACT_APP_API_URL}/api/CreateBlog/`, dataPost, {
        headers: { Authorization: `Basic ${token}` },
      })
      .then((response) => {
        navigate("/");
        console.log(response);
      });
  };

  return (
    <React.Fragment>
      <Container maxWidth="lg">
        <Typography variant="h6" gutterBottom>
          Add Recipe
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
                label="Description"
                fullWidth
                variant="standard"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="contentTwo"
                name="contentTwo"
                label="Instruction List"
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
