import { Box, Container, Grid, styled, Typography } from "@mui/material";


import Cocktails from "../../static/cocktails.jpg";
import Lasagna from "../../static/lasagna.jpg";
import Kebab from "../../static/kebap.jpg";
import Fish from "../../static/Fish.jpg";

import Category from "../categoryList/Category";

const Hero = () => {
  const StyledCard = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",

    cursor: "pointer",
    [theme.breakpoints.up("md")]: {
      height: 400,
    },
    [theme.breakpoints.down("md")]: {
      height: 200,
    },
    "&:hover": {
      opacity: 0.8,
      boxSizing: "borderBox",
      zIndex: 1,
      transition: `all 0.45s ease`,
    },
  }));
  const StyledTypography = styled(Typography)({
    textAlign: "center",
    color: "white",
    background: "purple",
    fontSize: 20,
  });
  const StyledWrapper = styled(Box)(({ theme }) => ({
    [theme.breakpoints.up("md")]: {
      paddingTop: "140%",
    },
    [theme.breakpoints.down("md")]: {
      paddingTop: "40%",
    },
    width: "80%",
  }));
  return (
    <Container>
      <Grid container direction={"row"} columnSpacing={1} rowSpacing={1}>
        <Grid item md={3} xs={6}>
          <StyledCard sx={{ backgroundImage: `url(${Lasagna})` }}>
            <StyledWrapper>
              <StyledTypography>Lasagna</StyledTypography>
            </StyledWrapper>
          </StyledCard>
        </Grid>
        <Grid item md={3} xs={6}>
          <StyledCard sx={{ backgroundImage: `url(${Fish})` }}>
            <StyledWrapper>
              <StyledTypography>Fish</StyledTypography>
            </StyledWrapper>
          </StyledCard>
        </Grid>
        <Grid item md={3} xs={6}>
          <StyledCard sx={{ backgroundImage: `url(${Kebab})` }}>
            <StyledWrapper>
              <StyledTypography>Kebab</StyledTypography>
            </StyledWrapper>
          </StyledCard>
        </Grid>
        <Grid item md={3} xs={6}>
          <StyledCard sx={{ backgroundImage: `url(${Cocktails})` }}>
            <StyledWrapper>
              <StyledTypography>Cocktails</StyledTypography>
            </StyledWrapper>
          </StyledCard>
        </Grid>
      </Grid>
      <Category />
    </Container>
  );
};

export default Hero;
