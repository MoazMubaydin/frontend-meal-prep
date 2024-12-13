import "./App.css";
import Home from "./Pages/Home";
import Navbar from "./Components/Navbar";
import { Route, Routes } from "react-router-dom";
import RecipeCard from "./Pages/RecipeCard";
import RecipeDetails from "./Components/RecipeDetails";
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipes" element={<RecipeCard />} />
        <Route path="/recipes/:recipeId" element={<RecipeDetails />} />

        <Route path="/about" />
      </Routes>
    </>
  );
}

export default App;
