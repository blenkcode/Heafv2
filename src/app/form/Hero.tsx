"use client";
import { useEffect, useState } from "react";
import React from "react";
import Dots from "../Components/Dots";
import { useSession } from "next-auth/react";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  userId: string;
  name: string;
}

const Hero = () => {
  const [token, setToken] = useState<string | null>(null);
  const [usernameFromToken, setUsernameFromToken] = useState<string | null>(
    null
  );
  const { status, data: session } = useSession();
  console.log(token);
  // Utiliser useEffect pour accéder à localStorage uniquement côté client
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
        try {
          const decodedToken = jwtDecode<DecodedToken>(storedToken);
          setUsernameFromToken(decodedToken.name); // Extraire le nom d'utilisateur du token
        } catch (error) {
          console.error("Erreur de décodage du token :", error);
        }
      }
    }
  }, []);

  return (
    <div className="space-y-10 flex flex-col z-40 relative 2xl:scale-100 xl:scale-90 lg:scale-75 scale-100 pb-10 lg:pb-0 ">
      <Dots />
      <div className="lg:w-72 lg:h-72 w-64 h-64 bg-gradient-to-br from-sky-900 to-transparent rounded-full absolute -top-24 -left-24 z-10"></div>
      <div className="space-y-10 flex flex-col z-30">
        <h1 className="lg:text-5xl text-3xl text-white flex lg:flex-row flex-col font-bold">
          Bonjour{" "}
          {status === "authenticated" ? (
            <div className="xl:ml-4 lg:ml-2 ml-0 lg:min-w-96">
              {session?.user?.name}
            </div>
          ) : status === "unauthenticated" && usernameFromToken ? (
            <div className="xl:ml-4 lg:ml-2 ml-0 lg:min-w-96">
              {usernameFromToken}
            </div>
          ) : (
            <div className="xl:ml-4 lg:ml-2 ml-0 lg:min-w-96">Invité</div>
          )}
        </h1>
        <p className="text-white xl:text-2xl lg:text-xl w-2/3">
          Ces informations nous permettent de définir ton profil Heaf.
        </p>
      </div>
    </div>
  );
};

export default Hero;
