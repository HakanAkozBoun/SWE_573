import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Grid, TextField } from "@mui/material";
import axios from "axios";
import PostsCard from "../posts/PostsCard";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  maxHeight: 600,
  minHeight: 600,
  overflow: "auto",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const PostSearch = () => {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const [postSearch, setPostSearch] = React.useState([]);
  const [lookup, setLookup] = React.useState();
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/blogs/`
        );
        setPostSearch(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <TextField
        sx={{ display: { xs: "none", md: "flex" } }}
        color="warning"
        label="Search Here!"
        variant="standard"
        onClick={() => setOpen(true)}
      />

      <TextField
        sx={{ display: { xs: "flex", md: "none" } }}
        color="warning"
        label="Click Here To Search!"
        variant="standard"
        onClick={() => setOpen(true)}
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <TextField
            sx={{ display: { xs: "none", md: "flex" } }}
            color="warning"
            label="Search Here!"
            variant="standard"
            onChange={(e) => setLookup(e.target.value)}
          />
          <TextField
            sx={{ display: { xs: "flex", md: "none" } }}
            color="warning"
            label="Search Here!"
            variant="standard"
            onChange={(e) => setLookup(e.target.value)}
          />
          {postSearch
            .filter((search) => search.title.toLowerCase().includes(lookup))
            .map((search) =>
              lookup.length > 0 ? (
                <Grid item xs>
                  <PostsCard
                    title={search.title}
                    excerpt={search.excerpt}
                    image={search.image}
                    blogHref={`/details/${search.slug}`}
                    myDirection={"flex"}
                  />
                </Grid>
              ) : (
                ""
              )
            )}
        </Box>
      </Modal>
    </div>
  );
};

export default PostSearch;
