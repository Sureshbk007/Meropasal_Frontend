import React from "react";
import { Header, Footer } from "./components";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="bg-slate-50">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
