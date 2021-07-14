import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { SET_RECIPE, SET_RECIPE_DETAIL} from "./actionsNames";

const inicialState = {
    recipes: [],
    userDetail: undefined
}

function reducer(state = inicialState, action) {
    switch(action.type){
        case SET_RECIPE:{
            return {
                ...state,
                recipes: action.payload
            }
        }
        case SET_RECIPE_DETAIL:{
            return {
                ...state,
                recipeDetail: action.payload
            }
        }
        default: {
            return state;
        }
    }
}

const store = createStore(reducer, applyMiddleware(thunk));

export default store;