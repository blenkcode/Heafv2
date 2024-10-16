// next-auth.d.ts
import NextAuth from "next-auth";

// Étendre le type de session pour inclure 'id', 'age', 'height', et 'gender'
declare module "next-auth" {
  interface User {
    id: string;
    age?: number | null;
    height?: number | null;
    gender?: string | null;
  }

  interface Session {
    user: {
      id: string; // Ajouter l'ID utilisateur
      age?: number | null; // Ajouter l'âge
      height?: number | null; // Ajouter la taille
      gender?: string | null; // Ajouter le sexe
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}
