import React from "react";
import { Link } from "react-router-dom";
const RecipeCard = ({ recipe, loading, errormsg }) => {
  if (loading) {
    return <h2> Loading...</h2>;
  }
  const Join = (diets) => {
    return diets ? diets.join(", ") : diets;
  };
  return (
    <div key={recipe.id} className="container">
      <Link to={`recipe/${recipe.id}`}>{recipe.title}</Link>
      <br />
      <img src={recipe.image} alt="" />
      <br />
      <span> Diet: {Join(recipe.diets)}</span>
    </div>
  );
};

export default RecipeCard;
