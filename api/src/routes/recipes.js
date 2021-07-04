const { Router } = require('express');
const router = Router();
const axios = require('axios').default;
require('dotenv').config();
const { API_KEY } = process.env;

const { Recipe, Type } = require('../db.js');

router.get('/', async(req, res) => {
    let recipesResult = [];
    let recipesAPI = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`);
    let recipesAPIFull = recipesAPI.data.results.map((e)=> {
        var recipe = {
            id: e.id,
            title: e.title,
            summary: e.summary,
            spoonacularScore: e.spoonacularScore,
            healthScore: e.healthScore,
            analyzedInstructions: e.analyzedInstructions.map((s)=>s.steps.map((p)=>p.step)),
            diets: e.diets,
            image: e.image,

        };
        return recipe;
    })
    recipesResult = recipesResult.concat(recipesAPIFull);
    let recipesDB = await Recipe.findAll();
    recipesResult = recipesResult.concat(recipesDB);
    res.send(recipesResult);
});


module.exports = router;


