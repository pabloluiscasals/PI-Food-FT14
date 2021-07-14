import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllRecipes } from "./actions";

function Home() {
  const dispatch = useDispatch();
  const recipes = useSelector((state) => state.recipes);

  useEffect(() => {
    dispatch(getAllRecipes());
  }, [dispatch]);

  return (
    <div>
      <h1>Henry Food</h1>
      <ul>
        {Array.isArray(recipes) ? (
          recipes.map((recipe) => (
            <li key={recipe.id}>
              <Link to={`/home/recipes/${recipe.id}`}>{recipe.title}</Link>
              <p>
                <img src={recipe.image} alt="food_photo" />
              </p>
              <p>Type of diets:</p>
              <p>{recipe.diets}</p>
            </li>
          ))
        ) : (
          <h1>Loading...</h1>
        )}
      </ul>
    </div>
  );
}

export default Home;
