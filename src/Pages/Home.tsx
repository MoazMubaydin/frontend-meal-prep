import { Table, Loader, Button } from "@mantine/core";
import { RiDeleteBin6Line } from "react-icons/ri";
import axios from "axios";
import { useEffect, useState } from "react";
import { Meal } from "../types/Meals.types";
const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5005";

export default function Home() {
  const [meals, setMeals] = useState<Meal[]>();

  const getMeals = async () => {
    try {
      const response = await axios.get<Meal[]>(`${apiUrl}/api/meals`);
      setMeals(response.data);
      console.log(response);
    } catch (error) {}
  };

  useEffect(() => {
    getMeals();
  }, []);

  const deleteMeal = async (MealId: string) => {
    try {
      const response = await axios.delete(`${apiUrl}/api/meals/${MealId}`);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

 

 
  if (meals === undefined) {
    return <Loader color="blue" />;
  } else if (meals.length === 0) {
    <p>no meals</p>;
  }

  const rows = meals.map((element) => (
    <Table.Tr key={element.name}>
      <Table.Td>{element.day}</Table.Td>
      <Table.Td>{element.time}</Table.Td>
      <Table.Td>{element.recipe.name}</Table.Td>
      <Table.Td>
        <RiDeleteBin6Line color="red" onClick={() => deleteMeal(element.id)} />
        <Button
          variant="transparent"
          color="yellow"
          pb={6}
          >
          Edit
        </Button>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    meals && (
      <Table>
        
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Day</Table.Th>
            <Table.Th>Time of Day</Table.Th>
            <Table.Th>Meal</Table.Th>
            <Table.Th>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    )
  );
}
