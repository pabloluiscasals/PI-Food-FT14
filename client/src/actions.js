import axios from "axios";
import { SET_RECIPE, SET_RECIPE_DETAIL } from "./actionsNames";

export function getAllRecipes() {
  return (dispatch) => {
    axios.get(`http://localhost:3001/recipes/`).then((response) => {
      dispatch({ type: SET_RECIPE, payload: response.data });
    });
  };
}

export function getRecipe(id) {
  return (dispatch) => {
    axios
      .get(`http://localhost:3001/recipes/${id}`)
      .then((response) => {
        dispatch({ type: SET_RECIPE_DETAIL, payload: response.data });
      })
      .catch((error) => {
        if (error.response?.status !== 404) alert("Something went wrong");
        dispatch({ type: SET_RECIPE_DETAIL, payload: null });
      });
  };
}

export function clearRecipe(id) {
  return {
    type: SET_RECIPE_DETAIL,
    payload: undefined,
  };
}
