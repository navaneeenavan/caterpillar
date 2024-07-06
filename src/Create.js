
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";

const NewUser = () => {
  const [truckId, setTruckId] = useState("");
  const [inspectionId, setInspectionId] = useState(1); // Auto-incremented unique number
  const [formData, setFormData] = useState({
    truck_serial_number: "",
    truck_model: "",
    inspector_name: "",
    inspection_employee_id: "",
    inspection_datetime: "",
    location: "",
    geo_coordinates: "",
    service_meter_hours: "",
    inspector_signature: "",
    customer_name: "",
    cat_customer_id: "",
  });

  const navigate = useNavigate();

  // Function to get current date and time
  const getCurrentDateTime = () => {
    const now = new Date();
    return now.toISOString().slice(0, 16); // Format as "YYYY-MM-DDTHH:MM"
  };

  // Function to get current location (geo-coordinates)
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const coords = `${position.coords.latitude},${position.coords.longitude}`;
        setFormData((prevData) => ({
          ...prevData,
          geo_coordinates: coords,
        }));
      });
    } else {
      toast.error("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      inspection_datetime: getCurrentDateTime(),
    }));
    getLocation();
  }, []);

  const handleInputChange = (e, fieldName) => {
    setFormData({
      ...formData,
      [fieldName]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://127.0.0.1:5000/updateform/${truckId}`,
        formData
      );

      if (response.status !== 200) {
        throw new Error("Failed to submit form.");
      }

      toast.success("Form submitted successfully!");
      setInspectionId((prevId) => prevId + 1); // Increment Inspection ID
      navigate("/Tire");
    } catch (error) {
      console.error("Error submitting form:", error.message);
      toast.error("Failed to submit form. Please try again later.");
    }
  };

  return (
    <main className="p-4 flex flex-col">
      <section className="w-full p-4">
        <div className="flex flex-col items-center mb-4 w-full">
          <h1 className="text-2xl font-bold text-blue-500">Truck Inspection Form</h1>
          <div className="h-2 w-80 bg-blue-500 mt-2 mb-4"></div>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block font-bold">Truck ID:</label>
            <input
              type="text"
              value={truckId}
              onChange={(e) => setTruckId(e.target.value)}
              className="border border-gray-300 rounded px-3 py-4 w-full text-xl"
              placeholder="Enter Truck ID"
              required
            />
          </div>
          <div>
            <label className="block font-bold">Inspection ID: {inspectionId}</label>
          </div>
          <div>
            <label className="block">Truck Serial Number:</label>
            <input
              type="text"
              value={formData.truck_serial_number}
              onChange={(e) => handleInputChange(e, "truck_serial_number")}
              className="border border-gray-300 rounded px-3 py-2 w-full"
              placeholder="e.g., 7301234, 730EJ73245"
              required
            />
          </div>
          <div>
            <label className="block">Truck Model:</label>
            <input
              type="text"
              value={formData.truck_model}
              onChange={(e) => handleInputChange(e, "truck_model")}
              className="border border-gray-300 rounded px-3 py-2 w-full"
              placeholder="e.g., 730, 730 EJ"
              required
            />
          </div>
          <div>
            <label className="block">Inspector Name:</label>
            <input
              type="text"
              value={formData.inspector_name}
              onChange={(e) => handleInputChange(e, "inspector_name")}
              className="border border-gray-300 rounded px-3 py-2 w-full"
              required
            />
          </div>
          <div>
            <label className="block">Inspection Employee ID:</label>
            <input
              type="text"
              value={formData.inspection_employee_id}
              onChange={(e) => handleInputChange(e, "inspection_employee_id")}
              className="border border-gray-300 rounded px-3 py-2 w-full"
              required
            />
          </div>
          <div>
            <label className="block">Date & Time of Inspection:</label>
            <input
              type="datetime-local"
              value={formData.inspection_datetime}
              onChange={(e) => handleInputChange(e, "inspection_datetime")}
              className="border border-gray-300 rounded px-3 py-2 w-full"
              required
              readOnly
            />
          </div>
          <div>
            <label className="block">Location of Inspection:</label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => handleInputChange(e, "location")}
              className="border border-gray-300 rounded px-3 py-2 w-full"
              required
            />
          </div>
          <div>
            <label className="block">Geo Coordinates of Inspection:</label>
            <input
              type="text"
              value={formData.geo_coordinates}
              onChange={(e) => handleInputChange(e, "geo_coordinates")}
              className="border border-gray-300 rounded px-3 py-2 w-full"
              required
              readOnly
            />
          </div>
          <div>
            <label className="block">Service Meter Hours (Odometer Reading):</label>
            <input
              type="number"
              value={formData.service_meter_hours}
              onChange={(e) => handleInputChange(e, "service_meter_hours")}
              className="border border-gray-300 rounded px-3 py-2 w-full"
              required
            />
          </div>
          <div>
            <label className="block">Inspector Signature:</label>
            <input
              type="text"
              value={formData.inspector_signature}
              onChange={(e) => handleInputChange(e, "inspector_signature")}
              className="border border-gray-300 rounded px-3 py-2 w-full"
              required
            />
          </div>
          <div>
            <label className="block">Customer Name / Company Name:</label>
            <input
              type="text"
              value={formData.customer_name}
              onChange={(e) => handleInputChange(e, "customer_name")}
              className="border border-gray-300 rounded px-3 py-2 w-full"
              required
            />
          </div>
          <div>
            <label className="block">CAT Customer ID:</label>
            <input
              type="text"
              value={formData.cat_customer_id}
              onChange={(e) => handleInputChange(e, "cat_customer_id")}
              className="border border-gray-300 rounded px-3 py-2 w-full"
              required
            />
          </div>
          <div className="flex justify-between mt-4">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
            >
              Submit
            </button>
            <button
              onClick={() => navigate("/Tire")}
              className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition duration-300"
            >
              Next
            </button>
          </div>
        </form>
      </section>
    </main>
  );
};

export default NewUser;
