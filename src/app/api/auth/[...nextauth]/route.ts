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
          firstCo: new Date(),
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
      }

      // Vérifier que existingUser n'est pas null et que l'_id est bien défini
      if (existingUser && existingUser._id) {
        // Convertir l'ObjectId en string
        user.id = existingUser._id.toString();
      }

      return true;
    },

    // Ajouter l'ID utilisateur (string) au JWT
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.age = user.age;
        token.height = user.height;
        token.gender = user.gender;
      }
      return token;
    },

    // Inclure l'ID utilisateur dans la session
    async session({ session, token }) {
      if (session?.user) {
        session.user.image = token.picture;
        session.user.id = token.id as string;
        session.user.age = token.age as number;
        session.user.height = token.height as number;
        session.user.gender = token.gender as string;
      }
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};

// Exporter les méthodes GET et POST comme routes
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
