import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const Forms = ({ truckId }) => {
  const [formData, setFormData] = useState({
    tirePressureLeftFront: "",
    tirePressureRightFront: "",
    tireConditionLeftFront: "Good",
    tireConditionRightFront: "Good",
    tirePressureLeftRear: "",
    tirePressureRightRear: "",
    tireConditionLeftRear: "Good",
    tireConditionRightRear: "Good",
    tireImages: Array(4).fill(null), // Array to hold 4 tire images (0: Left Front, 1: Right Front, 2: Left Rear, 3: Right Rear)
  });

  const navigate = useNavigate();

  const handleInputChange = (e, fieldName) => {
    setFormData({
      ...formData,
      [fieldName]: e.target.value,
    });
  };

  const handleImageUpload = (e, index) => {
    const file = e.target.files[0];
    const newImages = [...formData.tireImages];
    newImages[index] = file;
    setFormData({
      ...formData,
      tireImages: newImages,
    });
  };

  const handleSubmit = async () => {
    try {
      // Simulate API call for updating form
      // http://127.0.0.1:5000/api/truck-inspections/update-battery/7301234
      const response = await fetch(`http://127.0.0.1:5000/api/truck-inspections/update-battery/${truckId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form.");
      }

      toast.success("Form submitted successfully!");
      navigate("/success");
    } catch (error) {
      console.error("Error submitting form:", error.message);
      toast.error("Failed to submit form. Please try again later.");
    }
  };


  const handleNext = () => {
    navigate("BatteryForms");
  };

  return (
    <main className="p-4 flex flex-col">
      <Bar/>
      <section className="w-full p-4">
        <div className="flex flex-col items-center mb-4 w-full">
          <h1 className="text-2xl font-bold text-blue-500">Tire Inspection Form</h1>
          <div className="h-2 w-80 bg-blue-500 mt-2 mb-4"></div>
          <p className="text-base font-bold text-gray-600 mb-2 flex justify-start-start">Truck ID: {truckId}</p>
        </div>
        <div className="flex flex-row gap-24">
          <div className="flex-1">
            <h3 className="text-lg font-bold mb-4">Front Tires</h3>
            <div className="flex flex-row gap-16 mb-4">
              <div className="flex-1">
                <label className="block">Tire Pressure (Left Front)</label>
                <input
                  type="text"
                  value={formData.tirePressureLeftFront}
                  onChange={(e) => handleInputChange(e, "tirePressureLeftFront")}
                  className="border border-gray-300 rounded px-3 py-2 w-full"
                />
              </div>
              <div className="flex-1">
                <label className="block">Tire Pressure (Right Front)</label>
                <input
                  type="text"
                  value={formData.tirePressureRightFront}
                  onChange={(e) => handleInputChange(e, "tirePressureRightFront")}
                  className="border border-gray-300 rounded px-3 py-2 w-full"
                />
              </div>
            </div>
            <div className="flex flex-row gap-16 mb-4">
              <div className="flex-1">
                <label className="block">Tire Condition (Left Front)</label>
                <select
                  value={formData.tireConditionLeftFront}
                  onChange={(e) => handleInputChange(e, "tireConditionLeftFront")}
                  className="border border-gray-300 rounded px-3 py-2 w-full"
                >
                  <option value="Good">Good</option>
                  <option value="Ok">Ok</option>
                  <option value="Needs Replacement">Needs Replacement</option>
                </select>
              </div>
              <div className="flex-1">
                <label className="block">Tire Condition (Right Front)</label>
                <select
                  value={formData.tireConditionRightFront}
                  onChange={(e) => handleInputChange(e, "tireConditionRightFront")}
                  className="border border-gray-300 rounded px-3 py-2 w-full"
                >
                  <option value="Good">Good</option>
                  <option value="Ok">Ok</option>
                  <option value="Needs Replacement">Needs Replacement</option>
                </select>
              </div>
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold mb-4">Rear Tires</h3>
            <div className="flex flex-row gap-16 mb-4">
              <div className="flex-1">
                <label className="block">Tire Pressure (Left Rear)</label>
                <input
                  type="text"
                  value={formData.tirePressureLeftRear}
                  onChange={(e) => handleInputChange(e, "tirePressureLeftRear")}
                  className="border border-gray-300 rounded px-3 py-2 w-full"
                />
              </div>
              <div className="flex-1">
                <label className="block">Tire Pressure (Right Rear)</label>
                <input
                  type="text"
                  value={formData.tirePressureRightRear}
                  onChange={(e) => handleInputChange(e, "tirePressureRightRear")}
                  className="border border-gray-300 rounded px-3 py-2 w-full"
                />
              </div>
            </div>
            <div className="flex flex-row gap-16 mb-4">
              <div className="flex-1">
                <label className="block">Tire Condition (Left Rear)</label>
                <select
                  value={formData.tireConditionLeftRear}
                  onChange={(e) => handleInputChange(e, "tireConditionLeftRear")}
                  className="border border-gray-300 rounded px-3 py-2 w-full"
                >
                  <option value="Good">Good</option>
                  <option value="Ok">Ok</option>
                  <option value="Needs Replacement">Needs Replacement</option>
                </select>
              </div>
              <div className="flex-1">
                <label className="block">Tire Condition (Right Rear)</label>
                <select
                  value={formData.tireConditionRightRear}
                  onChange={(e) => handleInputChange(e, "tireConditionRightRear")}
                  className="border border-gray-300 rounded px-3 py-2 w-full"
                >
                  <option value="Good">Good</option>
                  <option value="Ok">Ok</option>
                  <option value="Needs Replacement">Needs Replacement</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8">
          <h3 className="text-lg font-bold mb-4">Upload Tire Images</h3>
          <div className="flex flex-row gap-16 mb-4">
            <div className="flex-1">
              <label className="block">Left Front</label>
              <input
                type="file"
                onChange={(e) => handleImageUpload(e, 0)}
                accept="image/*"
                className="border border-gray-300 rounded px-3 py-2 w-full"
              />
            </div>
            <div className="flex-1">
              <label className="block">Right Front</label>
              <input
                type="file"
                onChange={(e) => handleImageUpload(e, 1)}
                accept="image/*"
                className="border border-gray-300 rounded px-3 py-2 w-full"
              />
            </div>
            <div className="flex-1">
              <label className="block">Left Rear</label>
              <input
                type="file"
                onChange={(e) => handleImageUpload(e, 2)}
                accept="image/*"
                className="border border-gray-300 rounded px-3 py-2 w-full"
              />
            </div>
            <div className="flex-1">
              <label className="block">Right Rear</label>
              <input
                type="file"
                onChange={(e) => handleImageUpload(e, 3)}
                accept="image/*"
                className="border border-gray-300 rounded px-3 py-2 w-full"
              />
            </div>
          </div>
        </div>
        <div className="flex w-full mt-32 justify-between space-x-96">
          <button
            onClick={handleNext}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
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
            <div className="w-full border-2 border-gray-200 bg-grey-light rounded items-center align-middle align-center flex-1">
              <div className=" text-xs leading-none py-1 text-center text-grey-darkest rounded" style={{ width: '0%' }}></div>
            </div>
          </div>
          <div className="flex-1">
          <div className="w-10 h-10 bg-white border-2 border-grey-light mx-auto rounded-full text-lg text-gray-500 flex items-center">
            <span className="text-grey-darker text-center w-full">2</span>
            </div>
          </div>
          <div className="w-1/6 align-center items-center align-middle content-center flex">
            <div className="w-full border-2 border-gray-200 bg-grey-light rounded items-center align-middle align-center flex-1">
              <div className=" text-xs leading-none py-1 text-center text-grey-darkest rounded" style={{ width: '0%' }}></div>
            </div>
          </div>
          <div className="flex-1">
            <div className="w-10 h-10 bg-white border-2 border-grey-light mx-auto rounded-full text-lg text-gray-500 flex items-center">
              <span className="text-grey-darker text-center w-full">3</span>
            </div>
          </div>
          <div className="w-1/6 align-center items-center align-middle content-center flex">
            <div className="w-full border-2 border-gray-200 bg-grey-light rounded items-center align-middle align-center flex-1">
              <div className=" text-xs leading-none py-1 text-center text-grey-darkest rounded" style={{ width: '0%' }}></div>
            </div>
          </div>
          <div className="flex-1">
            <div className="w-10 h-10 bg-white border-2 border-grey-light mx-auto rounded-full text-lg text-gray-500 flex items-center">
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
export default Forms;
