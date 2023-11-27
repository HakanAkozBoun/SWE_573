import { Box, Container, Stack, styled, Typography } from "@mui/material";
import React from "react";

const Footer = () => {
  const MenuBox = styled(Box)({
    display: "flex",
    gap: 30,
    cursor: "pointer",
  });
  const MenuItems = [
    { Name: "Home", Link: "#" },
    { Name: "Recipes", Link: "#" },
    { Name: "About Us", Link: "#" },
    { Name: "Subscribe", Link: "#" },
  ];
  return (
    <Box sx={{ bgcolor: "purple", height: "200px" }}>
      <Container>
        <Stack direction={"row"}>
          <MenuBox flex={2} sx={{ display: { xs: "none", md: "flex" } }}>
            {MenuItems.map((item) => (
              <Typography variant="body2" color={"white"}>
                {item.Name}
              </Typography>
            ))}
          </MenuBox>
          <Box flex={1} color={"white"} mt={1}>
            ©2023 CookPad by Chef Hakan
          </Box>
        </Stack>
        <Typography variant="h4" align="center" mt={8} color={"white"}>
        Afiyet olsun, Bon appétit :)
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
