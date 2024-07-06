import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import BatteryForms from "./BatteryForms";
import ExteriorBrakes from "./ExteriorBrakes";
import Engines from "./Engines";
import EnginerLanding from "./Landing2";
import BrakesLanding from "./Landing3";
import FinalPage from "./FinalPage";
import TireLanding from "./Landing4";
import TireInspectionForm from "./Forms";
import BatteryLanding from "./Landing";
import Init from "./Main";
import NewUser from "./Create";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Init" element={<Init />} />
        <Route path = "/Create" element ={<NewUser/>} />
        <Route path="/Tire" element={<TireLanding  />} />
        <Route path="/TireForms" element={<TireInspectionForm />} />
        <Route path="/Battery" element={<BatteryLanding />} />
        <Route path="/BatteryForms" element={<BatteryForms />} />
        <Route path="/Brakes" element={<ExteriorBrakes />} />
        <Route path="/BrakesLanding" element={<BrakesLanding />} />
        <Route path="/Engines" element={<Engines />} />
        <Route path="/EngineLanding" element={<EnginerLanding />} />
        <Route path="/FinalPage" element={<FinalPage />} />
        
      </Routes>
    </BrowserRouter>
  );
};

export default App;
