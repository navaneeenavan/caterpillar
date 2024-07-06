import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Init = () => {
  const [inspections, setInspections] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    // Fetching data from the backend
    const fetchInspections = async () => {
      try {
        const finalData = await axios.get("http://127.0.0.1:5000/inspections");
        setInspections(finalData.data); 
      } catch (error) {
        console.error("Error fetching inspection data:", error);
      }
    };

    fetchInspections();
  }, []);

  const handleDownload = (inspectionId) => {
    // Implement the PDF download logic here
  };

  const handleLanguageChange = (inspectionId, language) => {
    setSelectedLanguages({
      ...selectedLanguages,
      [inspectionId]: language
    });
  };
  
  return (
    <div className="w-full min-h-screen  flex flex-col items-center justify-center py-10">
      <div className="bg-white py-8 px-4 rounded-lg shadow-lg w-full max-w-5xl">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-700">Inspection Records</h1>
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2 text-left text-gray-600">Truck Serial Number</th>
                <th className="px-4 py-2 text-left text-gray-600">Truck Model</th>
                <th className="px-4 py-2 text-left text-gray-600">Inspector Name</th>
                <th className="px-4 py-2 text-left text-gray-600">Inspection Date</th>
                <th className="px-4 py-2 text-left text-gray-600">Location</th>
                <th className="px-4 py-2 text-left text-gray-600">Customer Name</th>
                <th className="px-4 py-2 text-left text-gray-600">Language</th>
                <th className="px-4 py-2 text-left text-gray-600">Action</th>
              </tr>
            </thead>
            <tbody>
              {inspections.map((inspection) => (
                <tr key={inspection.id} className="border-b">
                  <td className="px-4 py-2">{inspection.truck_serial_number}</td>
                  <td className="px-4 py-2">{inspection.truck_model}</td>
                  <td className="px-4 py-2">{inspection.inspector_name}</td>
                  <td className="px-4 py-2">{new Date(inspection.inspection_datetime).toLocaleString()}</td>
                  <td className="px-4 py-2">{inspection.location}</td>
                  <td className="px-4 py-2">{inspection.customer_name}</td>
                  <td className="px-2 py-2">
                    <select
                      value={selectedLanguages[inspection.id] || ""}
                      onChange={(e) => handleLanguageChange(inspection.id, e.target.value)}
                      className="border border-gray-400  py-1 rounded"
                    >
                      <option value="">Select Language</option>
                      <option value="en">English</option>
                      <option value="ta">Tamil</option>
                      <option value="hi">Hindi</option>
                      <option value="te">Telugu</option>
                      <option value="kn">Kannada</option>
                      {/* Add more languages as needed */}
                    </select>
                  </td>
                  <td >
                  Download
                   </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <button className="h-10 w-42 bg-blue-500 text-white mt-4 rounded items-center" onClick={()=>{
                    navigate("/Create")
                  }}>
        Create One
      </button>
    </div>
  );
};

export default Init;
