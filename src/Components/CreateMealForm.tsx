import React, { useState, useEffect } from "react";
import { Day, Time } from "../types/Meals.types";
import { Button, NativeSelect, TextInput } from "@mantine/core";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5005";
export default function MealForm() {
  const [name, setName] = useState<string>();
  const [day, setDay] = useState<Day>(Day.Monday);
  const [time, setTime] = useState<Time>(Time.Breakfast);
  const [recipe, setRecipe] = useState<string>();

  const [recipes, setRecipes] = useState<{ id: string; name: string }[]>([]);

  useEffect(() => {
    // Fetch recipes from backend API and set to state
    getReciepes();
  }, []);

  const getReciepes = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/recipes`);
      setRecipes(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let recipe_id;
    recipes.filter((element) => {
      if (element.name === recipe) {
        recipe_id = element.id;
      }
    });
    const newMeal = { name, day, time, recipe_id };

    try {
      const response = await axios.post(`${apiUrl}/api/meals`, newMeal);
      console.log(response);
    } catch (error) {
      console.log(error);
    }

    console.log(newMeal);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextInput
        label="Name"
        placeholder="Lasagna"
        onChange={(e) => setName(e.currentTarget.value)}
      />
      <NativeSelect
        label="Day"
        data={[
          Day.Monday,
          Day.Tuesday,
          Day.Wednesday,
          Day.Thursday,
          Day.Friday,
          Day.Saturday,
          Day.Sunday,
        ]}
        onChange={(e) => setDay(e.currentTarget.value as Day)}
      />
      <NativeSelect
        label="Time"
        data={[Time.Breakfast, Time.Dinner, Time.Lunch]}
        onChange={(e) => setTime(e.currentTarget.value as Time)}
      />
      <NativeSelect
        label="Select a recipe"
        data={recipes.map((recipe) => recipe.name)}
        onChange={(e) => setRecipe(e.currentTarget.value)}
      />
      <Button type="submit">Add Meal</Button>
    </form>
  );
}
