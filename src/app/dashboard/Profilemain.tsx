"use client";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBullseye,
  faWeightScale,
  faFire,
  faArrowDown,
  faArrowUp,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { object } from "zod";
import { ProgressCircle } from "../Components/Progress";
interface ProfileMainProps {
  profileData: {
    name: string;
    TDEE: number;
    BMR: number;
    objectif: number;
    weightObj: number;
    caloriesDeficit: number;
    weights: WeightEntry[];
    weight: number;
  };
  // Nouvelle prop pour rafraîchir les données
}
interface WeightEntry {
  weight: number;
  date: string; // Utilisation du format ISO pour la date
}
const Profilemain: React.FC<ProfileMainProps> = ({ profileData }) => {
  console.log(profileData);
  const [evolution, setEvolution] = useState<number>();

  const [positive, setPositive] = useState<string>("+");
  useEffect(() => {
    if (profileData.weights.length > 1) {
      const percentage =
        (Math.abs(
          profileData.weights[0].weight -
            profileData.weights[profileData.weights.length - 1].weight
        ) /
          profileData.weights[0].weight) *
        100;

      setEvolution(Math.round(percentage));

      if (
        profileData.weights[profileData.weights.length - 1].weight <
        profileData.weights[0].weight
      ) {
        setPositive("-");
      } else if (
        profileData.weights[profileData.weights.length - 1].weight >
        profileData.weights[0].weight
      ) {
        setPositive("+");
      }
    } else {
      setEvolution(0);
    }
  }, [profileData.weights.length]);
  return (
    <div className="bg-sky-900 shadow-xl mt-5 lg:mt-0 flex items-center w-full text-slate-200 px-5 h-full relative rounded-xl">
      <div className="w-full flex items-center justify-center">
        <div className=" flex w-full lg:flex-row flex-col items-center justify-center py-10 lg:py-0">
          <span className="border-slate-300  border-2 border-opacity-80 rounded-xl flex justify-center  hover:bg-customBlue2 transition-colors  w-full lg:h-full h-24  lg:mr-8 flex-col items-start py-2 pl-4 lg:mb-0 mb-5 overflow-hidden relative">
            <div className="2xl:w-56 2xl:-left-10 w-48 h-48 -left-12 lg:-left-20 2xl:h-56 absolute rounded-full bg-zinc-200 z-10 shadow-2xl "></div>
            <div className="flex justify-between text-sky-900 2xl:text-lg lg:text-base z-20 w-full pr-2 ">
              Poids{" "}
              <FontAwesomeIcon
                className="p-1 w-5 h-5 max-w-5 min-h-5 z-20 text-white"
                icon={faWeightScale}
              />
            </div>{" "}
            <div className="flex items-center justify-between text-sky-900 text-base z-20 w-full pr-2 ">
              <span className="2xl:text-3xl text-2xl mt-2 text-sky-900 z-20">
                {" "}
                {
                  profileData.weights[profileData.weights.length - 1].weight
                }{" "}
                <span className="2xl:text-2xl lg:text-xl">Kg</span>{" "}
              </span>
              <div className="text-white flex 2xl:text-base lg:text-sm items-center justify-center">
                {" "}
                <div>
                  {positive}
                  {evolution}%
                </div>
                <FontAwesomeIcon
                  className={`p-1 w-5 h-5 z-20 text-lg ${
                    positive! === "-" ? "text-green-500" : "text-red-500"
                  } `}
                  icon={positive! === "-" ? faArrowDown : faArrowUp}
                />
              </div>
            </div>
          </span>
          <span className="border-slate-300  border-2 border-opacity-80 rounded-xl flex justify-center  hover:bg-customBlue2 transition-colors  w-full lg:h-full h-24  lg:mr-8 flex-col items-start py-2 pl-4 lg:mb-0 mb-5 overflow-hidden relative">
            <div className="2xl:w-56 2xl:-left-10 -left-12 w-48 h-48 lg:-left-14 2xl:h-56 shadow-2xl absolute rounded-full bg-zinc-200 z-10"></div>
            <div className="flex justify-between text-sky-900 2xl:text-lg lg:text-base z-20 w-full pr-2 ">
              Objectif{" "}
              <FontAwesomeIcon
                className="p-1 w-5 h-5 max-w-5 min-h-5 z-20 text-white"
                icon={faBullseye}
              />
            </div>{" "}
            <div className="flex items-center justify-between text-sky-900 text-base z-20 w-full pr-2 ">
              <span className="2xl:text-3xl text-2xl mt-2 text-sky-900 z-20">
                {" "}
                {profileData.objectif}
                <span className="2xl:text-2xl lg:text-xl"> Kcal</span>{" "}
              </span>
            </div>
          </span>
          <span className="border-slate-300  border-2 border-opacity-80 rounded-xl flex justify-center  hover:bg-customBlue2 transition-colors  w-full lg:h-full h-24  lg:mr-8 flex-col items-start py-2 pl-4 lg:mb-0 mb-5 overflow-hidden relative">
            <div className="2xl:w-56 2xl:-left-10 w-48 h-48 -left-12 lg:-left-14 2xl:h-56  shadow-2xl absolute rounded-full bg-zinc-200 z-10"></div>
            <div className="flex justify-between text-sky-900 2xl:text-lg lg:text-base z-20 w-full pr-2 ">
              BMR{" "}
              <FontAwesomeIcon
                className="p-1 w-5 h-5 max-w-5 min-h-5 z-20 text-white"
                icon={faWeightScale}
              />
            </div>{" "}
            <div className="flex items-center justify-between text-sky-900 text-base z-20 w-full pr-2 ">
              <span className="2xl:text-3xl text-2xl mt-2 text-sky-900 z-20">
                {" "}
                {profileData.BMR}{" "}
                <span className="2xl:text-2xl lg:text-xl">Kcal</span>{" "}
              </span>
            </div>
          </span>
          <span className="border-slate-300  border-2 border-opacity-80 rounded-xl flex justify-center  hover:bg-customBlue2 transition-colors  w-full lg:h-full h-24  lg:mr-8 flex-col items-start py-2 pl-4 lg:mb-0 mb-0 overflow-hidden relative">
            <div className="2xl:w-56 2xl:-left-10 w-48 h-48 -left-12 lg:-left-14 2xl:h-56 absolute  shadow-2xl rounded-full bg-zinc-200 z-10"></div>
            <div className="flex justify-between text-sky-900 2xl:text-lg lg:text-base z-20 w-full pr-2 ">
              TDEE{" "}
              <FontAwesomeIcon
                className="p-1 w-5 h-5 z-20 text-white"
                icon={faFire}
              />
            </div>{" "}
            <div className="flex items-center justify-between text-sky-900 text-base z-20 w-full pr-2 ">
              <span className="2xl:text-3xl text-2xl mt-2 text-sky-900 z-20">
                {" "}
                {profileData.TDEE}
                <span className="2xl:text-2xl lg:text-xl">Kcal</span>{" "}
              </span>
            </div>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Profilemain;
