import axios, { AxiosInstance } from "axios";

const API_URL = 'http://localhost:8000'


// Function to get the access token from local storage
const getAccessToken = () => {
  const tokens = localStorage.getItem("tokens");
  return tokens ? JSON.parse(tokens)?.access : null;
};

// Create a new Axios instance
export const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_URL,
});

// Add a request interceptor to update the Authorization header
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken();
    if (accessToken) {
      config.headers.Authorization = `JWT ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
