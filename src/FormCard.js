import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Divider,
  Card,
  FormControl,
  CardContent,
  TextField,
  Button,
  Box
} from "@material-ui/core";
import Dinero from "dinero.js";

const useStyles = makeStyles(theme => ({
  root: {
    margin: "25px",
    maxWidth: "600px",
    maxHeight: "360px",
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch"
    }
  },
  answer: {
    marginLeft: "10px",
    fontSize: "28px"
  }
}));

const FormCard = ({
  fields,
  values,
  answerTemplate,
  setValues,
  simple,
  double,
  id,
  title,
  pastValue,
  answer,
  setAnswer
}) => {
  const classes = useStyles();
  let setTheAnswer;

  if (simple) {
    setTheAnswer = () => {
      console.log("setting the answer: simple");
      const parsedInput = parseFloat(values[fields[0].type]);
      const answer = parsedInput * pastValue;
      setAnswer(answer);
    };
  } else if (double) {
    setTheAnswer = () => {
      console.log("setting the answer: double");
      const firstParsed = parseFloat(values[fields[0].type]);
      const secondParsed = parseFloat(values[fields[1].type]);
      console.log(firstParsed, secondParsed);
      if (pastValue) {
        const answer = firstParsed * secondParsed * pastValue;
        setAnswer(answer);
        console.log(answer);
      } else {
        const answer = firstParsed * secondParsed;

        setAnswer(answer);
        console.log(answer);
      }
    };
  }

  const handleChange = (e, type) => {
    const data = {
      ...values,
      [type]: e.currentTarget.value
    };
    setValues(data);
  };

  return (
    <Card className={classes.root}>
      <CardContent>
        <Box display={"flex"}>
          <div>
            <h2>{title}</h2>
            <form className={classes.root} noValidate autoComplete="off">
              {fields.map(field => {
                return (
                  <FormControl variant="outlined">
                    <TextField
                      id={field.type}
                      label={field.label}
                      variant="outlined"
                      type="number"
                      value={values[field.type]}
                      onChange={e => handleChange(e, field.type)}
                    />
                  </FormControl>
                );
              })}
              <Button onClick={setTheAnswer}>Submit</Button>
            </form>
          </div>
          <Divider />
          <div>
            <p className={classes.answer}>
              {answerTemplate} {"  "}
              <b>{answer}</b>
            </p>
          </div>
        </Box>
      </CardContent>
    </Card>
  );
};

export default FormCard;
const ça = `

<FormControl variant="outlined">
            <TextField
              id="contrat"
              label="Achat Moyen"
              variant="outlined"
              type="number"
              value={values.contrat}
              onChange={e => handleChange(e, "contrat")}
            />
          </FormControl>
          <FormControl variant="outlined">
            <TextField
              id="frequence"
              label="Fréquence achat"
              variant="outlined"
              value={values.frequence}
              onChange={e => handleChange(e, "frequence")}
            />
          </FormControl>
`;
