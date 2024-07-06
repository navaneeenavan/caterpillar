import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";

const TireInspectionForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { response } = location.state || {};
  const truckSerialNumber =
    response?.tire_info?.truck_serial_number || "";

  const initialFormData = {
    left_front_condition: "New",
    left_front_pressure: 35,
    left_rear_condition: "Worn",
    left_rear_pressure: 38,
    right_front_condition: "Bad",
    right_front_pressure: 36,
    right_rear_condition: "Worn",
    right_rear_pressure: 40,
  };

  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    if (response && response.tire_info) {
      setFormData({
        left_front_condition:
        response?.tire_info?.left_front_condition || "New",
        left_front_pressure:
        response?.tire_info?.left_front_pressure || 35,
        left_rear_condition:
        response?.tire_info?.left_rear_condition || "Worn",
        left_rear_pressure:
        response?.tire_info?.left_rear_pressure || 38,
        right_front_condition:
        response?.tire_info?.right_front_condition || "Bad",
        right_front_pressure:
        response?.tire_info?.right_front_pressure || 36,
        right_rear_condition:
        response?.tire_info?.right_rear_condition || "Worn",
        right_rear_pressure:
        response?.tire_info?.right_rear_pressure || 40,
      });
    }
  }, [response]);

  const handleInputChange = (e, fieldName) => {
    const value = e.target.type === "file" ? e.target.files[0] : e.target.value;
    setFormData({
      ...formData,
      [fieldName]: value,
    });
  };

  const handlePrevious = () => {
    navigate("/Init"); // Adjust this to navigate to the previous step
  };

  const handleNext = async () => {
    try {
      const result = await axios.post(
        `http://127.0.0.1:5000/api/truck-inspections/update-tires/${truckSerialNumber}`,
        {
          tire_jinfo: formData,
        }
      );

      if (result.status === 200) {
        toast.success("Tire inspection information updated successfully!");
        navigate("/BatteryForms"); // Adjust this to navigate to the next step
      } else {
        toast.error("Failed to update tire inspection information.");
      }
    } catch (error) {
      toast.error(
        "An error occurred while updating the tire inspection information."
      );
      console.error("Error:", error);
    }
  };

  return (
    <main className="p-4 flex flex-col">
      {/* Replace Bar component with your progress bar component */}
      <Bar />
      <button
            className="h-20 w-36 bg-blue-500 text-white"
            onClick={() => navigate("/Tire")}
          >
            Speak UP
          </button>
      <section className="w-full p-4">
        <div className="flex flex-col items-center mb-4">
          <h1 className="text-2xl font-bold text-blue-500">
            Tire Inspection Form
          </h1>
          <div className="h-2 w-80 bg-blue-500 mt-2 mb-4"></div>
          <p className="text-base font-bold text-gray-600 mb-2">
            Truck Serial Number: {truckSerialNumber}
          </p>
        </div>
        <div className="flex flex-row gap-24">
          <div className="flex-1">
            <h3 className="text-lg font-bold mb-4">Left Front Tire</h3>
            <div className="flex flex-row gap-16 mb-4">
              <div className="flex-1">
                <label className="block">Condition</label>
                <select
                  value={formData.left_front_condition || ""}
                  onChange={(e) => handleInputChange(e, "left_front_condition")}
                  className="border border-gray-300 rounded px-3 py-2 w-full"
                >
                  <option value="New">New</option>
                  <option value="Worn">Worn</option>
                  <option value="Bad">Bad</option>
                </select>
              </div>
              <div className="flex-1">
                <label className="block">Pressure</label>
                <input
                  type="text"
                  value={formData.left_front_pressure || ""}
                  onChange={(e) => handleInputChange(e, "left_front_pressure")}
                  className="border border-gray-300 rounded px-3 py-2 w-full"
                />
              </div>
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold mb-4">Left Rear Tire</h3>
            <div className="flex flex-row gap-16 mb-4">
              <div className="flex-1">
                <label className="block">Condition</label>
                <select
                  value={formData.left_rear_condition || ""}
                  onChange={(e) => handleInputChange(e, "left_rear_condition")}
                  className="border border-gray-300 rounded px-3 py-2 w-full"
                >
                  <option value="New">New</option>
                  <option value="Worn">Worn</option>
                  <option value="Bad">Bad</option>
                </select>
              </div>
              <div className="flex-1">
                <label className="block">Pressure</label>
                <input
                  type="text"
                  value={formData.left_rear_pressure || ""}
                  onChange={(e) => handleInputChange(e, "left_rear_pressure")}
                  className="border border-gray-300 rounded px-3 py-2 w-full"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-24">
          <div className="flex-1">
            <h3 className="text-lg font-bold mb-4">Right Front Tire</h3>
            <div className="flex flex-row gap-16 mb-4">
              <div className="flex-1">
                <label className="block">Condition</label>
                <select
                  value={formData.right_front_condition || ""}
                  onChange={(e) =>
                    handleInputChange(e, "right_front_condition")
                  }
                  className="border border-gray-300 rounded px-3 py-2 w-full"
                >
                  <option value="New">New</option>
                  <option value="Worn">Worn</option>
                  <option value="Bad">Bad</option>
                </select>
              </div>
              <div className="flex-1">
                <label className="block">Pressure</label>
                <input
                  type="text"
                  value={formData.right_front_pressure || ""}
                  onChange={(e) => handleInputChange(e, "right_front_pressure")}
                  className="border border-gray-300 rounded px-3 py-2 w-full"
                />
              </div>
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold mb-4">Right Rear Tire</h3>
            <div className="flex flex-row gap-16 mb-4">
              <div className="flex-1">
                <label className="block">Condition</label>
                <select
                  value={formData.right_rear_condition || ""}
                  onChange={(e) => handleInputChange(e, "right_rear_condition")}
                  className="border border-gray-300 rounded px-3 py-2 w-full"
                >
                  <option value="New">New</option>
                  <option value="Worn">Worn</option>
                  <option value="Bad">Bad</option>
                </select>
              </div>
              <div className="flex-1">
                <label className="block">Pressure</label>
                <input
                  type="text"
                  value={formData.right_rear_pressure || ""}
                  onChange={(e) => handleInputChange(e, "right_rear_pressure")}
                  className="border border-gray-300 rounded px-3 py-2 w-full"
                />
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

export default TireInspectionForm;
