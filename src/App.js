import React, { useState } from "react";
import FormCard from "./FormCard";
import { Container } from "@material-ui/core";

const configurations = {
  forms: [
    {
      title: "Lifetime value",
      id: "ltv",
      fields: [
        { label: "Fréquence achat", type: "frequence" },
        { label: "Achat moyen", type: "contrat" }
      ],
      double: false,
      simple: true,
      values: {
        ltv: 0,
        contrat: 0,
        frequence: 0
      },
      answerTemplate: "The LTV is"
    },
    {
      title: "Customer Aquisition Cost",
      id: "cac",
      fields: [{ label: "% marketing", type: "marketing" }],
      double: false,
      simple: true,
      values: {
        ltv: 0,
        cac: 0,
        marketing: 0
      },
      answerTemplate: "The CAC is"
    },
    {
      title: "Prospect Aquisition Cost",
      id: "pac",
      fields: [{ label: "Taux de closing", type: "closing" }],
      double: false,
      simple: true,
      values: {
        closing: 0,
        cac: 0,
        pac: 0
      },
      answerTemplate: "The PAC is"
    },
    {
      type: "multiply",
      title: "Cost Per Signup",
      id: "cpa",
      fields: [{ label: "Taux de closing", type: "closing" }],
      simple: true,
      double: false,
      values: {
        closing: 0,
        cac: 0,
        cpa: 0
      },
      answerTemplate: "The CPA is"
    },
    {
      type: "multiply",
      title: "Cost Per LP View",
      id: "lpv",
      fields: [{ label: "LP Conversion Rate", type: "conversion" }],
      simple: true,
      double: false,
      values: {
        conversion: 0,
        cpa: 0,
        lpv: 0
      },
      answerTemplate: "LP View is"
    },
    {
      title: "Price per 1k Display",
      id: "cpm",
      fields: [{ label: "Ads CTR", type: "ctr" }],
      simple: true,
      double: false,
      values: {
        ctr: 0,
        cpm: 0,
        lpv: 0
      },
      answerTemplate: "CPM is"
    }
  ]
};

const App = () => {
  const baseState = configurations => {
    let baseState = {};
    let results = {};
    configurations.forms.forEach(form => {
      results[form.id] = "";
      baseState[form.id] = {
        values: form.values
      };
    });
    baseState = { ...baseState, results, forms: configurations.forms };
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
  );
};

export default App;
