import React, { useState, useEffect } from "react";
import axios from "axios";
import Report from "./Report";

const SelectSymptoms = () => {
  const [symptoms, setSymptoms] = useState([]);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [result, setResult] = useState(null);

  useEffect(() => {
    const fetchSymptoms = async () => {
      try {
        const response = await axios.get("http://localhost:5000/symptoms/all");
        setSymptoms(response.data.sort());
      } catch (error) {
        console.error(error);
      }
    };
    fetchSymptoms();
  }, []);

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:5000/predict", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ symptoms: selectedSymptoms.join(",") }),
      });

      if (response.ok) {
        const data = await response.json();
        setResult(data.result);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="selectSymptoms">
      <div className="symptom-grid">
        {symptoms &&
          symptoms.map((symptom) => (
            <div key={symptom} className="symptom">
              <input
                type="checkbox"
                value={symptom}
                checked={selectedSymptoms.includes(symptom)}
                onChange={(e) => {
                  if (e.target.checked) {
                    e.target.parentElement.classList.add('checked')
                    setSelectedSymptoms((prev) => [...prev, symptom]);
                  } 
                  else {
                    e.target.parentElement.classList.remove('checked')
                    setSelectedSymptoms((prev) =>
                      prev.filter((s) => s !== symptom)
                    );
                  }
                }}
              />
              {symptom}
            </div>
          ))}
      </div>

      {selectedSymptoms.length ? <button onClick={handleSubmit}>Predict</button> : null}
      <br />
      <h2>Your Results</h2>
      <hr />
      {result && <Report result={result} />}
    </div>
  );
};

export default SelectSymptoms;
