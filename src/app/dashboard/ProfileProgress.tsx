"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBullseye,
  faWeightScale,
  faFire,
  faArrowDown,
  faArrowUp,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { ProgressCircle } from "../Components/Progress";
interface ProfileMainProps {
  profileData: {
    name: string;
    TDEE: number;
    BMR: number;
    weightObj: number;
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
const ProfileProgress: React.FC<ProfileMainProps> = ({ profileData }) => {
  const [progression, setProgression] = useState<number>();

  useEffect(() => {
    const poidsActuel =
      profileData.weights[profileData.weights.length - 1].weight;
    const poidsVise = profileData.weightObj; // Poids visé
    const poidsDepart = profileData.weights[0].weight; // Poids de départ

    if (poidsDepart !== poidsVise) {
      const progression =
        ((poidsDepart - poidsActuel) / (poidsDepart - poidsVise)) * 100;
      setProgression(Math.round(progression));
    } else {
      console.error(
        "Poids de départ et poids visé ne peuvent pas être identiques."
      );
      setProgression(0); // Si les poids sont égaux, pas de progression possible
    }
  }, [profileData.weights.length]);
  return (
    <div className="text-slate-200 min-w-full flex  flex-col justify-between  items-center w-full shadow-xl bg-sky-900  px-5 rounded-xl py-5  h-full lg:bg-opacity-90 mt-5 lg:mt-0  ">
      {" "}
      <div className="h-full w-full items-center justify-center flex">
        {" "}
        <ProgressCircle variant="default" value={progression} radius={80}>
          <span className="text-xl font-medium text-gray-900 dark:text-gray-50">
            {progression}%
          </span>
        </ProgressCircle>
      </div>
      <div className="w-full h-2 bg-red"></div>
      <span className="border-slate-300 bg-zinc-200 border-2 border-opacity-80 rounded-xl flex justify-center  hover:bg-customBlue2 transition-colors  w-full h-fit  mt-8 flex-col items-start py-5 pl-4 lg:mb-0 mb-5 overflow-hidden relative">
        <div className="flex justify-between text-sky-900 2xl:text-base lg:text-base z-20 w-full pr-2 ">
          Poids cible{" "}
          <FontAwesomeIcon
            className="p-1 w-5 h-5 z-20 text-sky-900"
            icon={faBullseye}
          />
        </div>{" "}
        <div className="flex items-center justify-between text-sky-900 text-base z-20 w-full pr-2 ">
          <span className="2xl:text-3xl lg:text-2xl mt-2 text-sky-900 z-20">
            {" "}
            {profileData.weightObj}
            <span className="2xl:text-2xl lg:text-xl">Kg</span>{" "}
          </span>
        </div>
      </span>
    </div>
  );
};

export default ProfileProgress;
