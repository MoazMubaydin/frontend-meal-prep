import "./App.css";
import Home from "./Pages/Home";
import Navbar from "./Components/Navbar";
import { Route, Routes } from "react-router-dom";
import RecipeCard from "./Pages/RecipeCard";
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipes" element={<RecipeCard />} />
        <Route path="/about" />
      </Routes>
    </>
  );
}

export default App;
