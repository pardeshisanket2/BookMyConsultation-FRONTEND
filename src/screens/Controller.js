import React from "react";
import Home from "../screens/home/Home";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { hydrateLocalStorage } from './../services/localStorageService';

const Controller = () => {
  const baseUrl = "/api/v1/";
  hydrateLocalStorage();
  return (
    <Router>
      <div className="main-container">
        <Route
          exact
          path="/"
          render={(props) => <Home {...props} baseUrl={baseUrl} />}
        />
      </div>
    </Router>
  );
};

export default Controller;
