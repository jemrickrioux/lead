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

const FormCard = ({
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
  const [isSet, setIsSet] = useState(false);
  let setTheAnswer;

  if (fields.length === 1) {
    setTheAnswer = () => {
      const parsedInput = parseFloat(values[fields[0].type]);
      const answer = parsedInput * pastValue;
      setAnswer(answer);
      setIsSet(true);
    };
  } else if (fields.length === 2) {
    setTheAnswer = () => {
      const firstParsed = parseFloat(values[fields[0].type]);
      const secondParsed = parseFloat(values[fields[1].type]);
      if (pastValue) {
        const answer = firstParsed * secondParsed * pastValue;
        setAnswer(answer);
        setIsSet(true);
      } else {
        const answer = firstParsed * secondParsed;
        setAnswer(answer);
        setIsSet(true);
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

  return isSet ? (
    <Card className={classes.card}>
      <CardHeader title={title} />
      <CardContent>
        <p className={classes.answerText}>
          {answerTemplate}{" "}
          <b>{Dinero({ amount: parseInt(answer * 100) }).toFormat("$0.00")}</b>
        </p>
        <Fab
          variant="extended"
          size="medium"
          color="primary"
          onClick={() => setIsSet(false)}
          aria-label="add"
          className={classes.buttons}
        >
          <AddIcon />
          Re-Calculer
        </Fab>
      </CardContent>
    </Card>
  ) : (
    <Card className={classes.card}>
      <CardHeader title={title} />
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
        <Fab
          size="medium"
          color="primary"
          variant="extended"
          onClick={setTheAnswer}
          aria-label="add"
          className={classes.buttons}
        >
          <AddIcon className={classes.extendedIcon} />
          Calculer
        </Fab>
      </CardContent>
    </Card>
  );
};

export default FormCard;
