import "./style.scss";
import "remixicon/fonts/remixicon.css";

import { app } from "./framework/app";
import { Counter } from "./pages/Counter";
import { Contact } from "./pages/Contact";
import { Home } from "./pages/Home";
import { Produits } from "./pages/Produits/Produits";
import { User } from "./pages/Produits/User";

const routes = {
  "/": Home,
  "/compteur": Counter,
  "/contact": Contact,
  "/utilisateur": User,
  "/produits": Produits,
};

app("#app", routes);
