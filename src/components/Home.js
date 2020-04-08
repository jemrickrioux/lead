import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Button, Typography } from "@material-ui/core";

export default function Home(props) {
  const { text } = props;
  const { home } = text;
  return (
    <Container>
      <Typography variant="h1">{home.title}</Typography>
      <Typography variant="h2">{home.subheader}</Typography>
      <Typography variant="body1">{home.content}</Typography>
      <Link to="/calculateur">
        <Button color="primary" variant="outlined">
          Calculer maintenant
        </Button>
      </Link>
    </Container>
  );
}
