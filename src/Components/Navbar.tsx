import { Group } from "@mantine/core";
import "./navbar.css";
import { useDisclosure } from '@mantine/hooks';
import { Modal, Button } from '@mantine/core';
import MealForm from "./CreateMealForm";

export default function Navbar() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <div className="navbar">
       <Modal opened={opened} onClose={close} title="Meal">
       <MealForm/>

      </Modal>

    
      <Group>
        <img src="/meal-prep-icon.png" alt="meal-prep-icon" />
        <h3>Your Meals for the week</h3>
        <Button variant="default" onClick={open}>
        Create a meal for a day
      </Button>
      </Group>
    
    </div>
  );
}
