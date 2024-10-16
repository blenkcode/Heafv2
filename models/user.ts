// models/user.ts

import mongoose, { Schema, Document, Model } from "mongoose";

// Définition de l'interface TypeScript pour représenter l'utilisateur
export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  image?: string;
  firstCo?: Date;
  age?: number;
  height?: number;
  gender?: string;
  activityLevel?: number;
  weightObj?: number;
  BMR?: number;
  TDEE?: number;
  objectif?: number;
  caloriesDeficit?: number;
  weights?: {
    weight: number;
    date: Date;
  }[];
}

// Schéma Mongoose pour l'utilisateur
const userSchema: Schema<IUser> = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  image: { type: String },
  firstCo: { type: Date, default: Date.now },
  age: { type: Number },
  height: { type: Number },
  gender: { type: String },
  activityLevel: { type: Number },
  BMR: { type: Number },
  weightObj: { type: Number },
  TDEE: { type: Number },
  objectif: { type: Number },
  caloriesDeficit: { type: Number },
  weights: [
    {
      weight: { type: Number, required: true },
      date: { type: Date, required: true },
    },
  ],
});

// Vérifier si le modèle existe déjà pour éviter des erreurs lors du rechargement en développement
const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default User;
