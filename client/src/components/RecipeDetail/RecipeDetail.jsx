import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipeDetail } from "../../actions";
import Navbar from "../Navbar/Navbar";
import "./RecipeDetail.css";

const RecipeDetail = (props) => {
  const dispatch = useDispatch();
  const recipeInfo = useSelector((state) => state.detail);
  const replace = (summary) => {
    return summary ? summary.toString().replace(/(<([^>]+)>)/gi, "") : summary;
  };
  const Join = (diets) => {
    return diets ? diets.join(", ") : diets;
  };
  useEffect(() => {
    dispatch(getRecipeDetail(props.match.params.id));
  }, [dispatch, props.match.params.id]);
  return (
    <div className="recipeDetail">
      <Navbar />
      <div className="Detail">
        <h1>{recipeInfo.title}</h1>
        <div className="imageText">
          <img height="auto" width="50%" src={recipeInfo.image} alt="" />
          <div className="scores">
            <p>SpoonacularScore: {recipeInfo.spoonacularScore}</p>
            <p>HealthScore score: {recipeInfo.healthScore}</p>
            <p>Type of diets: {Join(recipeInfo.diets)}</p>
          </div>
        </div>
        <h3>Summary:</h3>
        <p>{replace(recipeInfo.summary)}</p>
        <h3>Instruccions:</h3>
        <p>{replace(recipeInfo.analyzedInstructions)}</p>
      </div>
    </div>
  );
};

export default RecipeDetail;
