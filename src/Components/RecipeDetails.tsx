import { Card, Image, List, Loader, Text } from "@mantine/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Recipe } from "../types/Recipes.types";
const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5005";

export default function RecipeDetails() {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    getRecipe();
  }, []);

  const getRecipe = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/recipes/${recipeId}`);
      setRecipe(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!recipe) {
    return <Loader />;
  }

  return (
    <Card>
      <Image
        src="https://images.themodernproper.com/billowy-turkey/production/posts/VegetableStirFry_9.jpg?w=1200&h=1200&q=60&fm=jpg&fit=crop&dm=1703377301&s=3484d660c4b404c6d23b0c3ec7ac66eb"
        w={400}
        radius={"lg"}
        mb={20}
      />
      <Text fw={700} size="lg">
        {recipe.name}
      </Text>
      <Text mt={20}>{recipe.description}</Text>
      <Text fw={700} mt={10}>
        Ingredients:
      </Text>
      <List>
        {recipe.ingredients.map((ingredient) => {
          return <List.Item key={ingredient}>{ingredient}</List.Item>;
        })}
      </List>
      <Text mt={20}>Cook Time: {recipe.cook_time} Minutes</Text>
      <Text mt={10}>Prepration Time: {recipe.prep_time} Minutes</Text>
      <Text fw={700} mt={10}>
        Steps:
      </Text>
      <List>
        {recipe.steps.map((step, index) => {
          return (
            <List.Item key={index} mt={10}>
              Step {index}:{step}
            </List.Item>
          );
        })}
      </List>
    </Card>
  );
}
