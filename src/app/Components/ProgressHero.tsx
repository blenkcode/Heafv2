"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBullseye } from "@fortawesome/free-solid-svg-icons";

import { ProgressCircle } from "../Components/Progress";

const ProgressHero = ({}) => {
  return (
    <div className="text-slate-200 w-56 flex scale-90 flex-col justify-between shadow-2xl  items-center  bg-sky-900 border-2 border-gray-200 px-5 rounded-xl py-5  h-fit mt-5 lg:mt-0  ">
      {" "}
      <div className="h-full w-full items-center justify-center flex">
        {" "}
        <ProgressCircle variant="default" value={42} radius={80}>
          <span className="text-xl font-medium text-gray-900 dark:text-gray-50">
            42%
          </span>
        </ProgressCircle>
      </div>
      <div className="w-full h-2 bg-red"></div>
      <span className="border-slate-300 bg-zinc-200 border-2 border-opacity-80 rounded-xl flex justify-center  hover:bg-customBlue2 transition-colors  w-full h-fit  mt-8 flex-col items-start py-2 pl-4 lg:mb-0 mb-5 overflow-hidden relative">
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
            71
            <span className="2xl:text-2xl lg:text-xl"> Kg</span>{" "}
          </span>
        </div>
      </span>
    </div>
  );
};

export default ProgressHero;
