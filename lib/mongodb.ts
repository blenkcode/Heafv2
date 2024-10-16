import mongoose from "mongoose";

let isConnected = false; // Pour vérifier si nous sommes déjà connectés à la base de données

export async function connectToDatabase(): Promise<void> {
  if (isConnected) {
    // Si nous sommes déjà connectés, retournez la connexion
    return;
  }

  if (!process.env.MONGODB_URI) {
    throw new Error("Please add your Mongo URI to .env.local");
  }

  try {
    // Connectez-vous à MongoDB avec Mongoose
    await mongoose.connect(process.env.MONGODB_URI);

    isConnected = true; // Marquez la connexion comme établie
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    throw new Error("Failed to connect to MongoDB");
  }
}
