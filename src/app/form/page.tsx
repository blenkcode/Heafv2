import React from "react";
import Circle from "../Components/Circle";
import Circle2 from "../Components/Circle2";
import Circle3 from "../Components/Circle3";
import Hero from "./Hero";
import Form from "./Form";
const page = () => {
  return (
    <main className="min-h-screen w-full font-Satoshi text-base flex items-center lg:justify-center overflow-x-hidden lg:bg-zinc-100 bg-sky-900 text-sky-800 lg:flex-row flex-col   overflow-y-auto ">
      <div className="lg:w-1/2 lg:pl-52   lg:pb-20 lg:h-full flex flex-col items-center justify-center relative px-5 ">
        <Circle />
        <Circle2 />
        <Circle3 />
        <Hero />
      </div>
      <div className="lg:w-1/2 h-full  flex flex-col items-center justify-center">
        <Form />
      </div>
    </main>
  );
};

export default page;
