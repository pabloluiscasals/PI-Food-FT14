const { Router } = require("express");
const router = Router();
const axios = require("axios").default;
require("dotenv").config();
const { API_KEY } = process.env;
const { Op } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

const { Recipe, Type } = require("../db.js");

router.get("/", async (req, res) => {
  let { name, order } = req.query;

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
      console.log(error);
    }
  } else if (req.query.order === "titleASC") {
    console.log(req.query.order);
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
      let recipesDB = await Recipe.findAll();
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
      console.log(error);
    }
  } else if (req.query.order === "titleDESC") {
    console.log("2");
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
      let recipesDB = await Recipe.findAll();
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
      console.log(error);
    }
  } else if (req.query.order === "spoonacularScoreASC") {
    console.log("2");
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
      let recipesDB = await Recipe.findAll();
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
      console.log(error);
    }
  } else if (req.query.order === "spoonacularScoreDESC") {
    console.log("2");
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
      let recipesDB = await Recipe.findAll();
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
      console.log(error);
    }
  } else {
    console.log("3");
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
      let recipesDB = await Recipe.findAll();
      recipesResult = recipesResult.concat(recipesDB);
      res.send(recipesResult);
    } catch (error) {
      console.log(error);
    }
  }
});

router.get("/:id", async (req, res) => {
  let { id } = req.params;
  try {
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
    console.log(error);
  }
});

router.post("/recipe", async (req, res) => {
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
    await recipe.addType(newRecipe.diets);
    return res.send(recipe);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
