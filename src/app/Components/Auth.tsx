"use client";

import React, { useState } from "react";

import Login from "./Login";
import Signup from "./Signup";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  const handleChange = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="lg:text-sky-900 text-white w-full relative h-full flex-col flex items-center justify-center">
      <div className="overflow-hidden lg:text-4xl text-xl relative ">
        <div
          className={` transition-all duration-500 ${
            isLogin ? "translate-y-44" : "translate-y-0"
          }`}
        >
          Connectez-vous
        </div>
        <div
          className={` transition-all duration-500 ${
            isLogin ? "lg:-translate-y-10 -translate-y-8" : "translate-y-44"
          }`}
        >
          Créer un compte
        </div>
      </div>
      <div
        className={`absolute top-1/2 lg:w-1/2 mt-10  -translate-y-1/2 transition-all duration-500 ${
          isLogin ? " opacity-0 invisible" : "visible opacity-100"
        }`}
      >
        <Login handleChange={handleChange} />
      </div>
      <div
        className={` flex  lg:w-1/2   items-center justify-center transition-all duration-500 ${
          isLogin ? " opacity-100 visible" : " opacity-0 invisible"
        }`}
      >
        <Signup handleChange={handleChange} />
      </div>
    </div>
  );
};

export default Auth;
