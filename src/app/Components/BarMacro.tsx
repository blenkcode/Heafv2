"use client";

import React from "react";

import { BarChart, type BarChartEventProps } from "./Donuts";

// const chartdata = [
//   {
//     name: "Amphibians",
//     "Number of threatened species": 2488,
//   },
//   {
//     name: "Birds",
//     "Number of threatened species": 1445,
//   },
//   {
//     name: "Crustaceans",
//     "Number of threatened species": 743,
//   },
//   {
//     name: "Ferns",
//     "Number of threatened species": 281,
//   },
//   {
//     name: "Arachnids",
//     "Number of threatened species": 251,
//   },
//   {
//     name: "Corals",
//     "Number of threatened species": 232,
//   },
//   {
//     name: "Algae",
//     "Number of threatened species": 98,
//   },
// ];
interface ChartData {
  name: string; // Le nom du nutriment, par exemple "Protéines"
  amount: number; // La quantité de ce nutriment
  color: string; // Le code couleur sous forme de chaîne hexadécimale
}

interface BarChartOnValueChangeExampleProps {
  chartdata: ChartData[]; // ChartData est un tableau
}

export const BarChartOnValueChangeExample: React.FC<
  BarChartOnValueChangeExampleProps
> = ({ chartdata }) => {
  const [value, setValue] = React.useState<BarChartEventProps>(null);

  return (
    <>
      <BarChart
        className="h-full"
        data={chartdata}
        index="name"
        categories={["amount"]}
        yAxisWidth={45}
        onValueChange={(v) => setValue(v)}
      />
    </>
  );
};
