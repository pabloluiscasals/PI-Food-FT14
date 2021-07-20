const { Router } = require("express");
const router = Router();
const axios = require("axios").default;
require("dotenv").config();
const { API_KEY } = process.env;
const { Op } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

const { Recipe, Type } = require("../db.js");

router.get("/", async (req, res, next) => {
  let { name, order } = req.query;
// Search by name
  if (name) {
    try {
      let recipeSearch = [];
      let recipeDB = await Recipe.findAll({
        where: {
          title: {
            [Op.iLike]: `%${name}%`,
          },
        },
        include: [Type],
      });
      recipeSearch = recipeSearch.concat(recipeDB);
      let recipesAPI = await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&query=${name}&number=100`
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
      recipeSearch = recipeSearch.concat(recipesAPIFull);
      res.send(recipeSearch);
    } catch (error) {
      next(error);
      console.log(error);
    }
    // order by tutle Ascendent
  } else if (req.query.order === "titleASC") {
    console.log("title ASCC");
    try {
      let recipesResult = [];
      let recipesAPI = await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
      );
      let recipesAPIFull = recipesAPI.data.results.map((e) => {
        var recipe = {
          id: e.id,
          title: e.title,
          summary: e.summary,
          spoonacularScore: e.spoonacularScore,
          healthScore: e.healthScore,
          analyzedInstructions: e.analyzedInstructions.map((s) =>
            s.steps.map((p) => p.step)
          ),
          diets: e.diets,
          image: e.image,
        };
        return recipe;
      });
      recipesResult = recipesResult.concat(recipesAPIFull);
      let recipesDB = await Recipe.findAll({
        include: [Type],
      });
      recipesResult = recipesResult.concat(recipesDB);
      recipesResult.sort(function (a, b) {
        if (a.title > b.title) {
          return 1;
        }
        if (a.title < b.title) {
          return -1;
        }
        return 0;
      });
      res.send(recipesResult);
    } catch (error) {
      next(error);
      console.log(error);
    }
    // order by title Descendent
  } else if (req.query.order === "titleDESC") {
    console.log("title DESC");
    try {
      let recipesResult = [];
      let recipesAPI = await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
      );
      let recipesAPIFull = recipesAPI.data.results.map((e) => {
        var recipe = {
          id: e.id,
          title: e.title,
          summary: e.summary,
          spoonacularScore: e.spoonacularScore,
          healthScore: e.healthScore,
          analyzedInstructions: e.analyzedInstructions.map((s) =>
            s.steps.map((p) => p.step)
          ),
          diets: e.diets,
          image: e.image,
        };
        return recipe;
      });
      recipesResult = recipesResult.concat(recipesAPIFull);
      let recipesDB = await Recipe.findAll({
        include: [Type],
      });
      recipesResult = recipesResult.concat(recipesDB);
      recipesResult.sort(function (b, a) {
        if (a.title > b.title) {
          return 1;
        }
        if (a.title < b.title) {
          return -1;
        }
        return 0;
      });
      res.send(recipesResult);
    } catch (error) {
      next(error);
      console.log(error);
    }
    // order by spoonacularScore Ascendent
  } else if (req.query.order === "spoonacularScoreASC") {
    console.log("spoonacularScoreASC");
    try {
      let recipesResult = [];
      let recipesAPI = await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
      );
      let recipesAPIFull = recipesAPI.data.results.map((e) => {
        var recipe = {
          id: e.id,
          title: e.title,
          summary: e.summary,
          spoonacularScore: e.spoonacularScore,
          healthScore: e.healthScore,
          analyzedInstructions: e.analyzedInstructions.map((s) =>
            s.steps.map((p) => p.step)
          ),
          diets: e.diets,
          image: e.image,
        };
        return recipe;
      });
      recipesResult = recipesResult.concat(recipesAPIFull);
      let recipesDB = await Recipe.findAll({
        include: [Type],
      });
      recipesResult = recipesResult.concat(recipesDB);
      recipesResult.sort(function (a, b) {
        if (a.spoonacularScore > b.spoonacularScore) {
          return 1;
        }
        if (a.spoonacularScore < b.spoonacularScore) {
          return -1;
        }
        return 0;
      });
      res.send(recipesResult);
    } catch (error) {
      next(error);
      console.log(error);
    }
    // order by spoonacularScore Descendent
  } else if (req.query.order === "spoonacularScoreDESC") {
    console.log("SpoonacularScore DESC");
    try {
      let recipesResult = [];
      let recipesAPI = await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
      );
      let recipesAPIFull = recipesAPI.data.results.map((e) => {
        var recipe = {
          id: e.id,
          title: e.title,
          summary: e.summary,
          spoonacularScore: e.spoonacularScore,
          healthScore: e.healthScore,
          analyzedInstructions: e.analyzedInstructions.map((s) =>
            s.steps.map((p) => p.step)
          ),
          diets: e.diets,
          image: e.image,
        };
        return recipe;
      });
      recipesResult = recipesResult.concat(recipesAPIFull);
      let recipesDB = await Recipe.findAll({
        include: [Type],
      });
      recipesResult = recipesResult.concat(recipesDB);
      recipesResult.sort(function (b, a) {
        if (a.spoonacularScore > b.spoonacularScore) {
          return 1;
        }
        if (a.spoonacularScore < b.spoonacularScore) {
          return -1;
        }
        return 0;
      });
      res.send(recipesResult);
    } catch (error) {
      next(error);
      console.log(error);
    }
  } else {
    console.log("get all recipes");
    try {
      let recipesResult = [];
      let recipesAPI = await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
      );
      let recipesAPIFull = recipesAPI.data.results.map((e) => {
        var recipe = {
          id: e.id,
          title: e.title,
          summary: e.summary,
          spoonacularScore: e.spoonacularScore,
          healthScore: e.healthScore,
          analyzedInstructions: e.analyzedInstructions.map((s) =>
            s.steps.map((p) => p.step)
          ),
          diets: e.diets,
          image: e.image,
        };
        return recipe;
      });
      recipesResult = recipesResult.concat(recipesAPIFull);
      let recipesDB = await Recipe.findAll({
        include: [Type],
      });
      recipesResult = recipesResult.concat(recipesDB);
      res.send(recipesResult);
    } catch (error) {
      next(error);
      console.log(error);
    }
  }
});

router.get("/:id", async (req, res, next) => {
  let { id } = req.params;
  try {
    // if id includes a "-", searchs in the dB
    if (id.includes("-")) {
      const recipeDB = await Recipe.findOne({
        where: { id },
        include: {
          model: Type,
          attributes: ["diets"],
          through: { attributes: [] },
        },
      });
      res.send(recipeDB);
    } else {
      // searchs by id in the API
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
    }
  } catch (error) {
    next(error);
    console.log(error);
  }
});

router.post("/recipe", async (req, res, next) => {
  const newRecipe = req.body;
  console.log(newRecipe);
  try {
    let [recipe] = await Recipe.findOrCreate({
      where: {
        id: uuidv4(),
        title: newRecipe.title,
        summary: newRecipe.summary,
        spoonacularScore: newRecipe.spoonacularScore,
        healthScore: newRecipe.healthScore,
        analyzedInstructions: newRecipe.analyzedInstructions,
      },
    });
      
    // saves the diets as an array of ids
    await recipe.addType(newRecipe.diets);
    return res.send(recipe);
  } catch (error) {
    next(error);
    console.log(error);
  }
});

module.exports = router;
