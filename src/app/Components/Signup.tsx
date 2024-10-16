"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { z } from "zod";
const Signup = ({ handleChange }: { handleChange: () => void }) => {
  const router = useRouter();
  //ZOD SCHEMA
  const signupSchema = z.object({
    username: z.string().min(1, "Votre nom est requis"),
    email: z.string().email("Email non valide"),
    password: z.string().min(6, "Minimum 6 caractères"),
  });

  //INPUTS STATES
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  //ZOD STATE
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [error, setError] = useState("");

  //Fonction SUBMIT

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation des données avec Zod
    const result = signupSchema.safeParse({ username, email, password });

    if (!result.success) {
      // En cas d'erreur de validation, on stocke les erreurs pour chaque champ
      const errorMessages: { [key: string]: string } = {};
      result.error.errors.forEach((error) => {
        errorMessages[error.path[0]] = error.message;
      });
      setErrors(errorMessages);
    } else {
      setErrors({});
      // Si la validation est réussie

      try {
        const response = await fetch(
          `https://heaf-back-end.vercel.app/users/signup`,
          {
            method: "POST", // Assurez-vous que le backend utilise POST
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              username,
              email,
              password,
            }),
          }
        );

        const data = await response.json();

        if (data.result) {
          // Stocker le token JWT dans localStorage ou dans un cookie
          localStorage.setItem("token", data.token); // Ou utiliser des cookies sécurisés pour stocker le token

          // Rediriger si l'inscription réussit
          router.push("/form");
        } else {
          // Gérer l'erreur si l'utilisateur existe déjà
          setError(data.error); // Affiche l'erreur sur l'UI
        }
      } catch (err) {
        console.error("Error:", err);
        setError("Une erreur est survenue. Veuillez réessayer."); // Gérer une erreur de réseau ou autre
      }

      // Logique pour soumettre les données
    }
  };

  return (
    <main className="font-Satoshi lg:text-sky-800 text-white h-full  flex flex-col items-center justify-center lg:space-y-10 space-y-5  pb-10 w-full">
      <div className="w-full flex flex-col 2xl:space-y-10 xl:space-y-8 lg:space-y-6 space-y-5">
        <div className="relative">
          <input
            type="text"
            placeholder="Votre nom"
            className="w-full 2xl:h-12 lg:h-10 h-10  rounded-xl flex items-center px-3 border-2 bg-transparent border-solid  lg:placeholder-black placeholder-zinc-400  lg:placeholder-opacity-45 placeholder-opacity-45 lg:border-sky-900 border-white "
            onChange={(e) => setUsername(e.target.value)}
          ></input>
          {errors.username && (
            <p className="text-red-500 absolute 2xl:-bottom-7 lg:-bottom-5 left-2 2xl:text-base lg:text-sm">
              {errors.username}
            </p>
          )}
        </div>
        <div className="relative">
          {" "}
          <input
            type="text"
            placeholder="youremail@gmail.com"
            className="w-full 2xl:h-12 lg:h-10 h-10  rounded-xl flex items-center px-3 border-2 bg-transparent border-solid  lg:placeholder-black placeholder-zinc-400  lg:placeholder-opacity-45 placeholder-opacity-45 lg:border-sky-900 border-white "
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          {errors.email && (
            <p className="text-red-500 absolute 2xl:-bottom-7 lg:-bottom-5 left-2 2xl:text-base lg:text-sm">
              {errors.email}
            </p>
          )}
        </div>
        <div className="relative">
          {" "}
          <input
            type="text"
            placeholder="Password"
            className="w-full 2xl:h-12 lg:h-10 h-10  rounded-xl flex items-center px-3 border-2 bg-transparent border-solid  lg:placeholder-black placeholder-zinc-400  lg:placeholder-opacity-45 placeholder-opacity-45 lg:border-sky-900 border-white "
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          {errors.password && (
            <p className="text-red-500 absolute 2xl:-bottom-7 lg:-bottom-5 left-2 2xl:text-base lg:text-sm">
              {errors.password}
            </p>
          )}
        </div>
      </div>
      <div className="w-full flex flex-col lg:space-y-5 space-y-3 items-center">
        <div
          onClick={handleSubmit}
          className="2xl:w-56 lg:w-48 2xl:h-12 w-full h-10 lg:h-10 cursor-pointer rounded-full flex items-center justify-center px-3 border-2 lg:bg-sky-800 bg-zinc-200  text-white border-solid  placeholder-black placeholder-opacity-45 border-sky-900 transition-all  hover:text-sky-900 font-bold relative overflow-hidden group"
        >
          <div className="absolute w-56 h-44 z-20 rounded-full  bg-zinc-100 -translate-x-56 ease-in-out group-hover:-translate-x-0 transition-all duration-500"></div>

          <div className="z-30  transition-all duration-500  ease-in-out  group-hover:scale-125 lg:text-white text-sky-900 group-hover:translate-x-56">
            Inscription
          </div>
          <div className="z-30 absolute -translate-x-56 group-hover:translate-x-0 ease-in-out   text-sky-900 transition-all duration-500 font-extrabold ">
            Inscription
          </div>
        </div>

        <Link
          href="/api/auth/signin?callbackUrl=/form"
          className="cursor-pointer 2xl:w-56 lg:w-48 2xl:h-12 lg:h-10 rounded-full flex items-center 2xl:space-x-2 lg:space-x-1 space-x-0 2xl:px-3 lg:px-1 px-2 border-2 bg-white text-sky-900 border-solid  placeholder-black placeholder-opacity-45 border-sky-900 transition-all hover:bg-transparent hover:text-sky-900 "
        >
          <Image alt="google " src="/google.png" width={40} height={40}></Image>
          <span className="2xl:textbase lg:text-sm">Sign-Up with Google</span>
        </Link>
        <button
          className="font-bold  text-white lg:text-sky-900 "
          onClick={(e) => {
            e.preventDefault(); // Empêche la page de se recharger
            handleChange();
          }}
        >
          Connectez-vous
        </button>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}{" "}
      {/* Afficher l'erreur */}
    </main>
  );
};

export default Signup;
