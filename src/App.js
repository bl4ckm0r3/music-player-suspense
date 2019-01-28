import React from "react";

import "./App.css";
import Loader from "./Loader";

const Home = React.lazy(() => import("./Home"));

export default function App() {
  return (
    <React.Suspense fallback={<Loader />}>
      <div className="App">
        <Home />
      </div>
    </React.Suspense>
  );
}
