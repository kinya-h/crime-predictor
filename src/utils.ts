import { Place } from "./types/Place";
import axios from "axios";

export type CrimeType =
  | "Theft"
  | "Robbery"
  | "Assault"
  | "Burglary"
  | "Fraud"
  | "Kidnapping"
  | "Murder"
  | "Drug-related";

export interface CrimeData {
  year: number;
  month: number;
  day: number;
  proximity_to_bank: number;
  type: number; // Numeric representation of the crime type
  latitude: number;
  longitude: number;
  original_type: CrimeType; // Original crime type
}

const crimeData: CrimeData[] = [
  {
    year: 2021,
    month: 4,
    day: 17,
    proximity_to_bank: 1.788331,
    type: 4,
    latitude: 0.046152,
    longitude: 37.636054,
    original_type: "Kidnapping",
  },
  // Add more crime data here...
];

export function mapTypeToOriginalType(crimeType: number): CrimeType {
  switch (crimeType) {
    case 1:
      return "Burglary";
    case 2:
      return "Drug-related";
    case 3:
      return "Fraud";
    case 4:
      return "Kidnapping";
    case 5:
      return "Murder";
    case 6:
      return "Robbery";
    case 7:
      return "Theft";
    default:
      throw new Error("Invalid crime type number");
  }
}

// Example usage:
const typeNumber: number = 4; // Example type number
// console.log(originalType); // Output: "Kidnapping"

// Define the URL of the JSON file
const url = "/data/places.json";

// Function to fetch data from JSON file
export const fetchPlaces = async () => {
  try {
    const response = await axios.get<Place[]>("/data/places.json");
    return response.data as Place[];
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};
