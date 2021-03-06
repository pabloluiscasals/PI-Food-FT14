import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllRecipes } from "../../actions/index";
import React from "react";
import RecipeCard from "../RecipeCard/RecipeCard";
import Navbar from "../Navbar/Navbar";
import "./Home.css";

const Home = () => {
  const dispatch = useDispatch();
  const recipes = useSelector((state) => state.recipes);
  const loading = useSelector((state) => state.loading);
  const [order, setOrder] = useState("");
  const [filterDiets, setfilterDiets] = useState("");
  const [pageNumer, setPageNumber] = useState(0);
  
  const AZ = (a, b) => {
    return a.title < b.title ? 1 : -1;
  };
  const ZA = (a, b) => {
    return a.title > b.title ? 1 : -1;
  };
  const Min = (a, b) => {
    return b.spoonacularScore - a.spoonacularScore;
  };
  const Max = (a, b) => {
    return a.spoonacularScore - b.spoonacularScore;
  };

  const RecipesCards = () => {
    if (loading) {
      return <p>Loading...</p>;
    }
    if (recipes.length > 0) {

      return (
        <div className="recipes">
          {filterDiets
            ? recipes
                .filter((recipe) => recipe.diets.includes(filterDiets))
                .slice(pageVisited, pageVisited + recipesPerPage)
                .map((recipe) => <RecipeCard key={recipe.id} recipe={recipe} />)
            : recipes
                .slice(pageVisited, pageVisited + recipesPerPage)
                .map((recipe) => (
                  <RecipeCard key={recipe.id} recipe={recipe} />
                ))}
        </div>
      );
    } else {
      return (
        <p>
          {" "}
          There's not a recipe (if you want to precharge the recipes press)
        </p>
      );
    }
  };

  

  //order by Title or by SpoonacularScore
  const handleInputChangeOrder = (e) => {
    e.preventDefault();
    setOrder(e.target.value);
    switch (order) {
      case "ASC":
        return recipes.sort(AZ);
      case "DESC":
        return recipes.sort(ZA);
      case "Score_positive":
        return recipes.sort(Max);
      case "Score_negative":
        return recipes.sort(Min);
      default:
        return recipes;
    }
  };

  //filter by diet
  const handleInputChangeDiets = (event) => {
    setfilterDiets(event.target.value);
  };

  //pagination
  const recipesPerPage = 9;
  const pageVisited = pageNumer * recipesPerPage;
  const buttons = () => {
    let buttonsarray = [];
    for (let i = 0; i < Math.ceil(recipes.length / recipesPerPage); i++) {
      buttonsarray.push(i);
    }
    return buttonsarray;
  };
  const changePage = (e) => {
    e.preventDefault();
    setPageNumber(e.target.value);
  };

  useEffect(() => {
    dispatch(getAllRecipes());
    //dispatch(getAllDiets());
  }, [dispatch]);

  console.log(recipes);
  return (
    <div>
      <Navbar />
      <div className="filters">
        <div>
        <label> Type of diets: </label>
        <select onChange={(e) => handleInputChangeDiets(e)} id="diets">
          <option value="">Default</option>
          <option value="gluten free">Gluten Free</option>
          <option value="dairy free">Dairy Free</option>
          <option value="vegetarian">Vegetarian</option>
          <option value="lacto ovo vegetarian">Lacto Ovo Vegetarian</option>
          <option value="pescatarian">Pescatarian</option>
          <option value="paleolithic">Paleo</option>
          <option value="primal">Primal</option>
          <option value="whole 30">Whole 30</option>
          <option value="vegan">Vegan</option>
        </select>
        
    

      </div>
      <label>Order by: </label>
      <select onChange={(e) => handleInputChangeOrder(e)} id="order">
        <option value="">Default</option>
        <option value="ASC">Ascending</option>
        <option value="DESC">Descending</option>
        <option value="Score_positive">Best Score</option>
        <option value="Score_negative">Bad Score</option>
      </select>
     </div>
      <div > 
      {RecipesCards()}
      </div>
      <div className="pagination">
        {buttons().map((button) => (
          <button key={button} value={button} onClick={(e) => changePage(e)}>
            {button + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Home;
