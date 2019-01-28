import React from "react";

import "./App.css";
import { asyncComponent } from "./util";

const Home = asyncComponent(() => import("./Home").then(mod => mod.default));

export default function App() {
  return (
    <div className="App">
      <Home />
    </div>
  );
}
