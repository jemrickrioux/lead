import React, { useState } from "react";
import { Redirect } from "react-router-dom";
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

export default function Optin(props) {
  const { results } = props.configs;
  const [isValid, setIsValid] = useState(false);
  const [formValue, setFormValue] = useState({
    firstName: "",
    lastName: "",
    company: "",
    phone: "",
    email: "",
  });
  const computeStuff = async () => {
    const moyenne = moyen(results.revenus, results.ventes);
    const freq = frequence(results.ventes, results.clients);
    const ltver = ltv(moyenne, freq);
    const cacer = cac(ltver, results.marketing);
    await props.setLtv(ltver);
    await props.setCac(cacer);
    await props.setFrequence(freq);
    await props.setMoyenne(moyenne);
    return { moyen: moyenne, frequence: freq, ltv: ltver, cac: cacer };
  };

  const handleChange = (e) => {
    let newState = {
      ...formValue,
      [e.currentTarget.id]: e.currentTarget.value,
    };
    setFormValue(newState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await computeStuff();
    const valider = await addContact({
      ...formValue,
      ...results,
      ...data,
    });
    if (valider.status == "200") {
      setIsValid(true);
    }
  };

  const handleSkip = async (e) => {
    e.preventDefault();
    computeStuff();
    setIsValid(true);
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
                id="company"
                value={formValue.company}
                onChange={handleChange}
                label="Entreprise"
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
            <Button variant={"outlined"} onClick={handleSubmit}>
              Je veux mes résultats!
            </Button>
            {/*    <Button variant={"outlined"} onClick={handleSkip}>
              Skipper
            </Button> */}
          </form>
        </CardContent>
      </Card>
    </Container>
  );
}
