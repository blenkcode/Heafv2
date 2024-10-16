import { NextResponse } from "next/server";
import { connectToDatabase } from "../../../../lib/mongodb";
import UserModel from "../../../../models/user";
import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server"; // Utiliser NextRequest ici

const secret = process.env.NEXTAUTH_SECRET;

// Fonction qui gère les requêtes PUT
export async function PUT(req: NextRequest) {
  // Remplacer Request par NextRequest
  try {
    // Récupérer le token JWT à partir du header via next-auth
    const token = await getToken({ req, secret });

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const userId = token.sub;

    // Connexion à la base de données
    await connectToDatabase();

    // Extraire les données de la requête PUT
    const updateData = await req.json();

    // Mettre à jour l'utilisateur dans la base de données
    const result = await UserModel.findOneAndUpdate(
      { _id: userId },
      { $set: updateData },
      { new: true }
    );

    if (!result) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Réponse réussie avec l'utilisateur mis à jour
    return NextResponse.json({
      message: "User updated successfully",
      user: result,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
