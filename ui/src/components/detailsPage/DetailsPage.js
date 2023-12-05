import {
  Box,
  CardMedia,
  Container,
  List,
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

import * as React from 'react';
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
const DetailsPage = () => {

  const [value, setValue] = React.useState(0);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const [blogDetails, setblogDetails] = useState([]);
  const [postIngredients, setPostIngredients] = useState("");
  let { slug } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/blogs/${slug}`
        );
        setblogDetails(res.data);
        setPostIngredients(res.data.ingredients);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [slug]);

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
        <FormControlLabel value="0" control={<Radio />} label="Pound" />
        <FormControlLabel value="1" control={<Radio />} label="Gram/s" />
      </RadioGroup>

      <List>
        {postIngredients.split(",").map((ingredients) => (
          <ListItemButton>
            <ListItemIcon>
              <DoubleArrowIcon />
            </ListItemIcon>
            {value ==1?(<span>{ingredients.split("*")[0]}  </span>)
            :(<span>{ingredients.split("*")[1]} </span>  )}
            <ListItemText primary={ingredients.split("*")[2]} />
          </ListItemButton>
        ))}
      </List>
      <Typography variant="body1" align="center" m={2}>
        {blogDetails.contentTwo}
      </Typography>
    </Container>
  );
};

export default DetailsPage;
