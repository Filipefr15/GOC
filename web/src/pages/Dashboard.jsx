import React from "react";
import { Typography } from "@mui/material";

import { Graphic } from "../components/Graphic";
import { Cards } from "../components/Cards";

export function Dashboard() {

  return (
    <div>
      <Typography variant="h4">DASHBOARD</Typography>
      <Typography variant="subtitle1">Bem-vindo ao seu Dashboard</Typography>
      
      <Cards />
      <Graphic />
      
    </div>
  );
}