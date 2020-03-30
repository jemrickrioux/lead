import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Divider,
  Card,
  FormControl,
  CardContent,
  Box,
  TextField,
  Button
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

const FormCardSimple = ({
  fields,
  values,
  answerTemplate,
  setValues,
  id,
  title,
  pastValue,
  answer,
  setAnswer
}) => {
  const classes = useStyles();

  const setTheAnswer = () => {
    const inputParsed = parseFloat(values[fields[0].type]);
    const answer = inputParsed * pastValue;
    setAnswer(answer);
  };

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
              {answerTemplate} <b>{answer}</b>
            </p>
          </div>
        </Box>
      </CardContent>
    </Card>
  );
};

export default FormCardSimple;
