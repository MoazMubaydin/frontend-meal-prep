import React, { useState, useEffect } from "react";
import { Recipe } from "../types/Recipes.types";
import { Button, Group, NumberInput, TextInput } from "@mantine/core";
import axios from "axios";
import { BiTrash } from "react-icons/bi";

const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5005";

type EditRecipeProps = {
  recipe: Recipe;
  setRecipeModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
export default function EditRecipe({
  recipe,
  setRecipeModalOpen,
}: EditRecipeProps) {
  const [name, setName] = useState<string>(recipe.name);
  const [description, setDescription] = useState<string>(recipe.description);
  const [ingredients, setIngredients] = useState<string[]>(recipe.ingredients);
  const [steps, setSteps] = useState<string[]>(recipe.steps);
  const [prep_time, setPrep_time] = useState<number | string>(recipe.prep_time);
  const [cook_time, setCook_time] = useState<number | string>(recipe.cook_time);

  useEffect(() => {
    // Fetch recipes from backend API and set to state
  }, []);

  const handleAddIngredients = () => {
    setIngredients((prev) => {
      const newIngredients = [...prev];
      newIngredients.push("");
      return newIngredients;
    });
  };
  const handleAddSteps = () => {
    setSteps((prev) => {
      const newSteps = [...prev];
      newSteps.push("");
      return newSteps;
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newRecipe = {
      name,
      description,
      ingredients,
      steps,
      prep_time,
      cook_time,
    };

    try {
      const response = await axios.patch(
        `${apiUrl}/api/recipes/${recipe.id}`,
        newRecipe
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    setRecipeModalOpen(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextInput
        label="Name"
        placeholder="Lasagna"
        value={name}
        onChange={(e) => setName(e.currentTarget.value)}
      />
      <TextInput
        label="Description"
        value={description}
        placeholder="description"
        onChange={(e) => setDescription(e.currentTarget.value)}
      />

      <Group>
        {ingredients.map((ingredient, index) => {
          return (
            <Group key={ingredient}>
              <TextInput
                label={`Ingredient ${index + 1}`}
                placeholder={`ingredient ${index + 1}`}
                value={ingredients[index]}
                onChange={(e) => {
                  const newIngredients = [...ingredients];
                  newIngredients[index] = e.currentTarget.value;
                  setIngredients(newIngredients);
                }}
              />
              <BiTrash
                color={"red"}
                onClick={() => {
                  const newIngredients = [...ingredients];
                  newIngredients.splice(index, 1);
                  setIngredients(newIngredients);
                }}
              />
            </Group>
          );
        })}
        <Button onClick={handleAddIngredients} mt={25}>
          Add ingredient
        </Button>
      </Group>
      <Group>
        {steps.map((step, index) => {
          return (
            <Group>
              <TextInput
                key={step}
                label={`Step ${index + 1}`}
                placeholder={`step ${index + 1}`}
                value={steps[index]}
                onChange={(e) => {
                  const newSteps = [...steps];
                  newSteps[index] = e.currentTarget.value;
                  setSteps(newSteps);
                }}
              />
              <BiTrash
                color={"red"}
                onClick={() => {
                  const newSteps = [...steps];
                  newSteps.splice(index, 1);
                  setSteps(newSteps);
                }}
              />
            </Group>
          );
        })}
        <Button onClick={handleAddSteps} mt={25}>
          Add Step
        </Button>
      </Group>
      <Group>
        <NumberInput
          label="Prep time"
          value={prep_time}
          onChange={setPrep_time}
        />
        <NumberInput
          label="Cook time"
          value={cook_time}
          onChange={setCook_time}
        />
      </Group>

      <Button type="submit">Edit Recipe</Button>
    </form>
  );
}
