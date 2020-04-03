import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Button } from "@material-ui/core";

export default function Home() {
  return (
    <Container>
      <div>
        <h1>Calculateur pour campagnes publicitaires</h1>
        <h2>Investissez suffisament et intelligemment.</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent et
          semper lacus. Nullam ex lectus, iaculis in venenatis at, pharetra quis
          eros. Donec eu leo sed nibh viverra semper. Duis aliquet dapibus
          lacinia. Donec et magna ultrices, mattis purus eu, varius magna. Morbi
          placerat nunc sapien, at tempus quam lacinia malesuada. Mauris rutrum
          efficitur eleifend. Aliquam sed posuere magna, a suscipit velit.
        </p>
        <Link to="/calculateur">
          <Button color="primary" variant="outlined">
            Calculer maintenant
          </Button>
        </Link>
      </div>
    </Container>
  );
}
