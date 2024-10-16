"use client";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDna } from "@fortawesome/free-solid-svg-icons";

import { useState, useEffect } from "react";
import { calculateMacros } from "../../../lib/Algos";

import { BarChartOnValueChangeExample } from "../Components/BarMacro";
interface ProfileMainProps {
  profileData: {
    name: string;
    TDEE: number;
    BMR: number;
    objectif: number;
    caloriesDeficit: number;
    weights: WeightEntry[];
    weight: number;
  };
}
interface WeightEntry {
  weight: number;
  date: string; // Utilisation du format ISO pour la date
}
const Profilemacros: React.FC<ProfileMainProps> = ({ profileData }) => {
  const [macros, setMacros] = useState({
    proteine: 0,
    lipide: 0,
    glucide: 0,
  });
  const chartdata = [
    {
      name: "Protéines",
      amount: macros.proteine,
      color: "0C4A6E",
    },
    {
      name: "Glucides",
      amount: macros.glucide,
      color: "#FF0000",
    },
    {
      name: "Lipides",
      amount: macros.lipide,
      color: "#FF0000",
    },
  ];
  useEffect(() => {
    const fetchMacros = async () => {
      const weight = profileData.weights[profileData.weights.length - 1].weight;
      const objectif = profileData.objectif;
      console.log(objectif);
      // Appel à la fonction calculateMacros
      const result = await calculateMacros(weight, objectif);
      setMacros(result);
    };

    fetchMacros();
  }, [profileData.weights.length]);

  return (
    <div className="text-slate-200 min-w-full w-full h-  bg-sky-900 relative  px-5 rounded-xl py-5 h-full">
      <div className="flex-col flex ">
        <div className="flex lg:flex-row flex-col  justify-evenly">
          <div className="lg:w-1/3 w-full   h-full ">
            <div className="text-2xl mb-5 opacity-0  ">Macro-</div>
            <div className="text-2xl mb-5 absolute top-5  ">
              Macro-Nutriments
            </div>
            <div className="flex flex-col justify-between space-y-3">
              <span className="border-slate-300 border-2 border-opacity-80 rounded-xl flex justify-center  bg-zinc-200 text-black w-full  transition-colors  flex-col items-start py-2 pl-4  cursor-pointer overflow-hidden relative">
                {" "}
                <div className="w-44 h-44 shadow-2xl bg-blue-300 rounded-full absolute 2xl:-left-10 lg:-left-16 border-2 border-solid border-black border-opacity-20 -left-10 z-10"></div>
                <div className="flex justify-between w-full pr-2 z-20">
                  Protéines <FontAwesomeIcon className="p-1 w-5" icon={faDna} />
                </div>{" "}
                <span className="text-3xl mt-2 z-20">
                  {" "}
                  {macros.proteine} <span className="text-2xl">g</span>{" "}
                </span>
              </span>
              <span className="border-slate-300 border-2 border-opacity-80 rounded-xl flex justify-center  w-full  flex-col  bg-zinc-200 text-black transition-colors  items-start py-2 pl-4  cursor-pointer relative overflow-hidden">
                {" "}
                <div className="w-44 h-44 shadow-2xl bg-emerald-300 rounded-full absolute 2xl:-left-10 -left-10 lg:-left-16 border-2 border-solid border-black border-opacity-20 z-10"></div>
                <div className="flex justify-between w-full pr-2 z-20">
                  Glucides <FontAwesomeIcon className="p-1 w-5" icon={faDna} />
                </div>{" "}
                <span className="text-3xl mt-2 z-20">
                  {" "}
                  {macros.glucide} <span className="text-2xl">g</span>{" "}
                </span>
              </span>
              <span className="border-slate-300 border-2 border-opacity-80 rounded-xl flex justify-center w-full   flex-col  bg-zinc-200 text-black relative overflow-hidden transition-colors  items-start py-2 pl-4  cursor-pointer">
                {" "}
                <div className="w-44 h-44 shadow-2xl border-2 border-solid border-black border-opacity-20 bg-amber-200 rounded-full absolute 2xl:-left-10 lg:-left-16 -left-10 z-10"></div>
                <div className="flex justify-between w-full pr-2 z-20">
                  Lipides
                  <FontAwesomeIcon className="p-1 w-5" icon={faDna} />
                </div>{" "}
                <span className="text-3xl mt-2 z-20">
                  {" "}
                  {macros.lipide} <span className="text-2xl ">g</span>{" "}
                </span>
              </span>
            </div>{" "}
          </div>

          <div className="lg:w-2/3 flex lg:h-85 h-56  lg:mt-0 mt-5  items-center flex-col justify-center relative">
            <div className="h-full w-full  flex-col  flex items-center justify-center ">
              <BarChartOnValueChangeExample chartdata={chartdata} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profilemacros;
