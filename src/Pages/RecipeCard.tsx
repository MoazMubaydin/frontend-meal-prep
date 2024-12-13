import { Card, Image, Text, Button, Group, Loader, Modal } from "@mantine/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { Recipe } from "../types/Recipes.types";
import "./recipeCard.css";
import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import EditRecipe from "../Components/EditRecipe";
const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5005";

export default function RecipeCard() {
  const [recipes, setRecipes] = useState<Recipe[]>();
  const [recipeToEdit, setRecipeToEdit] = useState<Recipe | null>(null);
  const [isRecipeModalOpen, setRecipeModalOpen] = useState(false);

  useEffect(() => {
    getRecipes();
  }, []);

  const getRecipes = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/recipes`);
      setRecipes(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteRecipe = async (recipeId: string) => {
    try {
      const response = await axios.delete(`${apiUrl}/api/recipes/${recipeId}`);
      getRecipes();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  if (!recipes) {
    return <Loader color="blue" />;
  }

  return (
    recipes && (
      <div className="Recipes">
        {recipes.map((element: Recipe) => (
          <Card
            className="Recipe"
            shadow="sm"
            padding="lg"
            radius="md"
            h={350}
            w={400}
            withBorder
            key={element.id} // Changed to element.id for uniqueness
          >
            <Card.Section>
              <Image
                src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"
                height={160}
                alt={element.name}
              />
              <BiEdit
                width={60}
                color="orange"
                onClick={() => {
                  setRecipeToEdit(element);
                  setRecipeModalOpen(true);
                }}
              />
            </Card.Section>

            <Text fw={500} mt="md" mb="xs">
              {element.name}
            </Text>

            <Text size="sm" c="dimmed">
              {element.description}
            </Text>
            <Text truncate="end" c="dimmed" pt={10}>
              {element.steps}
            </Text>
            <Group justify="space-evenly">
              <Link to={`/recipes/${element.id}`}>
                <Button color="blue" mt="md" radius="lg">
                  More Details
                </Button>
              </Link>
              <Button
                color="red"
                mt="md"
                radius="lg"
                onClick={() => deleteRecipe(element.id)}
              >
                Delete
              </Button>
            </Group>
          </Card>
        ))}
        <Modal
          opened={isRecipeModalOpen}
          onClose={() => setRecipeModalOpen(false)}
          title="Create a Recipe"
        >
          {recipeToEdit && (
            <EditRecipe
              recipe={recipeToEdit}
              setRecipeModalOpen={setRecipeModalOpen}
            />
          )}
        </Modal>
      </div>
    )
  );
}
