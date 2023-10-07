import React from "react";
import { Typography } from "@mui/material";

import { Graphic } from "../components/Graphic";
import { Graphic2 } from "../components/Graphic2"
import { Cards } from "../components/Cards";
import { Cards2 } from "../components/Cards2";

export function Dashboard() {

  return (
    <div>
      <Typography variant="h4">DASHBOARD</Typography>
      <Typography variant="subtitle1">Bem-vindo ao seu Dashboard</Typography>


      <Cards />
      <Graphic />
      <Cards2 />
      <Graphic2 />

    </div>
  );
}