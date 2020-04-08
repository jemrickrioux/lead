import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import Dinero from "dinero.js";
import axios from "axios";
import {
  Container,
  Button,
  Typography,
  Card,
  CardContent,
  CardHeader,
  TextField,
  FormGroup,
} from "@material-ui/core";

const baseUrl =
  process.env.NODE_ENV == "development"
    ? "http://localhost:5000/add"
    : "https://lead-leo.herokuapp.com/add";

const addContact = async (data) => {
  const res = await axios.post(baseUrl, data);
  return res;
};
const parsed = (input) => parseFloat(input);
const ltv = (moyen, frequence) => moyen * frequence;
const cac = (ltv, marketing) => ltv * parsed(marketing);
const moyen = (revenus, ventes) => parsed(revenus) / parsed(ventes);
const frequence = (ventes, clients) => parsed(ventes) / parsed(clients);
const formated = (value) =>
  Dinero({ amount: parseInt(value) * 100, currency: "CAD" })
    .setLocale("fr-CA")
    .toFormat("$0,0.00");

export default function Optin(props) {
  const [isValid, setIsValid] = useState(false);
  const [formValue, setFormValue] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
  });

  const handleChange = (e) => {
    let newState = {
      ...formValue,
      [e.currentTarget.id]: e.currentTarget.value,
    };
    setFormValue(newState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { results } = props.configs;
    const moyenne = moyen(results.revenus, results.ventes);
    const freq = frequence(results.ventes, results.clients);
    const ltver = ltv(moyenne, freq);

    const valider = await addContact({
      ...formValue,
      ...results,
      moyen: moyenne,
      frequence: freq,
      ltv: ltver,
      cac: cac(ltver, results.marketing),
    });
    if (valider.status == "200") {
      setIsValid(true);
    }
  };

  return isValid ? (
    <Redirect push to="/calculateur/resultat" />
  ) : (
    <Container>
      <Card>
        <CardContent>
          <CardHeader
            title={"Plus qu'une seule étape..."}
            subheader={
              "Remplissez ce court formulaire afin d'obtenir vos résultats"
            }
          />
          <form>
            <FormGroup>
              <TextField
                id="firstName"
                value={formValue.firstName}
                onChange={handleChange}
                label="Prénom"
                variant="outlined"
              />
              <TextField
                id="lastName"
                value={formValue.lastName}
                onChange={handleChange}
                label="Nom de famille"
                variant="outlined"
              />
              <TextField
                id="email"
                value={formValue.email}
                onChange={handleChange}
                label="Courriel"
                variant="outlined"
              />
              <TextField
                id="phone"
                value={formValue.phone}
                onChange={handleChange}
                label="Numéro de téléphone"
                variant="outlined"
              />
            </FormGroup>
            <Button onClick={handleSubmit}>Je veux mes résultats!</Button>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
}
