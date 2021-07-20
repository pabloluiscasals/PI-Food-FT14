import React from "react";
import { useDispatch } from "react-redux";
import { getAllRecipes } from "../../actions/index";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import "../Navbar/Navbar.css";

function Navbar() {
  const dispatch = useDispatch();
  const onClick = (e) => {
    dispatch(getAllRecipes());
  };
  return (
    <div className="navbar">
      
      <Link onClick={(e) => onClick(e)} to="/home" refresh="true">
        Home
      </Link>
      <div>
        <Link to="/create-recipe">Create new recipe</Link>
      </div>
      <div className="Search">
      <SearchBar />
      </div>
    </div>
  );
}

export default Navbar;
