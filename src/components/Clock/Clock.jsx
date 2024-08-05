import React, { useState, useEffect } from "react";

const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4 bg-white shadow rounded-lg text-center">
      <h3 className="text-xl font-bold mb-2">Current Time</h3>
      <div className="text-2xl">
        <div>{time.toLocaleDateString()}</div>
        <div>{time.toLocaleTimeString()}</div>
      </div>
    </div>
  );
};

export default Clock;
