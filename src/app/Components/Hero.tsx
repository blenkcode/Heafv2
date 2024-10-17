"use client";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { useSession } from "next-auth/react";
import DotsMain from "./DotsMain";
const Hero = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  useEffect(() => {
    if (status === "authenticated") {
      console.log(session?.user?.isFirstLogin);
      // Vérifier si c'est la première connexion via la session
      if (session?.user?.isFirstLogin) {
        router.push("/form");
        // Rediriger vers le formulaire si c'est la première connexion
      } else {
        router.push("/dashboard");
        // Sinon, rediriger vers le tableau de bord
      }
    }
  }, [status, session, router]);

  return (
    <div className="lg:space-y-8 flex flex-col z-40 relative items-center  ">
      <DotsMain></DotsMain>
      <div className="lg:w-96 lg:h-96 w-56 h-56  bg-gradient-to-br from-sky-700 to-transparent rounded-full absolute -top-24 -left-24 z-10"></div>
      <div className="lg:space-y-7 space-y-7 flex flex-col  items-center z-30  ">
        <h1 className=" lg:text-8xl text-5xl text-white flex items-center justify-center z-10 lg:justify-start font-bold">
          Heaf{" "}
          <Link
            href="https://www.valentin-mor.com/"
            className="lg:px-5 lg:py-2 px-2 py-1  xl:px-6 xl:py-3 2xl:text-xl xl:text-lg lg:text-base text-sm text-white border-white  rounded-xl  border-2 cursor-pointer hover:bg-white bg-sky-900 xl:mt-5 lg:font-bold font-normal lg:mt-3 mt-2 hover:text-sky-900 transition-colors lg:ml-10 ml-8 z-50"
          >
            Contact
          </Link>
        </h1>

        <div className="flex flex-col 2xl:space-y-10 lg:space-y-8 space-y-5 font-thin">
          {" "}
          <span className="flex items-center  xl:text-xl lg:text-lg text-sm text-white">
            {" "}
            <FontAwesomeIcon
              icon={faArrowRight}
              style={{ width: "1.25rem", height: "1.25rem" }}
              className="lg:pr-5 pr-2 "
            />{" "}
            Calculez vos besoins nutritionnels
          </span>
          <span className="flex items-center  xl:text-xl lg:text-lg text-sm  text-white">
            <FontAwesomeIcon
              icon={faArrowRight}
              style={{ width: "1.25rem", height: "1.25rem" }}
              className="lg:pr-5 pr-2 lg:w-10 w-6"
            />{" "}
            Suivez nos recommandations.
          </span>
          <span className="flex items-center xl:text-xl lg:text-lg text-sm  text-white">
            {" "}
            <FontAwesomeIcon
              style={{ width: "1.25rem", height: "1.25rem" }}
              icon={faArrowRight}
              className="lg:pr-5 pr-2 lg:w-10 w-6"
            />{" "}
            Observez-vous évoluer 💪
          </span>
        </div>
      </div>
      <div>
        {" "}
        <Link
          href="/api/auth/signin?callbackUrl=/form"
          className="cursor-pointer lg:w-64 mt-10  lg:h-14 rounded-full flex items-center 2xl:space-x-2 lg:space-x-1 space-x-0 2xl:px-3 lg:px-1 px-2 border-2 bg-white text-sky-900 border-solid  placeholder-black placeholder-opacity-45 border-sky-900 transition-all   "
        >
          <Image alt="google " src="/google.png" width={40} height={40}></Image>
          <span className="lg:text-lg ">
            <span className="">Sign-In </span> with Google
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
