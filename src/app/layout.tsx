import type { Metadata } from "next";

import "./globals.css";
import Header from "./Components/Header";
import AuthProvider from "./auth/Provider";
export const metadata: Metadata = {
  title: "Heaf",
  description: "Vos algoritmes de santé",
};

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
