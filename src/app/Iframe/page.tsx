"use client"; // Si ce fichier utilise des composants React avec des hooks, il doit être exécuté côté client

import React, { useEffect } from "react";

const ShotgunWidget = () => {
  useEffect(() => {
    // Charger le script externe une fois que le composant est monté côté client
    const script = document.createElement("script");
    script.src = "https://shotgun.live/widget.js";
    script.async = true; // Charger de manière asynchrone pour ne pas bloquer le chargement de la page
    document.body.appendChild(script); // Injecter le script dans le body
    return () => {
      document.body.removeChild(script); // Nettoyage lorsque le composant est démonté
    };
  }, []);

  return (
    <div>
      {/* Insertion de l'iframe */}
      <iframe
        src="https://shotgun.live/festivals/test-test-test-34?embedded=1&ui=light&transparentBackground=1"
        allow="payment" // Autorisation de paiement via iframe
        style={{
          width: "100%", // Utilisation du CSS en JSX
          height: "800px",
          maxHeight: "calc(100vh - 200px)",
          border: "0",
          colorScheme: "none",
        }}
      />
    </div>
  );
};

export default function Page() {
  return (
    <main>
      <h1>Festival Widget</h1>
      {/* Intégrer le composant ShotgunWidget dans la page */}
      <ShotgunWidget />
    </main>
  );
}
