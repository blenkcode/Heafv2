// fontawesome.js
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { config } from "@fortawesome/fontawesome-svg-core";

// Désactiver le chargement automatique du CSS pour FontAwesome
config.autoAddCss = false;

// Ajouter les icônes dont tu as besoin
library.add(fas);
