import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const MealDetails = () => {
  const { mealId } = useParams();
  const [meal, setMeal] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMealDetails = async () => {
      try {
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
        );
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setMeal(data.meals[0]);
      } catch (error) {
        console.error("Failed to fetch meal details:", error);
        setError("Failed to fetch meal details");
      }
    };

    fetchMealDetails();
  }, [mealId]);

  if (error) {
    return <Typography>Error: {error}</Typography>;
  }

  if (!meal) {
    return <Typography>Loading...</Typography>;
  }

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
        backgroundImage: `url('/bg3.jpeg')`, // Replace 'your-image.jpg' with the path to your image
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Box
        sx={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: 20,
          p: 4,
          width: { xs: "90%", md: "700px" },
          maxHeight: "90%",
          overflowY: "auto",
          borderRadius: 1,
        }}
      >
        <IconButton
          sx={{ position: "absolute", top: 16, right: 16 }}
          onClick={() => window.history.back()}
        >
          <CloseIcon />
        </IconButton>
        <Typography variant="h4" component="h2" gutterBottom>
          {meal.strMeal}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary" gutterBottom>
          {meal.strCategory}
        </Typography>
        <Typography variant="body1" paragraph>
          {meal.strInstructions}
        </Typography>
        <Box sx={{ textAlign: "center", my: 2 }}>
          <img
            src={meal.strMealThumb}
            alt={meal.strMeal}
            style={{ borderRadius: "50%", width: "100px", height: "100px" }}
          />
        </Box>
        {meal.strYoutube && (
          <Typography variant="body2" color="primary">
            <a
              href={meal.strYoutube}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                textDecoration: "none",
                color: "inherit",
                display: "block", // To center the text
                textAlign: "center", // To center the text
                fontWeight: "bold",
              }}
            >
              Watch Video
            </a>
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default MealDetails;
