import React, { useState } from "react";
import FormCard from "./FormCard";
import FormCardSimple from "./FormCardSimple";
import { Container } from "@material-ui/core";

const configs = {
  ltv: {}
};

const App = () => {
  const [configs, setConfigs] = useState({
    results: {
      ltv: "",
      pac: "",
      cac: "",
      cpa: "",
      lpv: ""
    },
    ltv: {
      type: "multiply",
      title: "Lifetime value",
      id: "ltv",
      fields: [
        { label: "Achat Moyen", type: "contrat" },
        { label: "Fréquence achat", type: "frequence" }
      ],
      values: {
        ltv: "",
        contrat: "",
        frequence: ""
      },
      answerTemplate: "The LTV is"
    },
    cac: {
      type: "multiply",
      title: "Customer Aquisition Cost",
      id: "cac",
      fields: [
        { label: "Taux de closing", type: "closing" },
        { label: "% marketing", type: "marketing" }
      ],
      values: {
        closing: "",
        cac: "",
        marketing: ""
      },
      answerTemplate: "The CAC is"
    },
    cpa: {
      type: "multiply",
      title: "Cost Per Signup",
      id: "cpa",
      fields: [{ label: "Taux de closing", type: "closing" }],
      values: {
        closing: "",
        cac: "",
        cpa: ""
      },
      answerTemplate: "The CPA is"
    },
    lpv: {
      type: "multiply",
      title: "Cost Per LP View",
      id: "lpv",
      fields: [{ label: "LP Conversion Rate", type: "conversion" }],
      values: {
        conversion: "",
        cpa: "",
        lpv: ""
      },
      answerTemplate: "LP View is"
    }
  });

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
      <FormCard
        title={configs.ltv.title}
        id={configs.ltv.id}
        fields={configs.ltv.fields}
        values={configs.ltv.values}
        answer={configs.results[configs.ltv.id]}
        setAnswer={setAnswer(configs.ltv.id)}
        answerTemplate={configs.ltv.answerTemplate}
        setValues={setValue(configs.ltv.id)}
      />
      <FormCard
        pastValue={configs.results.ltv}
        title={configs.cac.title}
        id={configs.cac.id}
        fields={configs.cac.fields}
        values={configs.cac.values}
        answer={configs.results[configs.cac.id]}
        setAnswer={setAnswer(configs.cac.id)}
        answerTemplate={configs.cac.answerTemplate}
        setValues={setValue(configs.cac.id)}
      />
      <FormCardSimple
        pastValue={configs.results.cac}
        title={configs.cpa.title}
        id={configs.cpa.id}
        fields={configs.cpa.fields}
        values={configs.cpa.values}
        answer={configs.results[configs.cpa.id]}
        setAnswer={setAnswer(configs.cpa.id)}
        answerTemplate={configs.cpa.answerTemplate}
        setValues={setValue(configs.cpa.id)}
      />
      <FormCardSimple
        pastValue={configs.results.cpa}
        title={configs.lpv.title}
        id={configs.lpv.id}
        fields={configs.lpv.fields}
        values={configs.lpv.values}
        answer={configs.results[configs.lpv.id]}
        setAnswer={setAnswer(configs.lpv.id)}
        answerTemplate={configs.lpv.answerTemplate}
        setValues={setValue(configs.lpv.id)}
      />
    </Container>
  );
};

export default App;
