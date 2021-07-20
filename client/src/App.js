import "./App.css";
import { Route, Switch } from "react-router";
import Home from "./components/Home/Home";
import RecipeForm from "./components/RecipeForm/RecipeForm";
import RecipeDetail from "./components/RecipeDetail/RecipeDetail";
import Landing from "./components/Landing/Landing";
function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/home"component={Home} />
        <Route path="/create-recipe" component={RecipeForm} />
        <Route path={"/recipe/:id"} exact component={RecipeDetail} />
      </Switch>
    </div>
  );
}

export default App;
