import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { saveAs } from 'file-saver';
import { Document, Packer, Paragraph, TextRun } from 'docx';

const Init = () => {
  const [inspections, setInspections] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInspections = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/inspections");
        setInspections(response.data);
      } catch (error) {
        console.error("Error fetching inspection data:", error);
      }
    };

    fetchInspections(); 
  }, []);

  const handleDownload = (inspection) => {
    console.log(inspection.truck_serial_number + " this is inside the function");

    const doc = new Document({
      sections: [{
        children: [
          new Paragraph({
            children: [
              new TextRun({
                text: "Inspection Report",
                bold: true,
                size: 24
              })
            ],
            alignment: "center",
            spacing: {
              after: 200
            }
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `Truck Serial Number: ${inspection.truck_serial_number || 'N/A'}`
              })
            ]
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `Truck Model: ${inspection.truck_model || 'N/A'}`
              })
            ]
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `Inspector Name: ${inspection.inspector_name || 'N/A'}`
              })
            ]
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `Inspection Date: ${inspection.inspection_datetime ? new Date(inspection.inspection_datetime).toLocaleString() : 'N/A'}`
              })
            ]
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `Location: ${inspection.location || 'N/A'}`
              })
            ]
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `Customer Name: ${inspection.customer_name || 'N/A'}`
              })
            ]
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "Tires Details",
                bold: true,
                size: 20
              })
            ],
            spacing: {
              before: 200,
              after: 200
            }
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `Left Front Pressure: ${inspection.tires?.left_front_pressure || 'N/A'}`
              })
            ]
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `Right Front Pressure: ${inspection.tires?.right_front_pressure || 'N/A'}`
              })
            ]
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `Left Front Condition: ${inspection.tires?.left_front_condition || 'N/A'}`
              })
            ]
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `Right Front Condition: ${inspection.tires?.right_front_condition || 'N/A'}`
              })
            ]
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `Left Rear Pressure: ${inspection.tires?.left_rear_pressure || 'N/A'}`
              })
            ]
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `Right Rear Pressure: ${inspection.tires?.right_rear_pressure || 'N/A'}`
              })
            ]
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `Left Rear Condition: ${inspection.tires?.left_rear_condition || 'N/A'}`
              })
            ]
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `Right Rear Condition: ${inspection.tires?.right_rear_condition || 'N/A'}`
              })
            ]
          })
        ]
      }]
    });

    Packer.toBlob(doc).then(blob => {
      saveAs(blob, `${inspection.truck_serial_number || 'inspection'}_report.docx`);
    }).catch(error => {
      console.error("Error generating document:", error);
    });
  };

  const handleLanguageChange = (inspectionId, language) => {
    setSelectedLanguages({
      ...selectedLanguages,
      [inspectionId]: language
    });
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center py-10">
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
                      className="border border-gray-400 py-1 rounded"
                    >
                      <option value="">Select Language</option>
                      <option value="en">English</option>
                      <option value="ta">Tamil</option>
                      <option value="hi">Hindi</option>
                      <option value="te">Telugu</option>
                      <option value="kn">Kannada</option>
                    </select>
                  </td>
                  <td>
                    <button
                      className="bg-blue-500 text-white py-1 px-3 rounded"
                      onClick={() => handleDownload(inspection)} // Pass the entire inspection object to handleDownload
                    >
                      Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <button className="h-10 w-42 bg-blue-500 text-white mt-4 rounded items-center" onClick={() => navigate("/Create")}>
        Create One
      </button>
    </div>
  );
};

export default Init;
