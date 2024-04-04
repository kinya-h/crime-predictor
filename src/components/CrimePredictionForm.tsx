import React, { useState } from "react";
import axios from "axios";
import { CrimeType, mapTypeToOriginalType } from "../utils";
interface CrimePredictionFormProps {
  onPredictions: (preds: any) => void;
}
const CrimePredictionForm = ({ onPredictions }: CrimePredictionFormProps) => {
  const API_URL = "http://localhost:8000";

  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [crimeType, setCrimeType] = useState("");

  //   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //     const { name, value } = e.target;
  //     setFormData({ ...formData, [name]: value });
  //   };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Send data to the backend
      const response = await axios.post(
        `${API_URL}/api/predictions/predict_crime/`,
        {
          year: +year,
          month: +month,
          day: +day,
          latitude,
          longitude,
        }
      );
      console.log(response.data); // Handle response from the backend
      console.log(response.data.predicted_type[0]); // Handle response from the backend

      const prediction = response.data.predicted_type[0];
      const predictedCrime: CrimeType = mapTypeToOriginalType(prediction);
      setCrimeType(predictedCrime);
      onPredictions(crimeType);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Year:
        <input
          type="text"
          name="year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
      </label>
      <label>
        Month:
        <input
          type="text"
          name="month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
        />
      </label>
      <label>
        Day:
        <input
          type="text"
          name="day"
          value={day}
          onChange={(e) => setDay(e.target.value)}
        />
      </label>
      <label>
        Latitude:
        <input
          type="text"
          name="latitude"
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
        />
      </label>
      <label>
        Longitude:
        <input
          type="text"
          name="longitude"
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
        />
      </label>
      <button
        className="bg-accent text-white p-2 rounded-full mt-2"
        type="submit"
      >
        Predict
      </button>
    </form>
  );
};

export default CrimePredictionForm;
