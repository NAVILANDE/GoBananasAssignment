import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";

const MealSearch = ({ onSearch }) => {
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  const handleSearch = async () => {
    await onSearch(searchText);
    navigate("/results");
  };

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        overflow: "hidden",
        zIndex: -1,
        backgroundImage: `url('/bg.jpeg')`, // Replace 'your-image.jpg' with the path to your image
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "20px",
            maxWidth: "800px",
            width: "130%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            backdropFilter: "blur(7px)",
            borderRadius: "15px",
            color: "#fff",
          }}
        >
          <Typography
            variant="h1"
            sx={{
              marginBottom: "10px",
              color: "orange",
              fontFamily: "cursive",
            }}
          >
            DishDelight
          </Typography>
          <Typography variant="h4" sx={{ marginBottom: "10px" }}>
            Find Meals For Your Ingredients
          </Typography>
          <Typography
            variant="body1"
            sx={{ marginBottom: "20px", fontStyle: "italic" }}
          >
            Discover the essence of flavor. Where every meal tells a story.
            <br />
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TextField
              variant="outlined"
              placeholder="Enter an ingredient"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              sx={{ mr: 5, backgroundColor: "#fff", borderRadius: "5px" }} // Change background color to white and add border radius
              InputProps={{ style: { color: "#000" } }} // Change text color to black
            />
            <Button
              variant="contained"
              color="secondary"
              onClick={handleSearch}
              startIcon={<SearchIcon />}
            >
              Search
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default MealSearch;
