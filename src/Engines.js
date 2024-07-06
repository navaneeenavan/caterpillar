import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";

const Engines = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { response } = location.state || {};
  const truckSerialNumber = response?.engine_info.truck_serial_number || "";
  console.log(truckSerialNumber)
  const [formData, setFormData] = useState({
    engineRust: response?.engine_info.engine_rust || "No",
    engineRustNotes: response?.engine_info.engine_rust_notes || "",
    engineDent: response?.engine_info.engine_dent || "No",
    engineDentNotes: response?.engine_info.engine_dent_notes || "",
    engineOilColor: response?.engine_info.engine_oil_color || "Clean",
    brakeFluidCondition: response?.engine_info.brake_fluid_condition || "Good",
    brakeFluidColor: response?.engine_info.brake_fluid_color || "Clean",
    oilLeakEngine: response?.engine_info.oil_leak_engine || "No",
    attached_images: [], // Initially empty array
  });
  
  useEffect(() => {
    if (response) {
      setFormData({
        engineRust: response.engine_info.engine_rust || "No",
        engineRustNotes: response.engine_info.engine_rust_notes || "",
        engineDent: response.engine_info.engine_dent || "No",
        engineDentNotes: response.engine_info.engine_dent_notes || "",
        engineOilColor: response.engine_info.engine_oil_color || "Clean",
        brakeFluidCondition: response.engine_info.brake_fluid_condition || "Good",
        brakeFluidColor: response.engine_info.brake_fluid_color || "Clean",
        oilLeakEngine: response.engine_info.oil_leak_engine || "No",
        attached_images: [
          "http://example.com/engine1.jpg",
          "http://example.com/engine2.jpg"
        ], // Replace with actual data from your response or keep it as a placeholder
      });
    }
  }, [response]);
  

  const handleInputChange = (e, fieldName) => {
    const value = e.target.value;
    setFormData({
      ...formData,
      [fieldName]: value,
    });
  };

  const handlePrevious = () => {
    // Navigate to the previous page
    navigate("/Brakes");
  };

  const handleNext = async () => {
    // Post request to update engine information
    try {
      const result = await axios.post(
        `http://127.0.0.1:5000/api/truck-inspections/update-engine/${truckSerialNumber}`,{
        engine : formData,
    });

      if (result.status === 200) {
        toast.success("Engine information updated successfully!");
        navigate("/Brakes");
      } else {
        toast.error("Failed to update engine information.");
      }
    } catch (error) {
      toast.error("An error occurred while updating the engine information.");
      console.error("Error:", error);
    }
  };

  return (
    <main className="p-4 flex flex-col">
      <Bar />
            <button className="h-20 w-36 bg-blue-500 text-white" onClick={() => navigate("/EngineLanding")}>
              Speak UP
            </button>

      <section className="w-full p-4">
        <div className="flex flex-col items-center mb-4">
          <h1 className="text-2xl font-bold text-blue-500">Engine & Brakes Inspection Form</h1>
          <div className="h-2 w-80 bg-blue-500 mt-2 mb-4"></div>
          <p className="text-base font-bold text-gray-600 mb-2">Truck Serial Number: {truckSerialNumber}</p>
        </div>
        <div className="flex flex-row gap-24">
          <div className="flex-1">
            <h3 className="text-lg font-bold mb-4">Engine Details</h3>
            <div className="flex flex-row gap-16 mb-4">
              <div className="flex-1">
                <label className="block">Engine Rust</label>
                <select
                  value={formData.engineRust}
                  onChange={(e) => handleInputChange(e, "engineRust")}
                  className="border border-gray-300 rounded px-3 py-2 w-full"
                >
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
              {formData.engineRust === "Yes" && (
                <div className="flex-1">
                  <label className="block">Notes</label>
                  <input
                    type="text"
                    value={formData.engineRustNotes}
                    onChange={(e) => handleInputChange(e, "engineRustNotes")}
                    className="border border-gray-300 rounded px-3 py-2 w-full"
                  />
                </div>
              )}
            </div>
            <div className="flex flex-row gap-16 mb-4">
              <div className="flex-1">
                <label className="block">Engine Dent/Damage</label>
                <select
                  value={formData.engineDent}
                  onChange={(e) => handleInputChange(e, "engineDent")}
                  className="border border-gray-300 rounded px-3 py-2 w-full"
                >
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
              {formData.engineDent === "Yes" && (
                <div className="flex-1">
                  <label className="block">Notes</label>
                  <input
                    type="text"
                    value={formData.engineDentNotes}
                    onChange={(e) => handleInputChange(e, "engineDentNotes")}
                    className="border border-gray-300 rounded px-3 py-2 w-full"
                  />
                </div>
              )}
            </div>
            <div className="flex flex-row gap-16 mb-4">
              <div className="flex-1">
                <label className="block">Engine Oil Color</label>
                <select
                  value={formData.engineOilColor}
                  onChange={(e) => handleInputChange(e, "engineOilColor")}
                  className="border border-gray-300 rounded px-3 py-2 w-full"
                >
                  <option value="Clean">Clean</option>
                  <option value="Brown">Brown</option>
                  <option value="Black">Black</option>
                </select>
              </div>
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold mb-4">Brake Details</h3>
            <div className="flex flex-row gap-16 mb-4">
              <div className="flex-1">
                <label className="block">Brake Fluid Condition</label>
                <select
                  value={formData.brakeFluidCondition}
                  onChange={(e) => handleInputChange(e, "brakeFluidCondition")}
                  className="border border-gray-300 rounded px-3 py-2 w-full"
                >
                  <option value="Good">Good</option>
                  <option value="Bad">Bad</option>
                </select>
              </div>
              <div className="flex-1">
                <label className="block">Brake Fluid Color</label>
                <select
                  value={formData.brakeFluidColor}
                  onChange={(e) => handleInputChange(e, "brakeFluidColor")}
                  className="border border-gray-300 rounded px-3 py-2 w-full"
                >
                  <option value="Clean">Clean</option>
                  <option value="Brown">Brown</option>
                  <option value="Black">Black</option>
                </select>
              </div>
            </div>
            <div className="flex flex-row gap-16 mb-4">
              <div className="flex-1">
                <label className="block">Oil Leak in Engine</label>
                <select
                  value={formData.oilLeakEngine}
                  onChange={(e) => handleInputChange(e, "oilLeakEngine")}
                  className="border border-gray-300 rounded px-3 py-2 w-full"
                >
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-between mt-8">
          <button
            onClick={handlePrevious}
            className="bg-gray-500 text-white rounded px-4 py-2"
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            className="bg-blue-500 text-white rounded px-4 py-2"
          >
            Next
          </button>
        </div>
      </section>
    </main>
  );
};
const Bar = () => {
  return (
    <div className="max-w-xl mx-auto my-4 border-b-2 pb-4">
      <div className="flex pb-3">
        <div className="flex-1"></div>
        <div className="flex-1">
          <div className="w-10 h-10 bg-blue-400 mx-auto rounded-full text-lg text-white flex items-center">
            <span className="text-grey-darker text-center w-full">1</span>
          </div>
        </div>
        <div className="w-1/6 align-center items-center align-middle content-center flex">
          <div className="w-full bg-blue-400 rounded items-center align-middle align-center flex-1">
            <div
              className="bg-blue-400 text-xs leading-none py-1 text-center text-grey-darkest rounded"
              style={{ width: "100%" }}
            ></div>
          </div>
        </div>
        <div className="flex-1">
          <div className="w-10 h-10 bg-blue-400 mx-auto rounded-full text-lg text-white flex items-center">
            <span className="text-grey-darker text-center w-full">2</span>
          </div>
        </div>
        <div className="w-1/6 align-center items-center align-middle content-center flex">
          <div className="w-full bg-blue-400 rounded items-center align-middle align-center flex-1">
            <div
              className="bg-blue-400 text-xs leading-none py-1 text-center text-grey-darkest rounded"
              style={{ width: "20%" }}
            ></div>
          </div>
        </div>
        <div className="flex-1">
          <div className="w-10 h-10 bg-blue-400 border-2 border-grey-light mx-auto rounded-full text-lg text-white flex items-center">
            <span className="text-grey-darker text-center w-full">3</span>
          </div>
        </div>
        <div className="w-1/6 align-center items-center align-middle content-center flex">
          <div className="w-full bg-blue-400 rounded items-center align-middle align-center flex-1">
            <div
              className="bg-blue-400 text-xs leading-none py-1 text-center text-grey-darkest rounded "
              style={{ width: "0%" }}
            ></div>
          </div>
        </div>
        <div className="flex-1">
          <div className="w-10 h-10 bg-blue-400 border-2 border-grey-light mx-auto rounded-full text-lg text-white flex items-center">
            <span className="text-grey-darker text-center w-full">4</span>
          </div>
        </div>
        <div className="flex-1"></div>
      </div>
      <div className="flex text-xs content-center text-center">
      <div className="w-1/4">Tires</div>
            <div className="w-1/4">Battery</div>
            <div className="w-1/4">Exterior and Brakes</div>
            <div className="w-1/4">Engines</div>
      </div>
    </div>
  );
};
export default Engines;