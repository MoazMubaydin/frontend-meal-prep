import { Recipe } from "./Recipes.types";
export type Meal = {
  id: string;
  name: string;
  day: [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
  ];
  time: ["Breakfast", "Lunch", "Dinner"];
  createdAt: Date;
  updatedAt: Date;
  recipe_id: Recipe;
};
