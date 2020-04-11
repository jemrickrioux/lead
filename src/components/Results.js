import React, { useState } from "react";
import { Link } from "react-router-dom";
import Dinero from "dinero.js";
import {
  makeStyles,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core/styles";
import {
  Card,
  CardContent,
  Grid,
  Paper,
  Container,
  CardHeader,
  Typography,
  Button,
  Fab,
} from "@material-ui/core";

const formated = (value) => {
  console.log("Value being formated: ", value);
  return Dinero({ amount: parseInt(value) * 100, currency: "CAD" })
    .setLocale("fr-CA")
    .toFormat("$0,0.00");
};

const useStyles = makeStyles((theme) => ({
  resultsContent: {
    marginLeft: theme.spacing(2),
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  backButton: {
    marginTop: theme.spacing(4),
  },
}));

export default function Results(props) {
  const classes = useStyles();

  const { text, ltv, moyen, cac, frequence } = props;

  const { results } = text;

  return (
    <Container>
      <Card>
        <CardContent>
          <CardHeader title={results.title} subheader={results.subheader} />
          <Grid item xs={12}>
            <Grid container justify="flex start" direction="column" spacing={2}>
              {[
                { value: frequence, name: "Fréquence" },
                { value: formated(moyen), name: "Contrat moyen" },
                { value: formated(ltv), name: "LTV" },
                { value: formated(cac), name: "CAC" },
              ].map((value) => (
                <Grid key={value} item>
                  <Paper className={classes.paper}>
                    <Typography variant="h5"> {value.name}</Typography>
                    <Typography variant="h4">{value.value}</Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Link to={"/calculateur"}>
            <Button className={classes.backButton} variant="outlined">
              Revenir
            </Button>
          </Link>
        </CardContent>
      </Card>
    </Container>
  );
}
