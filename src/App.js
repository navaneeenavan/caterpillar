import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./Landing";
import Forms from "./Forms";
import Login from "./Login";
import BatteryForms from "./BatteryForms";
import ExteriorBrakes from "./ExteriorBrakes";
import Engines from "./Engines";
import EnginerLanding from "./Landing2";
import BrakesAndExterior from "./ExteriorBrakes";
import BrakesLanding from "./Landing3";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Forms />} />
        <Route index element={<Landing />} /> 
        <Route path="/Forms" element={<Forms />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/BatteryForms" element={<BatteryForms />} />
        <Route path="/Brakes" element={<ExteriorBrakes />} />
        <Route path="/BrakesLanding" element={<BrakesLanding />} />
        <Route path="/Engines" element={<Engines />} />
        <Route path="/EngineLanding" element={<EnginerLanding />} />
        
      </Routes>
    </BrowserRouter>
  );
};

export default App;
