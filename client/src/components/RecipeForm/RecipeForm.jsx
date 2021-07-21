import React, { useState, useEffect } from "react";
//import Select from "react-select"
import { useDispatch} from "react-redux";
import { postRecipe } from "../../actions/index";
import Navbar from "../Navbar/Navbar";
import "./RecipeForm.css";

const RecipeForm = () => {
  const imageHandler = (e) => {
    const newdata = { ...data };
    newdata[e.target.id] = e.target.value;
    
    setData(newdata);
    console.log(newdata);
  };
  const dispatch = useDispatch();
  const [data, setData] = useState({
    title: "",
    summary: "",
    spoonacularScore: 0,
    image: "",
    healthScore: 0,
    analyzedInstructions: "",
    diets: [],
  });
  const handleOnChange = (e) => {
    const newdata = { ...data };
    newdata[e.target.id] = e.target.value;
    setData(newdata);
    console.log(newdata);
  };
  const onChange = (e) => {
    data.diets.push(e.target.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (!data.title) {
      return alert("Please enter a title for your recipe");
    }
    if (!data.summary) {
      return alert("Please enter a resume of your recipe");
    }
    dispatch(postRecipe(data));
    alert("Recipe was sucessfully created");
  };



  useEffect(() => {}, [data]);
  return (
    <div className="container">
      <Navbar />
    <div className="Newrecipe">
    
      <form onSubmit={(e) => onSubmit(e)}>
        <label>Recipe title: </label>
        <br />
        <input
          onChange={(e) => handleOnChange(e)}
          id="title"
          placeholder="Recipe´s title..."
          type="text"
        ></input>
        <br />
        <label>Summary: </label>
        <br />
        <textarea
          onChange={(e) => handleOnChange(e)}
          id="summary"
          placeholder="Short description..."
          rows="3"
          cols="60"
          type="text"
        ></textarea>
        <br />
        <label> Instructions: </label>
        <br />
        <textarea
          onChange={(e) => handleOnChange(e)}
          id="analyzedInstructions"
          placeholder="Instrucctions for maiking your recipe..."
          rows="10"
          cols="60"
        ></textarea>
        <br />
        <label>Photo URL: </label>
        <br />
        <input
          onChange={(e) => imageHandler(e)}
          id="image"
          placeholder="URL of the image..."
          type="text"
          accept="image/*"
        />
        <br />
        <label>Your SpoonacularScore: </label>
        <br />
        <input
          onChange={(e) => handleOnChange(e)}
          id="spoonacularScore"
          placeholder="0 - 100"
          type="number"
        ></input>
        <br />
        <label>HealthScore: </label>
        <br />
        <input
          onChange={(e) => handleOnChange(e)}
          id="healthScore"
          placeholder="0 - 100"
          type="number"
        ></input>
        <br />
        <label>Diets: </label>
        <br />
        <select onChange={(e) => onChange(e)} id="diets" selected={data.diets}>
        
          <option value="0">Gluten Free</option>
          <option value="2">Ketogenic</option>
          <option value="3">Vegetarian</option>
          <option value="4">Dairy free</option>
          <option value="5">Lacto Ovo-Vegetarian</option>
          <option value="6">Pescatarian</option>
          <option value="7">Paleo</option>
          <option value="8">Primal</option>
          <option value="9">Whole 30</option>
          
        </select>



        <button>Submit</button>
      </form>
    </div>
    </div>
  );
};

export default RecipeForm;
