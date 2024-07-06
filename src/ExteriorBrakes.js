    // 

    import React, { useState, useEffect } from "react";
    import { useNavigate, useLocation } from "react-router-dom";
    import { toast } from "react-hot-toast";
    import axios from "axios";
    
    const BrakesAndExterior = () => {
      const location = useLocation();
      const navigate = useNavigate();
      const { response } = location.state || {};
      console.log(response);  
      const truckSerialNumber = response?.brakes_and_exterior_info
      .truck_serial_number || "";

      console.log(response);
    
      // Initialize formData with default values or from response if available
      const initialFormData = {
        attached_images: [],
        brake_overall_summary: "Brakes in acceptable condition",
        dent: false,
        emergency_brake: "Functional",
        front_brake_condition: "Good",
        oil_leak_in_suspension: false,
        rear_brake_condition: "Fair",
        rust: false,
        brake_fluid_level: 10,
      };
    
      const [formData, setFormData] = useState(initialFormData);
      
    
      useEffect(() => {
        if (response && response.brakes_and_exterior_info
        ) {
          setFormData({
            attached_images: response.brakes_and_exterior_info
            .attached_images || [],
            brake_fluid_level: response?.brakes_and_exterior_info
            ?.brake_fluid_level || 10,
            brake_overall_summary:
              response.brakes_and_exterior_info
              .brake_overall_summary ||
              "Brakes in acceptable condition",
            dent: response.brakes_and_exterior_info
            .dent || false,
            emergency_brake:
              response.brakes_and_exterior_info
              .emergency_brake || "Functional",
            front_brake_condition:
              response.brakes_and_exterior_info
              .front_brake_condition || "Good",
            oil_leak_in_suspension:
              response.brakes_and_exterior_info
              .oil_leak_in_suspension || false,
            rear_brake_condition:
              response.brakes_and_exterior_info
              .rear_brake_condition || "Fair",
            rust: response.brakes_and_exterior_info
            .rust || false,
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
        // Navigate to the previous page
        navigate("/Battery");
      };
    
      const handleNext = async () => {
        // Post request to update brakes and exterior information
        try {
          const result = await axios.post(
            `http://127.0.0.1:5000/api/truck-inspections/update-brakes-and-exterior/${truckSerialNumber}`,
            {
              brakes_and_exterior: formData,
            }
          );
    
          if (result.status === 200) {
            toast.success("Brakes and Exterior information updated successfully!");
            navigate("/Engines");
          } else {
            toast.error("Failed to update Brakes and Exterior information.");
          }
        } catch (error) {
          toast.error(
            "An error occurred while updating the Brakes and Exterior information."
          );
          console.error("Error:", error);
        }
      };
    
      return (
        <main className="p-4 flex flex-col">
          <Bar />
          <button
            className="h-20 w-36 bg-blue-500 text-white"
            onClick={() => navigate("/BrakesLanding")}
          >
            Speak UP
          </button>
          <section className="w-full p-4">
            <div className="flex flex-col items-center mb-4">
              <h1 className="text-2xl font-bold text-blue-500">
                Brakes and Exterior Inspection Form
              </h1>
              <div className="h-2 w-80 bg-blue-500 mt-2 mb-4"></div>
              <p className="text-base font-bold text-gray-600 mb-2">
                Truck Serial Number: {truckSerialNumber}
              </p>
            </div>
            <div className="flex flex-row gap-24">
              <div className="flex-1">
                <h3 className="text-lg font-bold mb-4">Brakes Details</h3>
                <div className="flex flex-row gap-16 mb-4">
                  <div className="flex-1">
                    <label className="block">Brake Fluid Level</label>
                    <input
                      type="text"
                      value={formData.brake_fluid_level || ""}
                      onChange={(e) => handleInputChange(e, "brake_fluid_level")}
                      className="border border-gray-300 rounded px-3 py-2 w-full"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block">Emergency Brake</label>
                    <select
                      value={formData.emergency_brake || ""}
                      onChange={(e) => handleInputChange(e, "emergency_brake")}
                      className="border border-gray-300 rounded px-3 py-2 w-full"
                    >
                      <option value="Functional">Functional</option>
                      <option value="Needs Repair">Needs Repair</option>
                    </select>
                  </div>
                </div>
                <div className="flex flex-row gap-16 mb-4">
                  <div className="flex-1">
                    <label className="block">Front Brake Condition</label>
                    <select
                      value={formData.front_brake_condition || ""}
                      onChange={(e) => handleInputChange(e, "front_brake_condition")}
                      className="border border-gray-300 rounded px-3 py-2 w-full"
                    >
                      <option value="Good">Good</option>
                      <option value="Fair">Fair</option>
                      <option value="Needs Replacement">Needs Replacement</option>
                    </select>
                  </div>
                  <div className="flex-1">
                    <label className="block">Rear Brake Condition</label>
                    <select
                      value={formData.rear_brake_condition || ""}
                      onChange={(e) => handleInputChange(e, "rear_brake_condition")}
                      className="border border-gray-300 rounded px-3 py-2 w-full"
                    >
                      <option value="Good">Good</option>
                      <option value="Fair">Fair</option>
                      <option value="Needs Replacement">Needs Replacement</option>
                    </select>
                  </div>
                </div>
                <div className="flex flex-row gap-16 mb-4">
                  <div className="flex-1">
                    <label className="block">Brake Overall Summary</label>
                    <input
                      type="text"
                      value={formData.brake_overall_summary || ""}
                      onChange={(e) =>
                        handleInputChange(e, "brake_overall_summary")
                      }
                      className="border border-gray-300 rounded px-3 py-2 w-full"
                    />
                  </div>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold mb-4">Exterior Details</h3>
                <div className="flex flex-row gap-16 mb-4">
                  <div className="flex-1">
                    <label className="block">Dent or Damage</label>
                    <select
                      value={formData.dent ? "Yes" : "No"}
                      onChange={(e) => handleInputChange(e, "dent")}
                      className="border border-gray-300 rounded px-3 py-2 w-full"
                    >
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>
                  {formData.dent && (
                    <div className="flex-1">
                      <label className="block">Notes</label>
                      <input
                        type="text"
                        value={formData.dentNotes || ""}
                        onChange={(e) => handleInputChange(e, "dentNotes")}
                        className="border border-gray-300 rounded px-3 py-2 w-full"
                      />
                    </div>
                  )}
                </div>
                <div className="flex flex-row gap-16 mb-4">
                  <div className="flex-1">
                    <label className="block">Rust</label>
                    <select
                      value={formData.rust ? "Yes" : "No"}
                      onChange={(e) => handleInputChange(e, "rust")}
                      className="border border-gray-300 rounded px-3 py-2 w-full"
                    >
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>
                </div>
                <div className="flex flex-row gap-16 mb-4">
                  <div className="flex-1">
                    <label className="block">Oil Leak in Suspension</label>
                    <select
                      value={formData.oil_leak_in_suspension ? "Yes" : "No"}
                      onChange={(e) =>
                        handleInputChange(e, "oil_leak_in_suspension")
                      }
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
    
    export default BrakesAndExterior;
    