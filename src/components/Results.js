import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  makeStyles,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core/styles";
import {
  Card,
  CardContent,
  Container,
  CardHeader,
  Typography,
  Button,
  Fab,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  resultsContent: {
    marginLeft: theme.spacing(2),
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
}));

export default function Results(props) {
  const classes = useStyles();

  const { text, stats } = props;

  const { results } = text;

  return (
    <Container>
      <Card>
        <CardContent>
          <CardHeader title={results.title} subheader={results.subheader} />
          <Typography className={classes.resultsContent} variant={"body1"}>
            {results.content}
          </Typography>
          <Typography className={classes.resultsContent} variant={"body1"}>
            Un client vaut {stats.ltv}
          </Typography>
          <Typography className={classes.resultsContent} variant={"body1"}>
            Vous pouvez investir jusqu'à
            {" " + stats.cac + " "}
            par client!
          </Typography>
          <Link to={"/calculateur"}>
            <Button variant="outlined">Revenir</Button>
          </Link>
        </CardContent>
      </Card>
    </Container>
  );
}
