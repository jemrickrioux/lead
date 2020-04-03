const stepsLtv = {
  steps: [
    {
      title: "Nombre de Clients (en 12 mois)",
      id: "clients",
      fields: [
        { label: "Nombre de clients (12 mois)", type: "clients", value: 0 }
      ],
      values: { clients: 0 },
      answerTemplate: "Vos clients valent: "
    },
    {
      title: "Nombre de ventes (en 12 mois)",
      id: "ventes",
      fields: [{ label: "Ventes", type: "ventes", value: 0 }],
      values: { ventes: 0 },
      answerTemplate: "Vos clients valent: "
    },
    {
      title: "Revenus (12 mois)",
      id: "revenus",
      fields: [{ label: "Revenus (12 mois)", type: "revenus", value: 0 }],
      values: { revenus: 0 },
      answerTemplate: "Vos clients valent: "
    },
    {
      title: "Pourcentage des revenus investis en marketing",
      id: "marketing",
      fields: [{ label: "% marketing", type: "marketing", value: 0 }],
      values: { marketing: 0 },
      answerTemplate: "Pour un client vous pouvez payer: "
    }
  ],
  text: {
    results: {
      title: "Votre valeur à vie client",
      subheader: "Ce que vos client valent réelement",
      content: "Voici le résultat"
    }
  }
};

const makeConfigsGetter = configurations => () => {
  const { steps, text } = configurations;
  let baseState = {};
  let results = {};
  configurations.steps.forEach(step => {
    results[step.id] = "";
    baseState[step.id] = {
      values: step.values
    };
  });
  baseState = { ...baseState, results, steps, text };
  return baseState;
};

const getConfigurations = makeConfigsGetter(stepsLtv);

export default getConfigurations;

const stepsComplet = [
  {
    title: "Lifetime Customer Value",
    id: "ltv",
    fields: [
      { label: "Fréquence achat", type: "frequence" },
      { label: "Achat moyen", type: "contrat" }
    ],
    values: {
      ltv: 0,
      contrat: 0,
      frequence: 0
    },
    answerTemplate: "Vos clients valent: "
  },
  {
    title: "Coût aquisition client",
    id: "cac",
    fields: [{ label: "% marketing", type: "marketing" }],
    values: {
      ltv: 0,
      cac: 0,
      marketing: 0
    },
    answerTemplate: "Pour un client vous pouvez payer: "
  },
  {
    title: "Coût par demande d'estimation",
    id: "pac",
    fields: [{ label: "% Rdv en client", type: "closing" }],
    values: {
      closing: 0,
      cac: 0,
      pac: 0
    },
    answerTemplate: "Pour un rendez-vous vous pouvez payer: "
  },
  {
    type: "multiply",
    title: "Coût par lead",
    id: "cpa",
    fields: [{ label: "% Lead en rdv", type: "closing" }],
    values: {
      closing: 0,
      cac: 0,
      cpa: 0
    },
    answerTemplate: "Pour un lead vous pouvez payer: "
  },
  {
    type: "multiply",
    title: "Coût par page vue",
    id: "lpv",
    fields: [{ label: "% conversion landing", type: "conversion" }],
    values: {
      conversion: 0,
      cpa: 0,
      lpv: 0
    },
    answerTemplate: "Pour une page vue vous pouvez payer: "
  }
];
