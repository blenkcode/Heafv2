import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import DotsMain from "./DotsMain";
const Hero = () => {
  return (
    <div className="lg:space-y-10 flex flex-col z-40 relative  ">
      <DotsMain></DotsMain>
      <div className="lg:w-96 lg:h-96 w-56 h-56  bg-gradient-to-br from-sky-900 to-transparent rounded-full absolute -top-24 -left-24 z-10"></div>
      <div className="lg:space-y-7 space-y-7 flex flex-col  items-center z-30  ">
        <h1 className=" lg:text-8xl text-5xl text-white flex items-center justify-center z-10 lg:justify-start font-bold">
          Heaf{" "}
          <Link
            href="https://www.valentin-mor.com/"
            className="lg:px-5 lg:py-2 px-2 py-1  xl:px-6 xl:py-3 2xl:text-xl xl:text-lg lg:text-base text-sm text-white border-sky-900 hover:border-zinc-200 rounded-xl  border-2 cursor-pointer hover:bg-transparent bg-sky-900 xl:mt-5 lg:font-bold font-normal lg:mt-3 mt-2 hover:text-white transition-colors lg:ml-10 ml-8 z-50"
          >
            Contact
          </Link>
        </h1>
        <div></div>
        <div className="flex flex-col 2xl:space-y-14 lg:space-y-10 space-y-5 font-thin">
          {" "}
          <span className="flex items-center  xl:text-xl lg:text-lg text-sm text-white">
            {" "}
            <FontAwesomeIcon
              icon={faArrowRight}
              className="lg:pr-5 pr-2 lg:w-10 w-6"
            />{" "}
            Calculez vos besoins nutritionnels
          </span>
          <span className="flex items-center  xl:text-xl lg:text-lg text-sm  text-white">
            <FontAwesomeIcon
              icon={faArrowRight}
              className="lg:pr-5 pr-2 lg:w-10 w-6"
            />{" "}
            Suivez nos recommandations.
          </span>
          <span className="flex items-center xl:text-xl lg:text-lg text-sm  text-white">
            {" "}
            <FontAwesomeIcon
              icon={faArrowRight}
              className="lg:pr-5 pr-2 lg:w-10 w-6"
            />{" "}
            Observez-vous évoluer 💪
          </span>
        </div>
      </div>
    </div>
  );
};

export default Hero;
