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
        <p>{recipeDetail.summary}</p>
        <p>{recipeDetail.spoonacularScore}</p>
        <p>{recipeDetail.healthScore}</p>
        <p>{recipeDetail.analyzedInstructions}</p>
        <p>{recipeDetail.diets}</p>
      </div>
    );
  }
}

export default RecipeDetail;
