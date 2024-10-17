"use client";

import Hero from "./Components/Hero";
import Circle from "./Components/Circle";
import Circle2 from "./Components/Circle2";
import Circle3 from "./Components/Circle3";

import MainHero from "./Components/MainHero";
import ProgressHero from "./Components/ProgressHero";
import ChartHero from "./Components/ChartHero";
import MacroHero from "./Components/MacroHero";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";
export default function Home() {
  const progRef = useRef(null);
  const macroRef = useRef(null);
  const mainRef = useRef(null);
  const chartRef = useRef(null);
  useEffect(() => {
    const screenWidth = window.innerWidth;
    if (screenWidth > 1000) {
      gsap.fromTo(
        progRef.current,
        { opacity: 0, y: -500, visibility: "hidden" },
        {
          opacity: 1,
          y: -120,
          duration: 2,
          delay: 0,
          ease: "power3.out",
          visibility: "visible",
        }
      );
      gsap.fromTo(
        macroRef.current,
        { opacity: 0, x: 500, visibility: "hidden" },
        {
          opacity: 1,
          x: 240,
          duration: 2,
          delay: 0,
          ease: "power3.out",
          visibility: "visible",
        }
      );
      gsap.fromTo(
        mainRef.current,
        { opacity: 0, y: 500, visibility: "hidden" },
        {
          opacity: 1,
          y: 200,
          duration: 2,
          delay: 0,
          ease: "power3.out",
          visibility: "visible",
        }
      );
      gsap.fromTo(
        chartRef.current,
        { opacity: 0, x: -500, visibility: "hidden" },
        {
          opacity: 1,
          x: -50,
          duration: 2,
          delay: 0,
          ease: "power3.out",
          visibility: "visible",
        }
      );
    } else {
      gsap.fromTo(
        progRef.current,
        { opacity: 0, y: 500, visibility: "hidden" },
        {
          opacity: 1,
          y: 270,
          duration: 2,
          delay: 0,
          ease: "power3.out",
          visibility: "visible",
        }
      );
      gsap.fromTo(
        macroRef.current,
        { opacity: 0, x: 500, visibility: "hidden" },
        {
          opacity: 1,
          x: 100,
          duration: 2,
          delay: 0,
          ease: "power3.out",
          visibility: "visible",
        }
      );
      gsap.fromTo(
        mainRef.current,
        { opacity: 0, y: -500, visibility: "hidden" },
        {
          opacity: 1,
          y: -150,
          duration: 2,
          delay: 0,
          ease: "power3.out",
          visibility: "visible",
        }
      );
      gsap.fromTo(
        chartRef.current,
        { opacity: 0, x: -300, visibility: "hidden" },
        {
          opacity: 1,
          x: -150,
          duration: 2,
          delay: 0,
          ease: "power3.out",
          visibility: "visible",
        }
      );
    }
  }, []);
  return (
    <main className="lg:h-lvh  h-screen w-full font-Satoshi text-base flex lg:flex-row flex-col items-center justify-center lg:bg-zinc-200 bg-sky-900 text-sky-800 overflow-hidden lg:overflow-y-hidden overflow-y-scroll ">
      <div className="  w-full lg:w-1/2  lg:bg-transparent bg-opacity-50 flex flex-col  items-center   justify-center relative lg:h-full h-auto py-20 lg:py-0 ">
        <Hero />
        <Circle />
        <Circle2 />
        <Circle3 />
      </div>
      <div className="lg:w-1/2 h-full w-full pb-20   flex flex-col items-center justify-center relative lg:scale-75 scale-50 mt-20 lg:mt-0">
        <div
          ref={progRef}
          className="absolute invisible lg:-translate-x-32 translate-x-36 z-20"
        >
          {" "}
          <ProgressHero></ProgressHero>
        </div>
        <div className=" z-20 absolute text-5xl font-Satoshi translate-x-14 translate-y-6"></div>
        {/* <div className="absolute w-72 h-72 rounded-full bg-sky-900 bg-opacity-50 z-10 translate-x-14 translate-y-6"></div> */}
        <div
          ref={macroRef}
          className="absolute invisible -translate-y-40  scale-75 z-20"
        >
          {" "}
          <MacroHero />
        </div>
        <div
          ref={mainRef}
          className="absolute  lg:translate-x-64 -translate-x-40 z-20 invisible"
        >
          {" "}
          <MainHero></MainHero>
        </div>{" "}
        <div
          ref={chartRef}
          className="absolute  scale-90 lg:translate-y-56 translate-y-64 invisible z-20"
        >
          {" "}
          <ChartHero></ChartHero>
        </div>
      </div>
    </main>
  );
}
