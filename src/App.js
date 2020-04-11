import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {
  makeStyles,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core/styles";
import Home from "./components/Home";
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
  const [ltv, setLtv] = useState(0);
  const [cac, setCac] = useState(0);
  const [moyen, setMoyen] = useState(0);
  const [frequence, setFrequence] = useState(0);
  const setValue = (type) => (newValue) => {
    const newConfigs = {
      ...configs,
      results: {
        ...configs.results,
        [type]: newValue,
      },
    };
    setConfigs(newConfigs);
  };

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Switch>
          <Route path="/" exact render={() => <Home text={configs.text} />} />
          <Route
            path="/calculateur"
            exact
            render={() => <Wizard setValue={setValue} configs={configs} />}
          />
          <Route
            path="/calculateur/confirmation"
            render={() => (
              <Optin
                configs={configs}
                setLtv={setLtv}
                setMoyenne={setMoyen}
                setCac={setCac}
                setFrequence={setFrequence}
              />
            )}
          />
          <Route
            path="/calculateur/resultat"
            render={() => (
              <Results
                text={configs.text}
                stats={configs.results}
                frequence={frequence}
                moyen={moyen}
                ltv={ltv}
                cac={cac}
              />
            )}
          />
          )} />
        </Switch>
      </ThemeProvider>
    </Router>
  );
};

export default App;
