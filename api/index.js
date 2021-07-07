//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn } = require('./src/db.js');

const { Recipe, Type } = require("./src/db.js");
const axios = require("axios").default;
require("dotenv").config();
const { API_KEY } = process.env;

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  console.log("dB ready");
  server.listen(3001, () => {
    console.log('%s listening at 3001');// eslint-disable-line no-console
    if (Type.length === 0) {
    const data = async () => {
      try {
        let dietsAPI = await axios.get(
          `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
        );
        let dietsAPIFull = dietsAPI.data.results.map((e) => {
          var diet = {
            diets: e.diets,
          };
          return diet;
        });
        let dietsDB = [];
        dietsAPIFull.map((diet) => {
          diet.diets.map((element) => {
            if (!dietsDB.includes(element)) dietsDB.push(element);
          });
        });
        dietsDB.map(diet=>Type.findOrCreate({where: {diets: diet}}));
        console.log("Diets cargados en la dB");
        } catch (error) {
        console.log(error);
      }
    }
    data();
  };
  });
});
