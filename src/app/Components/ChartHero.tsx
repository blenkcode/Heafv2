"use client";

import { LineChart } from "../Components/Charts";

const ChartHero = ({}) => {
  const updatedData = [
    {
      weight: 80,
      date: "20 Jan",
    },
    {
      weight: 79,
      date: "25 Jan",
    },
    {
      weight: 77,
      date: "14 Fev",
    },
    {
      weight: 75,
      date: "10 Mar",
    },
    {
      weight: 72,
      date: "23 Avr",
    },
  ];
  return (
    <div className="h-96 mt-5 shadow-2xl lg:mt-0 bg-gray-300 border-2 scale-90  border-gray-500 w-96 flex flex-col justify-between rounded-xl pl-2 pr-5 pt-3">
      <LineChart
        className="h-3/4"
        data={updatedData}
        index="date"
        categories={["weight"]}
        valueFormatter={(number: number) =>
          `${Intl.NumberFormat("us").format(number).toString()}Kg`
        }
        // Définir la plage de l'axe Y avec minValue et maxValue
        minValue={70}
        maxValue={80}
        onValueChange={(v) => console.log(v)}
      />
      <div className="flex space-x-5  py-7 px-5 h-1/4 rounded-xl">
        <input
          value={71}
          type="number"
          placeholder="Nouvelle pesée"
          className="w-44 2xl:h-8 lg:h-10 h-10 rounded-xl flex items-center px-3 border-2 bg-zinc-200 border-solid placeholder-black placeholder-opacity-45 border-sky-900"
        ></input>
        <div className="bg-sky-900 text-sm h-8 flex items-center border-zinc-200 rounded-xl py-1 px-3 text-white hover:text-sky-900 cursor-pointer hover:bg-zinc-200 border-2 border-solid hover:border-sky-900 transition-all">
          Valider
        </div>
      </div>
    </div>
  );
};

export default ChartHero;
