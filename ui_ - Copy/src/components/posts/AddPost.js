import React, { useEffect, useState } from "react";

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
import { useLocation, useNavigate } from "react-router-dom";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';




export default function AddPost() {

  const location = useLocation();


  console.log("data", location.state)





  const [foodData, setData] = useState([]);
  const [newRow, setNewRow] = useState({ food: null, unit: 0, amount: 0 });


  const addRow = () => {
    if (!newRow.food || !newRow.unit || !newRow.amount) {
      alert('Food,unit and amount are required.');
      return;
    }

    const newRowWithId = { ...newRow };
    setData([...foodData, newRowWithId]);
    setNewRow({ food: null, unit: 3, amount: 3 });
  };


  ////////////////////////////////////////////

  const [food, setFood] = React.useState([]);
  const [unit, setUnit] = React.useState([]);
  const [unitBase, setUnitBase] = React.useState([]);

  const foodChange = (event) => {


    const unitid = food.filter((item) => item.name === event.target.value)[0].unitid;

    let unitdatdat = unitBase.filter((item) => item.type === unitid);
    setUnit(unitdatdat);


  };

  /////////////////////////////////////////////////


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
            listCate(response.data);
          });

        axios
          .get(`${process.env.REACT_APP_API_URL}/api/FoodList/`, {
            headers: { Authorization: `Basic ${token}` },
          })
          .then((response) => {
            setFood(response.data);
          });

        axios
          .get(`${process.env.REACT_APP_API_URL}/api/UnitList`, {
            headers: { Authorization: `Basic ${token}` },
          })
          .then((response) => {
            setUnitBase(response.data);
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






    const newData = [...foodData];


    newData.forEach((datdat) => {
      let foodID = food.filter((item) => item.name === datdat.food)[0].unitid;
      datdat.food = foodID;


      let unitID = unitBase.filter((item) => item.name === datdat.unit)[0].id;
      datdat.unit = unitID;

    });


    setData(newData);
    let dataPost = {
      category: cate,
      title: data.get("title"),
      slug: data.get("slug"),
      excerpt: data.get("excerpt"),
      content: data.get("content"),
      contentTwo: data.get("contentTwo"),
      image: "image/" + selectedFile.name,
      ingredients: data.get("ingredients"),
      postlabel: "POPULAR",
      list: foodData
    };

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
          Add Recipe
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel>
                    Category
                  </InputLabel>
                  <Select label="Category" onChange={handleChange}>
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
                value={location.state === null?null:location.state.title}
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
                value={location.state === null?null:location.state.slug}
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
                value={location.state === null?null:location.state.excerpt}
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
                value={location.state === null?null:location.state.content}
                fullWidth
                variant="standard"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="contentTwo"
                name="contentTwo"
                label="Instruction List"
                value={location.state === null?null:location.state.contentTwo}
                fullWidth
                variant="standard"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="ingredients"
                name="ingredients"
                value={location.state === null?null:location.state.ingredients}
                label="Ingredients List Name"
                fullWidth
                variant="standard"
              />

              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Food</TableCell>
                      <TableCell align="right">Unit</TableCell>
                      <TableCell align="right">Amount</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {foodData.map((row) => (
                      <TableRow
                        key={row.name}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >

                        <TableCell component="th" scope="row">
                          {row.food}
                        </TableCell>
                        <TableCell align="right">{row.unit}</TableCell>
                        <TableCell align="right">{row.amount}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

            </Grid>

            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel>
                  Food
                </InputLabel>
                <Select label="Food" size="small" value={newRow.food} onChange={(e) => { foodChange(e); setNewRow({ ...newRow, food: e.target.value }) }}>
                  {food.map((res) => (
                    <MenuItem value={res.name}>{res.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={3}>
              <FormControl fullWidth>
                <InputLabel>
                  Unit
                </InputLabel>
                <Select label="Unit" size="small" value={newRow.unit} onChange={(e) => setNewRow({ ...newRow, unit: e.target.value })}>
                  {unit.map((res) => (
                    <MenuItem value={res.name}>{res.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={3}>
              <FormControl fullWidth>
                <TextField label="Amount" size="small" variant="outlined" type="number" value={newRow.amount}
                  onChange={(e) => setNewRow({ ...newRow, amount: Number(e.target.value) })} />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={2}>
              <Button variant="contained" onClick={addRow}>Add Food</Button>
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
