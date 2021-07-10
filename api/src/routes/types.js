const { Router } = require("express");
const router = Router();
const axios = require("axios").default;
require("dotenv").config();
const { API_KEY } = process.env;

const { Recipe, Type } = require("../db.js");

// gets a list of diets from the dB
router.get("/", async (req, res) => {
  try {
    let dietsdb = await Type.findAll();
    res.send(dietsdb);
  } catch (error) {
    console.log(error);
  }
});

// getting al the diets from the API
// router.get("/", async (req, res) => {
//   try {
//     let dietsAPI = await axios.get(
//       `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
//     );
//     let dietsAPIFull = dietsAPI.data.results.map((e) => {
//       var diet = {
//         diets: e.diets,
//       };
//       return diet;
//     });
//     let dietsDB = [];
//     dietsAPIFull.map((diet) => {
//       diet.diets.map((element) => {
//         if (!dietsDB.includes(element)) dietsDB.push(element);
//       });
//     });
//     dietsDB.map(diet=>Type.findOrCreate({where: {diets: diet}}));
//     res.send("Carga de Diets terminada");
//   } catch (error) {
//     console.log(error);
//   }
// });

module.exports = router;
