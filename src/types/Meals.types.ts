import { Recipe } from "./Recipes.types";

export enum Day {
  Monday = "Monday",
  Tuesday = "Tuesday",
  Wednesday = "Wednesday",
  Thursday = "Thursday",
  Friday = "Friday",
  Saturday = "Saturday",
  Sunday = "Sunday",
}
export enum Time {
  Breakfast = "Breakfast",
  Lunch = "Lunch",
  Dinner = "Dinner",
}
export type Meal = {
  id: string;
  name: string;
  day: Day;
  time: Time;
  recipe: Recipe;
  recipe_id: string;
};
