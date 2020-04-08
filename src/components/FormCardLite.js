import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, FormControl, CardContent, TextField } from "@material-ui/core";

import { Add as AddIcon } from "@material-ui/icons";

const useStyles = makeStyles(theme => ({
  card: {
    margin: "25px",
    maxHeight: "340px",
    "& > *": {
      margin: theme.spacing(1)
    }
  },
  form: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch"
    }
  },
  button: {
    background: "#e70095",
    color: "white",
    fontFamily: "Quicksand",
    fontWeight: "Bold",
    fontSize: "18px"
  },
  answerText: {
    marginright: theme.spacing(1),
    fontSize: "28px"
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  },
  buttons: {
    marginTop: theme.spacing(1),
    fontFamily: "Quicksand",
    fontWeight: "bold"
  }
}));

const FormCardLite = ({ fields, values, setValues, results }) => {
  const classes = useStyles();

  const handleChange = (e, type) => {
    const data = e.currentTarget.value;
    setValues(data);
  };

  return (
    <Card className={classes.card}>
      <CardContent>
        <form className={classes.form} noValidate autoComplete="off">
          {fields.map(field => {
            return (
              <FormControl key={field.type} variant="outlined">
                <TextField
                  key={field.type}
                  label={field.label}
                  variant="outlined"
                  type="number"
                  value={results[field.type]}
                  onChange={e => handleChange(e, field.type)}
                />
              </FormControl>
            );
          })}
        </form>
      </CardContent>
    </Card>
  );
};

export default FormCardLite;
