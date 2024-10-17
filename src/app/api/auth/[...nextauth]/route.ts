import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectToDatabase } from "../../../../../lib/mongodb";
import UserModel from "../../../../../models/user";

// Définition des options d'authentification
const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, profile }) {
      await connectToDatabase();

      // Chercher l'utilisateur dans la base de données
      let existingUser = await UserModel.findOne({ email: user.email });

      // Si l'utilisateur n'existe pas, on le crée
      if (!existingUser) {
        const newUser = new UserModel({
          name: profile?.name,
          email: user.email,
          firstCo: new Date(), // On définit la première connexion
          password: "not defined", // Placeholder password
          image: profile?.image,
          age: null,
          height: null,
          gender: null,
          activityLevel: null,
          BMR: null,
          weightObj: 0,
          TDEE: null,
          objectif: null,
          caloriesDeficit: null,
        });
        existingUser = await newUser.save();

        // Retourner que l'utilisateur est nouveau
        user.isFirstLogin = true;
      } else {
        // Si l'utilisateur est trouvé, indiquer que ce n'est pas une première connexion
        user.isFirstLogin = false;
      }

      // Convertir l'ObjectId en string
      if (existingUser && existingUser._id) {
        user.id = existingUser._id.toString();
      }

      return true;
    },

    async jwt({ token, user }) {
      // Si un nouvel utilisateur a été créé lors de la connexion
      if (user) {
        token.id = user.id;
        // Assigner isFirstLogin en fonction de la création de l'utilisateur
        token.isFirstLogin = user.isFirstLogin;
      }
      return token;
    },

    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.id as string;

        // Assurer que isFirstLogin est bien transmis à la session
        session.user.isFirstLogin = token.isFirstLogin as boolean;
      }
      return session;
    },

    async redirect({ baseUrl }) {
      // Rediriger par défaut vers /dashboard
      return `${baseUrl}/`;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};

// Exporter les méthodes GET et POST comme routes
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
