const { Router } = require("express");
const router = Router();
const axios = require("axios").default;
require("dotenv").config();
const { API_KEY } = process.env;

const { Recipe, Type } = require("../db.js");

router.get("/", async (req, res) => {
  try {
    let recipesResult = [];
    let recipesAPI = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
    );
    let recipesAPIFull = recipesAPI.data.results.map((e) => {
      var recipe = {
        id: e.id,
        title: e.title,
        diets: e.diets,
        image: e.image,
      };
      return recipe;
    });
    recipesResult = recipesResult.concat(recipesAPIFull);
    let recipesDB = await Recipe.findAll();
    recipesResult = recipesResult.concat(recipesDB);
    res.send(recipesResult);
  } catch (error) {
    console.log(error);
  }
});

router.get('/:id', async (req, res) => {
  let { id } = req.params;
  console.log(id);
  try {
    let recipeAPI = await axios.get(
        `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`
      );
      var recipe = {
          id: recipeAPI.data.id,
          title: recipeAPI.data.title,
          summary: recipeAPI.data.summary,
          spoonacularScore: recipeAPI.data.spoonacularScore,
          healthScore: recipeAPI.data.healthScore,
          analyzedInstructions: recipeAPI.data.analyzedInstructions.map((s) =>
            s.steps.map((p) => p.step)
          ),
          diets: recipeAPI.data.diets,
          image: recipeAPI.data.image,
        };
      res.send(recipe);
  } catch (error) {
      console.log(error);
  }
  
});

module.exports = router;
