import { Group } from "@mantine/core";
import "./navbar.css";
import { Modal, Button } from "@mantine/core";
import MealForm from "./CreateMealForm";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import CreateRecipe from "./CreateRecipe";

export default function Navbar() {
  const [isMealModalOpen, setMealModalOpen] = useState(false);
  const [isRecipeModalOpen, setRecipeModalOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="navbar">
      <Modal
        opened={isMealModalOpen}
        onClose={() => setMealModalOpen(false)}
        title="Create a Meal"
      >
        <MealForm />
      </Modal>
      <Modal
        opened={isRecipeModalOpen}
        onClose={() => setRecipeModalOpen(false)}
        title="Create a Recipe"
      >
        <CreateRecipe />
      </Modal>
      <Group>
        <img
          onClick={() => navigate("/")}
          src="/meal-prep-icon.png"
          alt="meal-prep-icon"
        />
        <h3>Your Meals for the week</h3>
        <Button variant="default" onClick={() => setMealModalOpen(true)}>
          Create a meal
        </Button>
        <Button variant="default" onClick={() => setRecipeModalOpen(true)}>
          Create a Recipe
        </Button>
        <Button onClick={() => navigate(`/recipes`)}>View Recipes</Button>
      </Group>
    </div>
  );
}
