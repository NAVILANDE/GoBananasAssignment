import React from "react";
// import * as React from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
// import MenuIcon from "@mui/icons-material/Menu";

const MealResult = ({ meals, onRecipeClick }) => {
  const navigate = useNavigate();

  const handleRecipeClick = async (mealId) => {
    await onRecipeClick(mealId);
    navigate(`/description/${mealId}`);
  };

  if (meals.length === 0) {
    return (
      <Typography variant="h6" align="center">
        Sorry, we didn't find any meal!
      </Typography>
    );
  }

  return (
    <Box sx={{ flexGrow: 5 }}>
      <AppBar position="sticky" sx={{ bgcolor: "orange" }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="warning"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            🥗🥗
          </IconButton>
          <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
            The Dishes of Your Ingredient
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "2fr",
            sm: "1fr 1fr",
            md: "1fr 1fr 1fr",
          },
          gap: 6,
          mt: 4,
        }}
      >
        {meals.map((meal) => (
          <Card key={meal.idMeal} sx={{ maxWidth: 345 }}>
            <CardMedia
              component="img"
              alt={meal.strMeal}
              height="140"
              image={meal.strMealThumb}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {meal.strMeal}
              </Typography>
              <Button
                variant="contained"
                sx={{
                  bgcolor: "orange",
                  "&:hover": {
                    bgcolor: "darkorange",
                  },
                }}
                onClick={() => handleRecipeClick(meal.idMeal)}
              >
                Get Recipe
              </Button>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default MealResult;
