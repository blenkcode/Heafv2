"use client";
import { useEffect, useState } from "react";
import Profilemain from "./Profilemain";
import ProfileChart from "./ProfileChart";
import Profilemacros from "./Profilemacros";
import { getSession } from "next-auth/react";
import ProfileProgress from "./ProfileProgress";
import Link from "next/link";
import Circle from "../Components/Circle";
import Circle2 from "../Components/Circle2";
import Circle3 from "../Components/Circle3";
import ProfilePicture from "../Components/ProfilePicture";
import Skeleton from "../Components/Skeleton";
import { jwtDecode } from "jwt-decode";
interface profileData {
  name: string;
  TDEE: number;
  BMR: number;
  height: number;
  objectif: number;
  caloriesDeficit: number;
  activityLevel: number;
  gender: string;
  weightObj: number;
  age: number;
  weights: WeightEntry[];
  weight: number;
}

interface WeightEntry {
  weight: number;
  date: string;
}
interface DecodedToken {
  userId: string; // Spécifie que ton token a un champ userId
  // Ajoute d'autres champs si nécessaire
}
export default function Page() {
  const [profileData, setProfileData] = useState<profileData | null>(null);

  const fetchProfileData = async () => {
    const token = localStorage.getItem("token");
    const session = await getSession();

    let userId: string | undefined; // Déclare la variable userId en dehors du bloc

    if (!session?.user?.id) {
      if (token) {
        const decodedToken = jwtDecode<DecodedToken>(token); /// Assure-toi que 'token' existe ici
        userId = decodedToken.userId; //
        console.log("userID:", userId);
      }
    } else {
      userId = session?.user?.id; // Assigne la valeur de la session à userId
    }
    const profileRes = await fetch(
      `https://heaf-back-end.vercel.app/users/${userId}`
    );
    const data = await profileRes.json();
    setProfileData(data.data); // Met à jour les données du profil
  };

  // Appeler fetchProfileData au chargement de la page
  useEffect(() => {
    fetchProfileData();
  }, []);

  if (!profileData) {
    return (
      <main className="lg:h-lvh w-full font-Satoshi text-base flex items-center justify-center bg-zinc-100 text-sky-800 lg:overflow-hidden overflow-x-hidden relative px-2 lg:px-0 py-5 lg:py-0">
        <div className="absolute top-1/2 lg:visible invisible">
          <div className="relative">
            <Circle2 />
          </div>
        </div>

        <div className="flex flex-col w-full xl:px-20 h-full items-start justify-center space-y-5 z-20 2xl:scale-100 xl:scale-90 lg:scale-75">
          <div className="flex w-full items-center text-2xl justify-between">
            <div className="flex space-x-5 items-center">
              <Skeleton width="10px" height="10px" />{" "}
              {/* Profile picture skeleton */}
              <Skeleton width="150px" height="24px" /> {/* Name skeleton */}
            </div>
            <Skeleton width="120px" height="40px" /> {/* Button skeleton */}
          </div>
          <Skeleton width="100%" height="150px" />{" "}
          {/* Main profile section skeleton */}
          <div className="flex items-center justify-center lg:flex-row flex-col w-full lg:space-x-5 space-y-5 lg:space-y-0">
            <Skeleton width="100%" height="400px" /> {/* Macros skeleton */}
            <Skeleton width="100%" height="400px" /> {/* Progress skeleton */}
            <Skeleton width="100%" height="400px" /> {/* Chart skeleton */}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="lg:h-lvh w-full font-Satoshi text-base flex items-center justify-center bg-zinc-100   text-sky-800 lg:overflow-hidden overflow-x-hidden relative px-2 lg:px-0 py-5 lg:py-0">
      {/* <CircleDash /> */}
      <div className="absolute top-1/2 lg:visible invisible">
        {" "}
        <div className="relative">
          {" "}
          <Circle />
          <Circle2></Circle2>
        </div>
      </div>

      <div className="flex flex-col w-full  xl:px-20 h-full items-start justify-center space-y-5 z-20 2xl:scale-100 xl:scale-90 lg:scale-75">
        <div className="flex w-full items-center text-2xl justify-between">
          <div className="flex space-x-5 items-center">
            <ProfilePicture />
            <div className="lg:text-white">{profileData.name}</div>
          </div>
          <div className="flex space-x-5 ">
            {/* <div className="bg-sky-900 border-2 text-sm flex items-center border-sky-900 rounded-xl py-1 px-3 text-white hover:text-sky-900 cursor-pointer hover:bg-transparent transition-all">
              Redéfinir votre objectif
            </div> */}
            <Link
              href="/api/auth/signout?callbackUrl=/"
              className="bg-sky-900 border-2 text-sm flex items-center border-sky-900 rounded-xl py-1 px-3 text-white hover:text-sky-900 cursor-pointer hover:bg-transparent transition-all"
            >
              Logout
            </Link>
          </div>
        </div>

        <div className="w-full lg:h-32 items-center justify-center shadow-2xl rounded-xl ">
          <Profilemain profileData={profileData} />
        </div>
        <div className="flex items-center justify-center lg:flex-row flex-col w-full lg:space-x-5  ">
          <div className="lg:w-2/5 w-full flex items-center h-full justify-center  shadow-2xl rounded-xl">
            {/* Passez fetchProfileData à ProfileChart pour rafraîchir après la mise à jour */}
            <ProfileChart
              profileData={profileData}
              onWeightUpdate={fetchProfileData}
            />
          </div>
          <div className="lg:w-2/12 w-full shadow-2xl rounded-xl flex items-center h-full justify-center ">
            <ProfileProgress profileData={profileData} />
          </div>
          <div className="lg:w-5/12 w-full shadow-2xl rounded-xl">
            <Profilemacros profileData={profileData} />
          </div>
        </div>
      </div>
    </main>
  );
}
