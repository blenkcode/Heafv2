"use client";
import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faTableColumns,
  faAddressCard,
} from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  return (
    <div className="w-fit px-10 text-white text-base font-Satoshi rounded-bl-full  rounded-br-full fixed z-50 top-0 left-1/2 -translate-x-1/2 h-12 bg-sky-900 flex items-center justify-center  lg:visible invisible  border-sky-900  overflow-hidden">
      <div className="flex space-x-20 h-full items-center ">
        <Link
          href="/"
          className="text-lg h-full transition-all  flex items-center  overflow-hidden group"
        >
          <div className="group-hover:-translate-y-10 transitipon-all duration-500">
            <FontAwesomeIcon icon={faHouse} className="w-5 h-5 mr-3" />
            Acceuil
          </div>
          <div className="absolute text-white translate-y-10 group-hover:translate-y-0 transiton-all duration-500">
            <FontAwesomeIcon icon={faHouse} className="w-5 h-5 mr-3" />
            Acceuil
          </div>
        </Link>
        <Link
          href="/dashboard"
          className="text-lg h-full transition-all  flex items-center  overflow-hidden group"
        >
          <div className="group-hover:-translate-y-10 transitipon-all duration-500">
            <FontAwesomeIcon icon={faTableColumns} className="w-5 h-5 mr-3" />
            Dashboard
          </div>
          <div className="absolute text-white translate-y-10 group-hover:translate-y-0 transiton-all duration-500">
            <FontAwesomeIcon icon={faTableColumns} className="w-5 h-5 mr-3" />
            Dashboard
          </div>
        </Link>
        <Link
          href="/"
          className="text-lg h-full transition-all  flex items-center  overflow-hidden group"
        >
          <div className="group-hover:-translate-y-10 transitipon-all duration-500">
            <FontAwesomeIcon icon={faAddressCard} className="w-5 h-5 mr-3" />
            Contact
          </div>
          <div className="absolute text-white translate-y-10 group-hover:translate-y-0 transiton-all duration-500">
            <FontAwesomeIcon icon={faHouse} className="w-5 h-5 mr-3" />
            Contact
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Header;
