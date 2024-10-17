"use client";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBullseye,
  faWeightScale,
  faFire,
  faArrowDown,
} from "@fortawesome/free-solid-svg-icons";

const MainHero = ({}) => {
  return (
    <div className="bg-transparent scale-90 lg:mt-0 flex  items-center w-fit text-slate-200 px-5 h-fit py-5 relative rounded-xl ">
      <div className="w-full flex items-center justify-center">
        <div className=" flex w-56 space-y-5  flex-col items-center justify-center py-10 lg:py-0">
          <span className="border-slate-300 shadow-2xl bg-sky-900  border-2 border-opacity-80 rounded-xl flex justify-center  hover:bg-customBlue2 transition-colors  w-full lg:h-full h-24  lg:mr-8 flex-col items-start py-2 pl-4 lg:mb-0 mb-5 overflow-hidden relative">
            <div className="2xl:w-56 w-48 h-48 -left-28 2xl:h-56 absolute rounded-full bg-zinc-200 z-10 shadow-2xl "></div>
            <div className="flex justify-between text-sky-900 2xl:text-lg lg:text-base z-20 w-full pr-2 ">
              Poids{" "}
              <FontAwesomeIcon
                className="p-1 w-5 h-5 max-w-5 min-h-5 z-20 text-white"
                icon={faWeightScale}
              />
            </div>{" "}
            <div className="flex items-center justify-between text-sky-900 text-base z-20 w-full pr-2 ">
              <span className="2xl:text-3xl text-2xl mt-2 text-sky-900 z-20">
                75
                <span className="2xl:text-2xl lg:text-xl">Kg</span>{" "}
              </span>
              <div className="text-white flex 2xl:text-base lg:text-sm items-center justify-center">
                {" "}
                <div>- 6%</div>
                <FontAwesomeIcon
                  className={`p-1 w-5 h-5 z-20 text-lg text-green-500" 
                   `}
                  icon={faArrowDown}
                />
              </div>
            </div>
          </span>
          <span className="border-slate-300 shadow-2xl bg-sky-900  border-2 border-opacity-80 rounded-xl flex justify-center  hover:bg-customBlue2 transition-colors  w-full lg:h-full h-24  lg:mr-8 flex-col items-start py-2 pl-4 lg:mb-0 mb-5 overflow-hidden relative">
            <div className="2xl:w-56 w-48 h-48 -left-20 2xl:h-56 absolute rounded-full bg-zinc-200 z-10 shadow-2xl "></div>
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
                1852
                <span className="2xl:text-2xl lg:text-xl"> Kcal</span>{" "}
              </span>
            </div>
          </span>
          <span className="border-slate-300 shadow-2xl bg-sky-900  border-2 border-opacity-80 rounded-xl flex justify-center  hover:bg-customBlue2 transition-colors  w-full lg:h-full h-24  lg:mr-8 flex-col items-start py-2 pl-4 lg:mb-0 mb-5 overflow-hidden relative">
            <div className="2xl:w-56 w-48 h-48 -left-20 2xl:h-56 absolute rounded-full bg-zinc-200 z-10 shadow-2xl "></div>
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
                1750
                <span className="2xl:text-2xl lg:text-xl">Kcal</span>{" "}
              </span>
            </div>
          </span>
          <span className="border-slate-300 shadow-2xl bg-sky-900  border-2 border-opacity-80 rounded-xl flex justify-center  hover:bg-customBlue2 transition-colors  w-full lg:h-full h-24  lg:mr-8 flex-col items-start py-2 pl-4 lg:mb-0 mb-5 overflow-hidden relative">
            <div className="2xl:w-56 w-48 h-48 -left-20 2xl:h-56 absolute rounded-full bg-zinc-200 z-10 shadow-2xl "></div>
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
                2342
                <span className="2xl:text-2xl lg:text-xl"> Kcal</span>{" "}
              </span>
            </div>
          </span>
        </div>
      </div>
    </div>
  );
};

export default MainHero;
