import React, { useState } from "react";
import FormCard from "./FormCard";
import {
  makeStyles,
  createMuiTheme,
  ThemeProvider
} from "@material-ui/core/styles";
import { Container } from "@material-ui/core";

const theme = createMuiTheme({
  palette: {
    primary: { main: "#e70095" }
  }
});

const configurations = {
  fundamentals: [
    {
      title: "Lifetime Customer Value",
      id: "ltv",
      fields: [
        { label: "Fréquence achat", type: "frequence" },
        { label: "Achat moyen", type: "contrat" }
      ],
      values: {
        ltv: 0,
        contrat: 0,
        frequence: 0
      },
      answerTemplate: "Vos clients valent: "
    },
    {
      title: "Coût aquisition client",
      id: "cac",
      fields: [{ label: "% marketing", type: "marketing" }],
      values: {
        ltv: 0,
        cac: 0,
        marketing: 0
      },
      answerTemplate: "Pour un client vous pouvez payer: "
    },
    {
      title: "Coût par demande d'estimation",
      id: "pac",
      fields: [{ label: "% Rdv en client", type: "closing" }],
      values: {
        closing: 0,
        cac: 0,
        pac: 0
      },
      answerTemplate: "Pour un rendez-vous vous pouvez payer: "
    },
    {
      type: "multiply",
      title: "Coût par lead",
      id: "cpa",
      fields: [{ label: "% Lead en rdv", type: "closing" }],
      values: {
        closing: 0,
        cac: 0,
        cpa: 0
      },
      answerTemplate: "Pour un lead vous pouvez payer: "
    },
    {
      type: "multiply",
      title: "Coût par page vue",
      id: "lpv",
      fields: [{ label: "% conversion landing", type: "conversion" }],
      values: {
        conversion: 0,
        cpa: 0,
        lpv: 0
      },
      answerTemplate: "Pour une page vue vous pouvez payer: "
    }
  ]
};

const App = () => {
  const baseState = configurations => {
    let baseState = {};
    let results = {};
    configurations.fundamentals.forEach(form => {
      results[form.id] = "";
      baseState[form.id] = {
        values: form.values
      };
    });
    baseState = { ...baseState, results, forms: configurations.fundamentals };
    return baseState;
  };
  const [configs, setConfigs] = useState(baseState(configurations));

  const setValue = type => values => {
    const newValues = {
      ...configs,
      [type]: {
        ...configs[type],
        values
      }
    };
    setConfigs(newValues);
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
    <ThemeProvider theme={theme}>
      <Container>
        {configs.forms.map((form, key) => {
          return (
            <FormCard
              title={form.title}
              pastValue={
                key > 0 ? configs.results[configs.forms[key - 1].id] : false
              }
              id={form.id}
              fields={form.fields}
              values={configs[form.id].values}
              answer={configs.results[form.id]}
              setAnswer={setAnswer(form.id)}
              answerTemplate={form.answerTemplate}
              setValues={setValue(form.id)}
              double={form.double}
              simple={form.simple}
            />
          );
        })}
      </Container>
    </ThemeProvider>
  );
};

export default App;
