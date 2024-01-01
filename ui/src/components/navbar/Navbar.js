import React, { useEffect, useState } from "react";
import {
  AppBar,
  Box,
  Drawer,
  Link,
  List,
  ListItem,
  ListItemButton,
  styled,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import PostSearch from "../search/PostSearch";

import Button from '@mui/material/Button';
import axios from "axios";


const Navbar = () => {

  const [name, setName] = React.useState("");


  const StyledToolbar = styled(Toolbar)({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  });
  const MenuBox = styled(Box)({
    display: "flex",
    gap: 30,
    cursor: "pointer",
  });
  const MenuItems = [
    { Name: "Home", Link: "/" },
    { Name: "Add Recipes", Link: "/addpost" },
  ];
  const [openMenu, setOpenMenu] = useState(false);


  const token = sessionStorage.getItem("token");
  const hasToken = sessionStorage.getItem('user');

  useEffect(() => {
    const fetchData = async () => {
      try {
        axios
          .get(`${process.env.REACT_APP_API_URL}/api/UserList/`, {
            headers: {
              Authorization: `Basic ${token}`,
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            console.log(response.data, hasToken)
            let namess = response.data.filter((item) => item.id === Number(hasToken))[0].first_name;
            setName(namess)
          });
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);



  return (
    <>
      <AppBar color="default" position="sticky" elevation={0}>
        <StyledToolbar>
          <Box flex={{ xs: 25, md: 1 }}>
            <Link href="/" sx={{ textDecoration: "none" }}>
              <Typography
                variant="h5"
                color={"purple"}
                sx={{
                  fontFamily: "Lobster , cursive",
                  textAlign: { xs: "center", md: "left" },
                }}
              >
                CookPad by Chef Hakan
              </Typography>
            </Link>
          </Box>
          <MenuBox flex={1} sx={{ display: { xs: "none", md: "flex" } }}>
            {MenuItems.map((item, index) => (
              <Link href={item.Link} underline="none">
                {item.Name}
              </Link>
            ))}
          </MenuBox>
          <MenuBox flex={1} sx={{ display: { xs: "none", md: "flex" }, flexDirection: 'row-reverse', pr: 5 }}>
            {Boolean(hasToken) ? <p>Welcome, {name}</p> : <Button variant="text" href="/login">Login</Button>}
          </MenuBox>



          <Box flex={1}>



            <PostSearch />
            <MenuIcon
              sx={{ display: { xs: "flex", md: "none" }, cursor: "pointer" }}
              onClick={() => setOpenMenu(!openMenu)}
            />
          </Box>
        </StyledToolbar>
        <Drawer
          anchor={"top"}
          open={openMenu}
          onClose={() => setOpenMenu(!openMenu)}
        >

          <List>
            <ListItem>
              {MenuItems.map((item, index) => (
                <ListItemButton key="{index}">{item.Name}</ListItemButton>
              ))}
            </ListItem>

          </List>
          <PostSearch />
        </Drawer>

      </AppBar>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: { xs: "column", md: "row" },
          padding: 1,
        }}
      >
        <Typography align="center" variant="h5" mr={{ xs: 0, md: 1 }}>
          Delicious recipes from worldwide
        </Typography>
      </Box>
    </>
  );
};

export default Navbar;

