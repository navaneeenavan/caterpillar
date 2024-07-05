import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./Landing";
import Forms from "./Forms";
import Login from "./Login";
import BatteryForms from "./BatteryForms";
import ExteriorBrakes from "./ExteriorBrakes";

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
      </Routes>
    </BrowserRouter>
  );
};

export default App;
