import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getRecipe, clearRecipe } from "./actions";

function RecipeDetail() {
  const dispatch = useDispatch();
  const recipeDetail = useSelector((state) => state.recipeDetail);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getRecipe(id));
    return () => {
      dispatch(clearRecipe());
    };
  }, [dispatch, id]);
  if (recipeDetail === null) {
    return <h1>Recipe not found</h1>;
  } else if (recipeDetail === undefined) {
    return <h1>Loading...</h1>;
  } else {
    return (
      <div>
        <h1>{recipeDetail.title}</h1>
        <img src={recipeDetail.image} alt="" />
        <p>Summary: {recipeDetail.summary}</p>
        <p>Score: {recipeDetail.spoonacularScore}</p>
        <p>Health Score: {recipeDetail.healthScore}</p>
        <p>Instrucctions: {recipeDetail.analyzedInstructions}</p>
        <p>Type of diets: {recipeDetail.diets}</p>
      </div>
    );
  }
}

export default RecipeDetail;
