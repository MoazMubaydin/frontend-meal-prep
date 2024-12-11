import { Group } from "@mantine/core";
import "./navbar.css";

export default function Navbar() {
  return (
    <div className="navbar">
      <Group>
        <img src="/meal-prep-icon.png" alt="meal-prep-icon" />
        <h3>Your Meals for the week</h3>
      </Group>
    </div>
  );
}
