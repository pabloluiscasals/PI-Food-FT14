import { Route } from 'react-router-dom';
import './App.css';
import Landing from "./Landing";
import Home from "./Home";
import RecipeDetail from "./RecipeDetail";


function App() {
  
    return (
    <div className="App">
      <Route path="/" exact component={Landing} />
      <Route path="/home/" exact component={Home} />
      <Route path="/home/recipes/:id" exact component={RecipeDetail} />
    </div>
  );
}

export default App;
