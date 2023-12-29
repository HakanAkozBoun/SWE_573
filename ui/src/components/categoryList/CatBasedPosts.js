import { Container, Grid, Pagination, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import PostsCard from "../posts/PostsCard";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Button from '@mui/material/Button';


const CatBasedPosts = () => {
  let { id } = useParams();
  const [blog, setBlog] = useState([]);
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/categoryBasedBlogs/${id}`
        );
        setBlog(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);

  const handleEdit = () => {

    axios.get(`${process.env.REACT_APP_API_URL}/api/CategoryList/`, {
      headers: { Authorization: `Basic ${token}` },
    })
      .then((response) => {

        let catet = response.data.filter((item) => Number(id) === item.id);

        navigate('/addcategory', { state: { edit: 1, name: catet[0].name, id: id ,image:catet[0].image} });
      });


  };

  return (
    <Container>
      <Grid
        container
        columnSpacing={{ xs: 0, sm: 1, md: 1 }}
        direction={"column"}
      >
        {blog.map((post) => (
          <Grid item xs>
            <PostsCard
              title={post.title}
              excerpt={post.excerpt}
              image={`${process.env.REACT_APP_API_URL}${post.image}`}
              blogHref={`/details/${post.slug}`}
              myDirection={"flex"}
            />
          </Grid>
        ))}
      </Grid>

      <Stack
        spacing={2}
        mt={3}
        mb={3}
        justifyContent="center"
        alignItems={"center"}
      >
        <Pagination count={10} color={"warning"} />
      </Stack>
      <Button variant="outlined" onClick={handleEdit}>Send Edit</Button>
    </Container>

  );
};

export default CatBasedPosts;
