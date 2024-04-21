import React, { useEffect, useState } from "react";
import axios from "axios";
import { CrimeType, fetchPlaces, mapTypeToOriginalType } from "../utils";
import { CrimeDatePicker } from "./DatePicker";
import { Place } from "../types/Place";
import { useDispatch, useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../store";
import { getUser } from "../actions/auth";
import { User } from "../types/User";
interface CrimePredictionFormProps {
  onPredictions: (preds: any) => void;
  onClearResults: () =>void;
}

const CrimePredictionForm = ({ onPredictions, onClearResults }: CrimePredictionFormProps) => {
  const API_URL = "http://localhost:8000";

  const [year, setYear] = useState(0);
  const [month, setMonth] = useState(0);
  const [day, setDay] = useState(0);
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [crimeType, setCrimeType] = useState("");
  const [selectedPlace, setSelectedPlace] = useState<Place>({} as Place);
  const [places, setPlaces] = useState<Place[]>([]);
  const [email, etEmail] = useState("");
  const {user} = useSelector((state:RootState)=>state.authUser)
  //   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //     const { name, value } = e.target;
  //     setFormData({ ...formData, [name]: value });
  //   };

  const dispatch = useAppDispatch()

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let long = position.coords.longitude;
      // setLatitude(lat.toString());
      // setLongitude(long.toString());
      dispatch(getUser())

      const fetchData = async () => {
        const data = await fetchPlaces();
        console.log(data);
        setPlaces(data);
      };

      fetchData();
      console.log({ lat, long });
    });
  }, []);

  console.log("AUTH USER =>" , user)
  const setTimeScale = (date: Date) => {
    const selectedDate = new Date(date);
    // console.log("date=>", selectedDate.getDay);
    setDay(selectedDate.getDay());
    setMonth(selectedDate.getMonth() + 1);
    setYear(selectedDate.getFullYear());

    console.log({ day, month, year });
  };

  const handleSubmit = async () => {
    console.log("POSTING");
    onClearResults()
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

      if (response.status === 200) {
        axios.post(`${API_URL}/api/predictions/send_mail/`, {
          prediction: {
            location: selectedPlace.name,
            results: crimeType,
            date: new Date().toString(),
          },
          receiver: (user as User).id,
        });
      };
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handlSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const placeIdx = places.findIndex(
      (place: Place) => place.latitude === e.target.value
    );

    console.log("idx", placeIdx);
    const place = places[placeIdx];
    console.log("PLACE", place);
    setLatitude(place.latitude);
    setLongitude(place.longitude);
    console.log("lat ", latitude);
    setSelectedPlace(place);

    // console.log("SELECTED , ", { latitude, longitude });
  };

  const sendResults = async (e: React.FormEvent) => {
    e.preventDefault();
    axios.post(`${API_URL}/api/predictions/predict_crime/send_mail/`, {
      prediction: {
        location: selectedPlace.name,
        results: crimeType,
        date: Date.now().toString(),
      },
      // receiver: (),
    });
  };

  return (
    <div>
      <div className="max-w-xs">
        <CrimeDatePicker onDateSelected={setTimeScale} />
        <select
          onChange={(e) => handlSelect(e)}
          className="select mt-2 select-bordered w-full max-w-xs"
        >
          <option value="" disabled selected>
            --Select Place --
          </option>
          {places.map((place, i) => (
            <option key={i} value={place.latitude}>
              {place.name}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={handleSubmit}
        className="bg-accent text-white p-2 rounded-full mt-2"
        type="submit"
      >
        Predict
      </button>
      {/* {crimeType && (
        <form action="" onSubmit={(e) => sendResults(e)}>
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input type="text" className="grow" placeholder="Email" />
          </label>
          <button type="submit" className=" bg-primary p-2 rounded-md">
            Submit
          </button>
        </form>
      )} */}
    </div>
  );
};

export default CrimePredictionForm;
