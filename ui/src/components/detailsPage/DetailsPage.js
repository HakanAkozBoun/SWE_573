import {
  Box,
  CardMedia,
  Container,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import Category from "../categoryList/Category";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";

import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import * as React from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';



const DetailsPage = () => {

  const navigate = useNavigate();


  const token = sessionStorage.getItem("token");
  const user = sessionStorage.getItem("user");

  const [value, setValue] = React.useState(0);
  const [comments, setComments] = useState([]);
  const [nutrition, setNutrition] = useState([]);

  const [yeniYorum, setYeniYorum] = useState('');

  const [blogDetails, setblogDetails] = useState([]);
  const [postIngredients, setPostIngredients] = useState([]);
  let { slug } = useParams();

  const handleInputChange = (e) => {
    setYeniYorum(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (yeniYorum.trim() !== '') {


      console.log(blogDetails)

      let dataPost = {
        user: user,
        blog: blogDetails.id,
        text: yeniYorum
      };

      axios
        .post(`${process.env.REACT_APP_API_URL}/api/CreateComment/`, dataPost, {
          headers: { Authorization: `Basic ${token}` },
        })
        .then((response) => {
          console.log(response);
        });



      setYeniYorum('');
    }
  };




  const handleChange = (event) => {
    setValue(event.target.value);
    if (event.target.value == 0) {

      let convertedIngredients = postIngredients.map((item) => ({
        metricamount: item.metricunitid === 7 ? convertUnits(item.metricamount, "metric").weight : convertUnits(item.metricamount, "metric").volume,
        metricunit: item.metricunitid === 7 ? "gr" : "lt",
        metricunitid: item.metricunitid,
        food: item.food,
        unit: item.unit,
        unitid: item.unitid,
        amount: item.amount
      }));

      setPostIngredients(convertedIngredients)

    } else {
      let convertedIngredients2 = postIngredients.map((item) => ({
        metricamount: item.metricunitid === 7 ? convertUnits(item.metricamount, "imperial").weight : convertUnits(item.metricamount, "imperial").volume,
        metricunit: item.metricunitid === 7 ? "lb" : "oz",
        metricunitid: item.metricunitid,
        food: item.food,
        unit: item.unit,
        unitid: item.unitid,
        amount: item.amount
      }));
      setPostIngredients(convertedIngredients2)
    }

    console.log(postIngredients)
  };





  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/blogs/${slug}`
        );

        console.log("sdfs", res.data)

        const res2 = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/CommentList/?blog=` + res.data.id
        );
        setComments(res2.data)

        const res3 = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/Nutrition/?blog=` + res.data.id, {
          headers: { Authorization: `Basic ${token}` },
        });
        setNutrition([res3.data])

        setblogDetails(res.data);


        const res4 = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/RecipeList/?blog=` + res.data.id, {
          headers: { Authorization: `Basic ${token}` },
        });

        setPostIngredients(res4.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [slug]);



  function convertUnits(value, unit) {

    const metricToImperial = {
      weight: value => value * 0.00220462,
      volume: value => value * 0.033814,
    };


    const imperialToMetric = {
      weight: value => value / 0.00220462,
      volume: value => value / 0.033814,
    };

    if (unit === "metric") {
      return {
        weight: metricToImperial.weight(value),
        volume: metricToImperial.volume(value),
      };
    } else if (unit === "imperial") {
      return {
        weight: imperialToMetric.weight(value),
        volume: imperialToMetric.volume(value),
      };
    } else {
      console.error("Invalid unit: must be 'metric' or 'imperial'.");
      return null;
    }



  }



  const handleClick = () => {

    navigate('/addpost', { state: { ...blogDetails } });

  };

  const handleEdit = () => {

    navigate('/addpost', { state: { edit:1,...blogDetails } });

  };

  

  return (
    <Container>
      <Category />
      <Typography variant="h3" align="center" mt={4}>
        {blogDetails.title}
      </Typography>
      <Typography variant="body1" align="center" m={2}>
        {blogDetails.content}
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <CardMedia
          sx={{ height: "500px", width: "500px" }}
          component="img"
          image={blogDetails.image}
          alt="burger"
        />
      </Box>

      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        name="radio-buttons-group"
        value={value}
        onChange={handleChange}
      >
        <FormControlLabel value="0" control={<Radio />} label="Metric" />
        <FormControlLabel value="1" control={<Radio />} label="Imperial" />
      </RadioGroup>

      <List>
        {postIngredients.map((ingredients) => (
          <ListItemButton>
            <ListItemIcon>
              <DoubleArrowIcon />
            </ListItemIcon>
            <ListItemText primary={ Math.round(ingredients.metricamount) + " " + ingredients.metricunit + " " + ingredients.food} />
          </ListItemButton>
        ))}
      </List>
      <Typography variant="body1" align="center" m={2}>
        {blogDetails.contentTwo}
      </Typography>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>recipe (100g serving)</TableCell>
              <TableCell align="right">calorie</TableCell>
              <TableCell align="right">Fat&nbsp;(g)</TableCell>
              <TableCell align="right">sodium&nbsp;(g)</TableCell>
              <TableCell align="right">calcium&nbsp;(g)</TableCell>
              <TableCell align="right">protein&nbsp;(g)</TableCell>
              <TableCell align="right">iron&nbsp;(g)</TableCell>
              <TableCell align="right">carbonhydrates&nbsp;(g)</TableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {nutrition.map((row) => (
              <TableRow
                key={row.recipe}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.recipe}
                </TableCell>
                <TableCell align="right">{row.calorie}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
                <TableCell align="right">{row.sodium}</TableCell>
                <TableCell align="right">{row.calcium}</TableCell>
                <TableCell align="right">{row.protein}</TableCell>
                <TableCell align="right">{row.iron}</TableCell>
                <TableCell align="right">{row.carbonhydrates}</TableCell>



              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>



      <Typography variant="h4" gutterBottom>
        Comments
      </Typography>

      <Grid item xs={12} md={6}>
        {comments.map((comment, index) => (

          <ListItem>
            <ListItemText
              primary={comment.text}
              secondary={comment.name}
            />
          </ListItem>
        ))}
      </Grid>




      <Typography variant="h5" gutterBottom>
        Write Comment
      </Typography>
      <form onSubmit={handleFormSubmit}>
        <textarea
          rows="4"
          cols="50"
          placeholder="Yorumunuzu buraya yazın..."
          value={yeniYorum}
          onChange={handleInputChange}
        ></textarea>
        <br />
        <Button type="submit" variant="outlined">Send</Button>
        <br /><br /><br /><br />
      </form>




      <Button variant="outlined" onClick={handleClick}>Send Draft</Button>

      <Button variant="outlined" onClick={handleEdit}>Send Edit</Button>

    </Container>
  );
};

export default DetailsPage;
