import React from "react";
import { Container } from "@material-ui/core";
import FormCard from "./FormCard";

export default function SaleTool({ configs, setValue, setAnswer }) {
  return (
    <Container>
      {configs.steps.map((form, key) => {
        return (
          <FormCard
            title={form.title}
            pastValue={
              key > 0 ? configs.results[configs.steps[key - 1].id] : false
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
}
