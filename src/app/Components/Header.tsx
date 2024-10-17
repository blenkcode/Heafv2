"use client";
import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faTableColumns,
  faAddressCard,
} from "@fortawesome/free-solid-svg-icons";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";
const Header = () => {
  const headRef = useRef(null);
  useEffect(() => {
    const screenWidth = window.innerWidth;
    if (screenWidth > 1000) {
      gsap.fromTo(
        headRef.current,
        { y: "-100%", visibility: "hidden" },
        {
          y: "0%",
          duration: 1,
          delay: 0.5,
          ease: "power3.out",
          visibility: "visible",
        }
      );
    }
  }, []);
  return (
    <div
      ref={headRef}
      className="w-header lg:invisible px-10 text-white text-base font-Satoshi rounded-bl-full  rounded-br-full fixed z-50 top-0 left-1/2 -translate-x-1/2 h-12 bg-sky-900 flex items-center justify-center   invisible   overflow-hidden border-b-2 border-l-2 border-r-2 border-gray-200"
    >
      <div className="flex space-x-20 h-full items-center ">
        <Link
          href="/api/auth/signout?callbackUrl=/"
          className="text-lg h-full transition-all  flex items-center  overflow-hidden group"
        >
          <div className="group-hover:-translate-y-10 transition-all duration-500">
            <FontAwesomeIcon icon={faHouse} className="w-5 h-5 mr-3" />
            Acceuil
          </div>
          <div className="absolute text-white translate-y-10 group-hover:translate-y-0 transition-all duration-500">
            <FontAwesomeIcon icon={faHouse} className="w-5 h-5 mr-3" />
            Acceuil
          </div>
        </Link>
        <Link
          href="/dashboard"
          className="text-lg h-full transition-all  flex items-center  overflow-hidden group"
        >
          <div className="group-hover:-translate-y-10 transition-all duration-500">
            <FontAwesomeIcon icon={faTableColumns} className="w-5 h-5 mr-3" />
            Dashboard
          </div>
          <div className="absolute text-white translate-y-10 group-hover:translate-y-0 transition-all duration-500">
            <FontAwesomeIcon icon={faTableColumns} className="w-5 h-5 mr-3" />
            Dashboard
          </div>
        </Link>
        <Link
          href="https://www.valentin-mor.com/"
          className="text-lg h-full transition-all  flex items-center  overflow-hidden group"
        >
          <div className="group-hover:-translate-y-10 transition-all duration-500">
            <FontAwesomeIcon icon={faAddressCard} className="w-5 h-5 mr-3" />
            Contact
          </div>
          <div className="absolute text-white translate-y-10 group-hover:translate-y-0 transition-all duration-500">
            <FontAwesomeIcon icon={faHouse} className="w-5 h-5 mr-3" />
            Contact
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Header;
