import React from "react";

const CorporateGuidelines = () => {
  const guidelines = [
    { title: "Flexisales HR Policies", date: "17-Apr-23" },
    // Add more guidelines as necessary
  ];

  return (
    <div className="p-4 bg-gradient-to-r from-gray-100  to-gray-300   border-2 border-black shadow-lg rounded-lg">
      <h3 className="text-xl font-bold mb-4">Corporate Guidelines</h3>
      {guidelines.map((guideline, index) => (
        <div key={index} className="mb-2">
          <span className="text-green-500">{guideline.title}</span>
          <span className="text-gray-500"> - Updated {guideline.date}</span>
        </div>
      ))}
    </div>
  );
};

export default CorporateGuidelines;
