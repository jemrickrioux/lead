import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {
  makeStyles,
  createMuiTheme,
  ThemeProvider
} from "@material-ui/core/styles";
import { Container, Button } from "@material-ui/core";
import Home from "./components/Home";
import SaleTool from "./components/SaleTool";
import Wizard from "./components/Wizard";
import Results from "./components/Results";

import getConfigurations from "./config";

const theme = createMuiTheme({
  palette: {
    primary: { main: "#e70095" }
  }
});

const App = () => {
  const configurations = getConfigurations();
  const [configs, setConfigs] = useState(configurations);

  const setValue = type => newValue => {
    console.log("newvalues", newValue);
    console.log("configs", configs);
    const newConfigs = {
      ...configs,
      results: {
        ...configs.results,
        [type]: newValue
      }
    };
    setConfigs(newConfigs);
  };

  const setAnswer = type => answer => {
    const newAnswer = {
      ...configs,
      results: {
        ...configs.results,
        [type]: answer
      }
    };
    setConfigs(newAnswer);
  };

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route
            path="/calculateur"
            exact
            render={() => (
              <Wizard
                setValue={setValue}
                setAnswer={setAnswer}
                configs={configs}
              />
            )}
          />
          <Route
            path="/ventes"
            exact
            render={() => (
              <SaleTool
                setValue={setValue}
                configs={configs}
                setAnswer={setAnswer}
              />
            )}
          />
          <Route
            path="/calculateur/resultat"
            render={() => <Results text={configs.text} />}
          />
        </Switch>
      </ThemeProvider>
    </Router>
  );
};

export default App;
