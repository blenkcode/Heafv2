"use client";
import { useState } from "react";
import { LineChart } from "../Components/Charts";
import { getSession } from "next-auth/react";
import { jwtDecode } from "jwt-decode";
import { calculateTDEE, calculateBMR } from "../../../lib/Algos";
interface ProfileMainProps {
  profileData: {
    name: string;
    TDEE: number;
    BMR: number;
    height: number;
    objectif: number;
    caloriesDeficit: number;
    activityLevel: number;
    gender: string;
    age: number;
    weights: WeightEntry[];
    weight: number;
  };
  onWeightUpdate: () => void;
}

interface WeightEntry {
  weight: number;
  date: string;
}
interface DecodedToken {
  userId: string;
}
const ProfileChart: React.FC<ProfileMainProps> = ({
  profileData,
  onWeightUpdate,
}) => {
  const chartdata = profileData.weights;
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
  };
  const updatedData = chartdata.map((item) => ({
    ...item,
    date: formatDate(item.date),
  }));

  const [weight, setWeight] = useState<number>();

  const handleWeightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWeight(event.target.valueAsNumber);
  };
  const minValue =
    profileData.weights[profileData.weights.length - 1].weight - 5;
  const maxValue =
    profileData.weights[profileData.weights.length - 1].weight + 5;
  const handleSubmit = async () => {
    const session = await getSession();
    const token = localStorage.getItem("token");

    let userId: string | undefined;

    if (!session?.user?.id) {
      if (token) {
        const decodedToken = jwtDecode<DecodedToken>(token);
        userId = decodedToken.userId; //
        console.log("userID:", userId);
      }
    } else {
      userId = session?.user?.id;
    }

    if (weight !== null && weight !== undefined) {
      const BMR = calculateBMR(
        weight,
        profileData.height,
        profileData.age,
        profileData.gender
      );
      const TDEE = calculateTDEE(BMR, profileData.activityLevel);
      const objectif = TDEE + profileData.caloriesDeficit;
      const currentDate = new Date().toISOString();
      const newWeightEntry = { weight: weight, date: currentDate };

      fetch(`https://heaf-back-end.vercel.app/users/newWeight/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newWeightEntry, TDEE, objectif, BMR }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.result) {
            onWeightUpdate();
          }
        });
    }
  };

  return (
    <div className="h-96 mt-5 lg:mt-0 bg-gray-300 border-2   border-gray-500 w-full flex flex-col justify-between rounded-xl pl-2 pr-5 pt-3">
      <LineChart
        className="h-3/4"
        data={updatedData}
        index="date"
        categories={["weight"]}
        valueFormatter={(number: number) =>
          `${Intl.NumberFormat("us").format(number).toString()}Kg`
        }
        // Définir la plage de l'axe Y avec minValue et maxValue
        minValue={minValue}
        maxValue={maxValue}
        onValueChange={(v) => console.log(v)}
      />
      <div className="flex space-x-5  py-7 px-5 h-1/4 rounded-xl">
        <input
          value={weight}
          onChange={handleWeightChange}
          type="number"
          placeholder="Nouvelle pesée"
          className="w-44 2xl:h-8 lg:h-10 h-10 rounded-xl flex items-center px-3 border-2 bg-zinc-200 border-solid placeholder-black placeholder-opacity-45 border-sky-900"
        ></input>
        <div
          onClick={handleSubmit}
          className="bg-sky-900 text-sm h-8 flex items-center border-zinc-200 rounded-xl py-1 px-3 text-white hover:text-sky-900 cursor-pointer hover:bg-zinc-200 border-2 border-solid hover:border-sky-900 transition-all"
        >
          Valider
        </div>
      </div>
    </div>
  );
};

export default ProfileChart;
