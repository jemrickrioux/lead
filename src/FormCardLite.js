import React, { useState } from "react";
import {
  makeStyles,
  createMuiTheme,
  ThemeProvider
} from "@material-ui/core/styles";
import {
  Divider,
  Card,
  FormControl,
  CardContent,
  CardHeader,
  Typography,
  TextField,
  Button,
  Fab,
  Box
} from "@material-ui/core";

import { Add as AddIcon } from "@material-ui/icons";
import Dinero from "dinero.js";

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
      margin: theme.spacing(1)
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

const FormCardLite = ({
  fields,
  values,
  answerTemplate,
  setValues,
  title,
  pastValue,
  answer,
  setAnswer
}) => {
  const classes = useStyles();

  const handleChange = (e, type) => {
    const data = {
      ...values,
      [type]: e.currentTarget.value
    };
    setValues(data);
  };

  return (
    <Card className={classes.card}>
      <CardContent>
        <form className={classes.form} noValidate autoComplete="off">
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
        </form>
      </CardContent>
    </Card>
  );
};

export default FormCardLite;
