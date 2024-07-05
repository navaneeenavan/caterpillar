import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const Engines = ({ truckId }) => {
  const [formData, setFormData] = useState({
    engineRust: "No",
    engineRustNotes: "",
    engineRustImages: null,
    engineDent: "No",
    engineDentNotes: "",
    engineDentImages: null,
    engineOilColor: "Clean",
    brakeFluidCondition: "Good",
    brakeFluidColor: "Clean",
    oilLeakEngine: "No",
    brakeImages: null,
  });

  const navigate = useNavigate();

  const handleInputChange = (e, fieldName) => {
    const value = e.target.type === "file" ? e.target.files[0] : e.target.value;
    setFormData({ ...formData, [fieldName]: value });
  };

  const handleSubmit = async () => {
    const areAllFieldsFilled = Object.values(formData).every(
      (field) => field !== "" && field !== null
    );

    if (!areAllFieldsFilled) {
      alert("Please fill all the fields.");
      return;
    }

    try {
      const formDataToSubmit = new FormData();
      for (const key in formData) {
        formDataToSubmit.append(key, formData[key]);
      }

      const response = await fetch(`/updateform1/${truckId}`, {
        method: "POST",
        body: formDataToSubmit,
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

  const handlePrevious = () => {
    // Navigate to the previous page
    navigate("/Brakes");
  };

  const handleNext = () => {
    // Navigate to the next page
    navigate("/next-page");
  };

  return (
    <main className="p-4">
      
      <Bar />
      <section className="w-full p-4">
        <div className="flex flex-col items-center mb-4">
          <h1 className="text-2xl font-bold text-blue-500">
            Engine & Brakes Inspection Form
          </h1>
          <div className="h-2 w-80 bg-blue-500 mt-2 mb-4"></div>
          <p className="text-base font-bold text-gray-600 mb-2">
            Truck ID: {truckId}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-bold mb-4">Engine Details</h3>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col">
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
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col">
                    <label className="block">Notes</label>
                    <input
                      type="text"
                      value={formData.engineRustNotes}
                      onChange={(e) => handleInputChange(e, "engineRustNotes")}
                      className="border border-gray-300 rounded px-3 py-2 w-full"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="block mt-2">Attach Images</label>
                    <input
                      type="file"
                      onChange={(e) => handleInputChange(e, "engineRustImages")}
                      className="border border-gray-300 rounded px-3 py-2 w-full"
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col">
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
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col">
                    <label className="block">Notes</label>
                    <input
                      type="text"
                      value={formData.engineDentNotes}
                      onChange={(e) => handleInputChange(e, "engineDentNotes")}
                      className="border border-gray-300 rounded px-3 py-2 w-full"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="block mt-2">Attach Images</label>
                    <input
                      type="file"
                      onChange={(e) => handleInputChange(e, "engineDentImages")}
                      className="border border-gray-300 rounded px-3 py-2 w-full"
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-col">
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

          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-bold mb-4">Brake Details</h3>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col">
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

              <div className="flex flex-col">
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

            <div className="flex flex-col">
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

            <div className="flex flex-col">
              <label className="block">Brake Images</label>
              <input
                type="file"
                onChange={(e) => handleInputChange(e, "brakeImages")}
                className="border border-gray-300 rounded px-3 py-2 w-full"
              />
            </div>
          </div>
        </div>

        <div className="flex w-full mt-32 justify-between space-x-96">
          <button
            onClick={handlePrevious}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
          >
            Previous
          </button>
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
        <div className="w-1/4">Tire</div>
        <div className="w-1/4">Battery</div>
        <div className="w-1/4">Application details</div>
        <div className="w-1/4">Confirmation</div>
      </div>
    </div>
  );
};

export default Engines;
