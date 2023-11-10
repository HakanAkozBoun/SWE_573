import { Box, Grid, Typography } from "@mui/material";
import React from "react";

const Posts = () => {
  return (
    <Box>
      <Typography variant="h4" align="center">
        {" "}
        Latest Recipes{" "}
      </Typography>
      <Grid
        container
        columnSpacing={{ xs: 0, sm: 1, md: 1 }}
        direction={"column"}
      >
          <Grid item md={6} xs={12} sm={6}>
         Card
         </Grid>
         <Grid item md={6} xs={12} sm={6}>
         Card
         </Grid>
         <Grid item md={6} xs={12} sm={6}>
         Card
         </Grid>
        </Grid>
    </Box>
  )
}

export default Posts

