import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  makeStyles,
  createMuiTheme,
  ThemeProvider
} from "@material-ui/core/styles";
import {
  Card,
  CardContent,
  Container,
  CardHeader,
  Typography,
  Button,
  Fab
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  resultsContent: {
    marginLeft: theme.spacing(2),
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3)
  }
}));

const classes = makeStyles({});

export default function Results(props) {
  const classes = useStyles();
  const { text } = props;
  const { results } = text;
  return (
    <Container>
      <Card>
        <CardContent>
          <CardHeader title={results.title} subheader={results.subheader} />
          <Typography className={classes.resultsContent} variant={"body1"}>
            {results.content}
          </Typography>
          <Link to={"/calculateur"}>
            <Button variant="outlined">Revenir</Button>
          </Link>
        </CardContent>
      </Card>
    </Container>
  );
}
