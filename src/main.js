import "./style.scss";
import "remixicon/fonts/remixicon.css";

import { app } from "./framework/app";
import { Contact } from "./pages/Contact";
import { Home } from "./pages/Home";
import { Produits } from "./pages/Produits/Produits";
import { User } from "./pages/Produits/User";

const routes = {
  "/": Home,
  "/contact": Contact,
  "/utilisateur": User,
  "/produits": Produits,
};

app("#app", routes);
