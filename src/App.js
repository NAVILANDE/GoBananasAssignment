import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  // useNavigate,
} from "react-router-dom";

import { Container, Snackbar, Alert } from "@mui/material";
import MealSearch from "./components/MealSearch";
import MealResult from "./components/MealResult";
import MealDetails from "./components/MealDetails";

const App = () => {
  const [meals, setMeals] = useState([]);
  const [setSelectedMeal] = useState(null);
  const [error, setError] = useState(null);

  const fetchMeals = async (ingredient) => {
    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
      );
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      setMeals(data.meals || []); // Update meals state with fetched data
    } catch (error) {
      console.error("Failed to fetch meals:", error);
      setError("Failed to fetch meals");
    }
  };

  const fetchMealDetails = async (mealId) => {
    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
      );
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      setSelectedMeal(data.meals[0]); // Update selected meal state with fetched data
    } catch (error) {
      console.error("Failed to fetch meal details:", error);
      setError("Failed to fetch meal details");
    }
  };

  const handleCloseError = () => {
    setError(null);
  };

  return (
    <Router>
      <Container>
        <Routes>
          <Route path="/" element={<MealSearch onSearch={fetchMeals} />} />
          <Route
            path="/results"
            element={
              <MealResult meals={meals} onRecipeClick={fetchMealDetails} />
            }
          />
          <Route path="/description/:mealId" element={<MealDetails />} />
        </Routes>
        {error && (
          <Snackbar
            open={true}
            autoHideDuration={6000}
            onClose={handleCloseError}
          >
            <Alert
              onClose={handleCloseError}
              severity="error"
              sx={{ width: "100%" }}
            >
              {error}
            </Alert>
          </Snackbar>
        )}
      </Container>
    </Router>
  );
};

export default App;
