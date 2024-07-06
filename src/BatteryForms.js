  import React, { useState, useEffect } from "react";
  import { useNavigate, useLocation } from "react-router-dom";
  import { toast } from "react-hot-toast";
  import axios from "axios";

  const BatteryForms = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { response } = location.state || {};
    const truckSerialNumber = response?.battery_info.truck_serial_number || "";

    const [formData, setFormData] = useState({
      make: response?.battery_info.battery_make || "",
      replacement_date: response?.battery_info.battery_replacement_date || "",
      voltage: response?.battery_info.battery_voltage || "",
      water_level: response?.battery_info.battery_water_level || "Good",
      water_level: response?.battery_info.condition_of_battery || "Yes",
      leak_or_rust: response?.battery_info.any_leak || "Yes",
    });

    useEffect(() => {
      if (response) {
        setFormData({
          make: response.battery_info.battery_make || "",
          replacementDate: response.battery_info.battery_replacement_date || "",
          voltage: response.battery_info.battery_voltage || "",
          water_level: response.battery_info.battery_water_level || "Good",
          water_level: response.battery_info.condition_of_battery || "Yes",
          batteryLeak: response.battery_info.any_leak || "Yes",
          batteryRust: response.battery_info.any_rust || "Yes",
        });
      }
    }, [response]);

    const handleInputChange = (e, fieldName) => {
      setFormData({
        ...formData,
        [fieldName]: e.target.value,
      });
    };

    console.log(formData)
    

    const handlePrevious = () => {
      // Navigate to the previous page
      navigate("/");
    };

    const handleNext = async () => {
      // Post request to update battery information
      try {
        const result = await axios.post(`http://127.0.0.1:5000/api/truck-inspections/update-battery/${truckSerialNumber}`, {
          battery: formData,
        });
        
        if (result.status === 200) {
          toast.success("Battery information updated successfully!");
          navigate("/Brakes");
        } else {
          toast.error("Failed to update battery information.");
        }
      } catch (error) {
        toast.error("An error occurred while updating the battery information.");
        console.error("Error:", error);
      }
      
    };

    return (
      <main className="p-4 flex flex-col">
        <Bar />
        <section className="w-full p-4">
          <div className="flex flex-col items-center mb-4">
            <h1 className="text-2xl font-bold text-blue-500">Battery Inspection Form</h1>
            <div className="h-2 w-80 bg-blue-500 mt-2 mb-4"></div>
            <p className="text-base font-bold text-gray-600 mb-2">Truck Serial Number: {truckSerialNumber}</p>
          </div>
          <div className="flex flex-row gap-24">
            <div className="flex-1">
              <h3 className="text-lg font-bold mb-4">Battery Details</h3>
              <div className="flex flex-row gap-16 mb-4">
                <div className="flex-1">
                  <label className="block">Battery Make</label>
                  <input
                    type="text"
                    value={formData.make}
                    onChange={(e) => handleInputChange(e, "make")}
                    className="border border-gray-300 rounded px-3 py-2 w-full"
                  />
                </div>
                <div className="flex-1">
                  <label className="block">Replacement Date</label>
                  <input
                    type="date"
                    value={formData.replacementDate}
                    onChange={(e) => handleInputChange(e, "replacementDate")}
                    className="border border-gray-300 rounded px-3 py-2 w-full"
                  />
                </div>
              </div>
              <div className="flex flex-row gap-16 mb-4">
                <div className="flex-1">
                  <label className="block">Battery Voltage</label>
                  <input
                    type="text"
                    value={formData.voltage}
                    onChange={(e) => handleInputChange(e, "voltage")}
                    className="border border-gray-300 rounded px-3 py-2 w-full"
                  />
                </div>
                <div className="flex-1">
                  <label className="block">Battery Water Level</label>
                  <select
                    value={formData. water_level}
                    onChange={(e) => handleInputChange(e, " water_level")}
                    className="border border-gray-300 rounded px-3 py-2 w-full"
                  >
                    <option value="Good">Good</option>
                    <option value="Ok">Ok</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              </div>
              <div className="flex flex-row gap-16 mb-4">
                <div className="flex-1">
                  <label className="block">Condition of Battery</label>
                  <select
                    value={formData. water_level}
                    onChange={(e) => handleInputChange(e, " water_level")}
                    className="border border-gray-300 rounded px-3 py-2 w-full"
                  >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
                <div className="flex-1">
                  <label className="block">Any Leak</label>
                  <select
                    value={formData.batteryLeak}
                    onChange={(e) => handleInputChange(e, "batteryLeak")}
                    className="border border-gray-300 rounded px-3 py-2 w-full"
                  >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
              </div>
              <div className="flex flex-row gap-16 mb-4">
                <div className="flex-1">
                  <label className="block">Any Rust</label>
                  <select
                    value={formData.batteryRust}
                    onChange={(e) => handleInputChange(e, "batteryRust")}
                    className="border border-gray-300 rounded px-3 py-2 w-full"
                  >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
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
                <div className="bg-blue-400 text-xs leading-none py-1 text-center text-grey-darkest rounded" style={{ width: '100%' }}></div>
              </div>
            </div>
            <div className="flex-1">
            <div className="w-10 h-10 bg-blue-400 mx-auto rounded-full text-lg text-white flex items-center">
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
  export default BatteryForms;
