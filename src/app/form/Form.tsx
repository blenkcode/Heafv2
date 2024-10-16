"use client";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMars, faVenus } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { getSession } from "next-auth/react";
import { jwtDecode } from "jwt-decode";
import {
  calculateTDEE,
  calculateBMR,
  calculateMacros,
} from "../../../lib/Algos";
interface DecodedToken {
  userId: string; // Spécifie que ton token a un champ userId
  // Ajoute d'autres champs si nécessaire
}
const Form = () => {
  const router = useRouter();
  const [age, setAge] = useState<number>();
  const [weight, setWeight] = useState<number>();
  const [height, setHeight] = useState<number>();
  const [gender, setGender] = useState<string>();
  const [activityLevel, setActivityLevel] = useState(1.2);
  const [caloriesDeficit, setCaloriesDeficit] = useState(-500);
  const [weightObj, setWeightObj] = useState<number>();
  const [errorDeficit, setErrorDeficit] = useState<string>("");
  const [errorPDM, setErrorPDM] = useState<string>("");
  const [errors, setErrors] = useState<string>("");
  const handleAgeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAge(event.target.valueAsNumber);
  };

  const handleWeightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWeight(event.target.valueAsNumber);
  };

  const handleHeightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHeight(event.target.valueAsNumber);
  };

  const handleGenderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGender(event.target.value);
  };

  const handleWeightObj = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWeightObj(event.target.valueAsNumber);
  };

  const handleActivityLevelChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setActivityLevel(parseFloat(event.target.value));
  };

  const handleObjectifChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setCaloriesDeficit(parseFloat(event.target.value));
  };
  const token = localStorage.getItem("token");
  console.log("token", token);
  const handleSubmit = async () => {
    if (
      weight !== null &&
      weight !== undefined &&
      height !== undefined &&
      height !== null &&
      age !== null &&
      age !== undefined &&
      gender !== undefined &&
      gender !== null &&
      weightObj !== undefined &&
      weightObj !== null
    ) {
      if (weightObj > weight && caloriesDeficit === -500) {
        setErrorDeficit(
          "En perte de poids votre poids visé ne peut pas être supérieur à votre poids actuel"
        );
        setErrorPDM("");
        setErrors("");
      } else if (weightObj < weight && caloriesDeficit === 500) {
        setErrorPDM(
          "En prise de masse votre poids visé ne peut pas être inférieur à votre poids actuel"
        );
        setErrorDeficit("");
        setErrors("");
      } else {
        const session = await getSession();
        const token = localStorage.getItem("token");
        console.log(token);

        const BMR = calculateBMR(weight, height, age, gender);
        const TDEE = calculateTDEE(BMR, activityLevel);
        const objectif = TDEE + caloriesDeficit;
        const currentDate = new Date().toISOString(); // Utiliser le format ISO pour une date uniforme
        const newWeightEntry = { weight: weight, date: currentDate };

        let userId: string | undefined; // Déclare la variable userId en dehors du bloc

        if (!session?.user?.id) {
          if (token) {
            const decodedToken = jwtDecode<DecodedToken>(token); /// Assure-toi que 'token' existe ici
            userId = decodedToken.userId; //
            console.log(userId);
          }
        } else {
          userId = session?.user?.id; // Assigne la valeur de la session à userId
        }
        fetch(`https://heaf-back-end.vercel.app/users/initData/${userId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            age,
            objectif,
            weightObj,
            weights: [newWeightEntry], // Envoyer comme un tableau d'objets
            height,
            gender,
            activityLevel,
            caloriesDeficit,
            BMR,
            TDEE,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.result) {
              router.push("/dashboard");
            }
          });
      }
    } else {
      setErrorDeficit("");
      setErrorPDM("");
      setErrors("Veuillez renseigner tout les champs ");
    }
  };
  return (
    <div className="flex flex-col mt-10 lg:mt-0    z-50 relative 2xl:scale-100 xl:scale-90 lg:scale-75 items-center lg:space-y-12 space-y-8 pb-10 lg:pb-0 ">
      <h2 className=" lg:text-sky-900 text-white  bg-opacity-50  py-2 px-5 rounded-full lg:text-2xl text-lg font-bold w-fit">
        Formulaire d'inscription
      </h2>
      <div className="flex lg:space-x-20 lg:flex-row flex-col lg:space-y-0 space-y-8 ">
        {" "}
        <div className=" lg:w-fit h-auto flex flex-col  justify-center  items-center   ">
          <div className="lg:w-56 w-full flex flex-col space-y-5 lg:space-y-8 ">
            <div className=" flex flex-row justify-between items-center   ">
              <span className="lg:text-xl text-base text-white lg:text-sky-900 ">
                Âge{" "}
              </span>
              <input
                value={age}
                min={1}
                onChange={handleAgeChange}
                className="w-20 h-10 rounded-xl flex items-center px-3 border-2 bg-transparent border-solid  placeholder-black text-white lg:text-sky-900 placeholder-opacity-45 lg:border-sky-900 border-white "
                type="number"
              />
            </div>
            <div className=" flex justify-between items-center text-white lg:text-sky-900 ">
              <span className="lg:text-xl text-base ">Poids (Kgs)</span>
              <input
                min={1}
                value={weight}
                onChange={handleWeightChange}
                className="w-20 h-10 rounded-xl text-white lg:text-sky-900  flex items-center px-3 border-2 bg-transparent border-solid  placeholder-black placeholder-opacity-45 lg:border-sky-900 border-white "
                type="number"
              />
            </div>

            <div className=" flex justify-between items-center text-white lg:text-sky-900   ">
              <span className="lg:text-xl text-base mr-5">Taille (cm)</span>
              <input
                min={1}
                value={height}
                onChange={handleHeightChange}
                className="w-20 h-10 rounded-xl text-white lg:text-sky-900  flex items-center px-3 border-2 bg-transparent border-solid  placeholder-black placeholder-opacity-45 lg:border-sky-900 border-white"
                type="number"
              />
            </div>
            <div className=" flex justify-between items-center lg:mb-3 mb-6 text-white lg:text-sky-900  ">
              <span className="lg:text-xl text-base ">Sexe </span>
              <div className="flex items-center justify-center mt-1">
                <div className=" ">
                  <input
                    className=""
                    type="radio"
                    name="gender"
                    value="female"
                    checked={gender === "female"}
                    onChange={handleGenderChange}
                  />
                  <FontAwesomeIcon className="w-5 h-5 ml-2" icon={faVenus} />
                </div>
                <div className="ml-6">
                  <input
                    className=" "
                    type="radio"
                    name="gender"
                    value="male"
                    checked={gender === "male"}
                    onChange={handleGenderChange}
                  />
                  <FontAwesomeIcon className="w-5 h-5 ml-2" icon={faMars} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row w-fit   ">
          {" "}
          <div className=" flex flex-col  items-start lg:space-y-8 space-y-5 justify-start  lg:space-x-0 w-full z-50  rounded-xl">
            {" "}
            <div className="flex items-center space-x-10 w-full justify-between   ">
              <span className="lg:text-xl text-md text-white lg:text-sky-900">
                Niveau d'activité{" "}
              </span>
              <select
                className="form-select  rounded-xl py-2 px-4 lg:w-36 w-32"
                name="activity"
                value={activityLevel}
                onChange={handleActivityLevelChange}
              >
                <option value="1.2">Sédentaire</option>
                <option value="1.4">Modérément actif</option>
                <option value="1.6">Actif</option>
                <option value="1.8">Extrêmement actif</option>
              </select>
            </div>
            <div className="flex items-center space-x-5 w-full  justify-between">
              <span className="lg:text-xl text-md text-white lg:text-sky-900">
                Objectif{" "}
              </span>
              <select
                className="form-select rounded-xl py-2 px-4 lg:w-36 w-32"
                name="caloriesDeficit"
                value={caloriesDeficit}
                onChange={handleObjectifChange}
              >
                <option value="-500">Perte de poids</option>
                <option value="500">Prise de masse</option>
                <option value="0">Maintien</option>
              </select>
            </div>
            <div className="flex items-center space-x-5 w-full  justify-between">
              <span className="lg:text-xl text-md  text-white lg:text-sky-900">
                Poids visé{" "}
              </span>{" "}
              <input
                value={weightObj}
                onChange={handleWeightObj}
                className="w-20 h-10 rounded-xl flex text-white lg:text-sky-900  items-center px-3 border-2 bg-transparent border-solid  placeholder-black placeholder-opacity-45 lg:border-sky-900 border-white "
                type="number"
              />
            </div>
          </div>
        </div>
      </div>
      <div
        onClick={handleSubmit}
        className="w-56 h-12 rounded-full cursor-pointer flex items-center justify-center px-3 border-2 lg:bg-sky-800 bg-zinc-200 lg:text-white text-sky-900 border-solid  placeholder-black placeholder-opacity-45 border-sky-900 transition-all hover:bg-transparent hover:text-sky-900 font-bold  "
      >
        Je valide mes données
      </div>
      {errorDeficit && (
        <p className="text-red-500 absolute  -bottom-20 w-56  2xl:text-base lg:text-sm">
          {errorDeficit}
        </p>
      )}
      {errorPDM && (
        <p className="text-red-500 absolute  -bottom-20 w-56  2xl:text-base lg:text-sm">
          {errorPDM}
        </p>
      )}
      {errors && (
        <p className="text-red-500 absolute  -bottom-20 w-56  2xl:text-base lg:text-sm">
          {errors}
        </p>
      )}
    </div>
  );
};

export default Form;
