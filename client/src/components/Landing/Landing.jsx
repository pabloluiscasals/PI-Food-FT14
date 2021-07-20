import React from "react";
import { Link } from "react-router-dom";
import "./Landing.css";

function Landing() {
  return (
    <div className="landing">
      <h1>Welcome to Henry´s Food</h1>
      <Link to="/home">
        <button>Press here to begin</button>
      </Link>
    </div>
  );
}

export default Landing;
