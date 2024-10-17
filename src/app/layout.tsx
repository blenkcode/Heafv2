import type { Metadata } from "next";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css"; // Importer les styles FontAwesome manuellement
import "./fontawesome";
import "./globals.css";
import Header from "./Components/Header";
import AuthProvider from "./auth/Provider";
export const metadata: Metadata = {
  title: "Heaf",
  description: "Vos algoritmes de santé",
};
config.autoAddCss = false;
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AuthProvider>
        {" "}
        <body className={` antialiased`}>
          {" "}
          <Header />
          {children}
        </body>
      </AuthProvider>
    </html>
  );
}
