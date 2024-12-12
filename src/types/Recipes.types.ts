import { Meal } from "./Meals.types";
export type Recipe = {
  id: string;
  name: string;
  description: string;
  ingredients: string[];
  steps: string[];
  prep_time: number;
  cook_time: number;
  createdAt: Date;
  updatedAt: Date;
  Meal: Meal[];
};
