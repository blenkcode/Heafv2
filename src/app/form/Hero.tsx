"use client";
import React from "react";
import Dots from "../Components/Dots";
import { useSession } from "next-auth/react";
import { jwtDecode } from "jwt-decode";
interface DecodedToken {
  userId: string;
  name: string; // Spécifie que ton token a un champ userId
  // Ajoute d'autres champs si nécessaire
}
const Hero = () => {
  const token = localStorage.getItem("token");
  const decodedToken: DecodedToken | null = token
    ? jwtDecode<DecodedToken>(token)
    : null; /// Assure-toi que 'token' existe ici
  const username = decodedToken ? decodedToken.name : null;
  const { status, data: session } = useSession();
  console.log(token);
  return (
    <div className="space-y-10 flex flex-col z-40 relative 2xl:scale-100 xl:scale-90 lg:scale-75 scale-100 pb-10 lg:pb-0 ">
      <Dots></Dots>
      <div className="lg:w-72 lg:h-72 w-64 h-64  bg-gradient-to-br from-sky-900 to-transparent rounded-full absolute -top-24 -left-24 z-10"></div>
      <div className="space-y-10 flex flex-col z-30 ">
        <h1 className="lg:text-5xl text-3xl text-white flex lg:flex-row flex-col font-bold">
          Bonjour{" "}
          {status === "authenticated" ? (
            <div className="xl:ml-4 lg:ml-2 ml-0 lg:min-w-96">
              {session.user!.name}
            </div>
          ) : status === "unauthenticated" ? (
            <div className="xl:ml-4 lg:ml-2 ml-0 lg:min-w-96">{username}</div>
          ) : null}
        </h1>
        <p className="text-white xl:text-2xl lg:text-xl w-2/3">
          Ces Information nous permettent de définir ton profil Heaf{" "}
        </p>
      </div>
    </div>
  );
};

export default Hero;
