import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {
  makeStyles,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core/styles";
import Home from "./components/Home";
import SaleTool from "./components/SaleTool";
import Wizard from "./components/Wizard";
import Results from "./components/Results";
import Optin from "./components/Optin";

import getConfigurations from "./config";

const theme = createMuiTheme({
  palette: {
    primary: { main: "#e70095" },
  },
  typography: {
    fontFamily: ["Quicksand"],
    h1: {
      fontSize: "36px",
    },
    h2: {
      fontSize: "24px",
      color: "grey",
    },
  },
});

const App = () => {
  const configurations = getConfigurations();
  const [configs, setConfigs] = useState(configurations);

  const setValue = (type) => (newValue) => {
    const newConfigs = {
      ...configs,
      results: {
        ...configs.results,
        [type]: newValue,
      },
    };
    console.log("new configs : ", newConfigs);
    setConfigs(newConfigs);
  };

  const setAnswer = (type) => (answer) => {
    const newAnswer = {
      ...configs,
      results: {
        ...configs.results,
        [type]: answer,
      },
    };
    setConfigs(newAnswer);
  };

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Switch>
          <Route path="/" exact render={() => <Home text={configs.text} />} />
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
            path="/calculateur/confirmation"
            render={() => (
              <Optin
                configs={configs}
                setValue={setValue}
                setAnswer={setAnswer}
              />
            )}
          />
          <Route
            path="/calculateur/resultat"
            render={() => (
              <Results
                text={configs.text}
                stats={configs.results}
                setValue={setValue}
                setAnswer={setAnswer}
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
        </Switch>
      </ThemeProvider>
    </Router>
  );
};

export default App;
