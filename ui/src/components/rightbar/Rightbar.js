import {
  Box,
  CardMedia,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import chef from "../../static/hakan.jpg";
import { Send as SendIcon } from "@mui/icons-material";
const Rightbar = () => {
  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h5" align="center" mt={5}>
        Hello I'm Hakan
      </Typography>
      <CardMedia
        component={"img"}
        height="500px"
        image={chef}
        alt="burger_image"
        sx={{
          width: "400px",
          cursor: "pointer",
          "&:hover": {
            opacity: 0.8,
            boxSizing: "border-box",
            zIndex: 1,
            transition: `all 0.50s ease`,
          },
        }}
      />
      <Typography align="left" variant="body1">
        {" "}
        Hello, My name is Hakan.{" "}
      </Typography>
      <Typography align="left" variant="body1">
        {" "}
        I am a computer engineer. Love to cook. Here is my own recepies that you can try. <br />{" "}
      </Typography>

      <Typography align="center" color="white" bgcolor="purple" mt={2}>
        Subscribe Via Email
      </Typography>
      <Box sx={{ pl: 10 }}>
        <TextField
          label="Your Email here!"
          variant="standard"
          color="warning"
        />
        <IconButton>
          <SendIcon sx={{ color: "purple" }} />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Rightbar;
