"use client";

import Hero from "./Components/Hero";
import Circle from "./Components/Circle";
import Circle2 from "./Components/Circle2";
import Circle3 from "./Components/Circle3";
import Auth from "./Components/Auth";

export default function Home() {
  return (
    <main className="h-screen w-full font-Satoshi text-base flex lg:flex-row flex-col items-center justify-center lg:bg-zinc-100 bg-sky-900 text-sky-800 overflow-hidden overflow-y-scroll ">
      <div className="  w-full lg:w-2/3  lg:bg-transparent bg-opacity-50 flex flex-col lg:items-end items-center xl:pr-44 2xl:pr-80 lg:pr-32 lg:justify-start justify-center lg:pt-48 relative lg:h-full h-auto py-20 lg:py-0 ">
        <Hero />
        <Circle />
        <Circle2 />
        <Circle3 />
      </div>
      <div className="lg:w-1/2 h-full w-full  lg:mt-10  flex flex-col items-center justify-center">
        <Auth></Auth>
      </div>
    </main>
  );
}
