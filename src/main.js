import "./style.scss";
import "remixicon/fonts/remixicon.css";

import { app } from "./framework/app";
import { Counter } from "./pages/Counter";
import { Contact } from "./pages/Contact";
import { Home } from "./pages/Home";
import { Users } from "./pages/Users/Users";
import { User } from "./pages/Users/User";

const routes = {
  "/": Home,
  "/compteur": Counter,
  "/contact": Contact,
  "/utilisateur": User,
  "/utilisateurs": Users,
};

app("#app", routes);
