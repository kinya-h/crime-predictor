import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// import { API_URL } from "../constants";
// import { axiosInstance } from "./axiosInstance";
import { Token } from "../types/Token";
import { User } from "../types/User";
import { axiosInstance } from "./aciosInstance";

const API_URL = 'http://localhost:8000'

export const loginUser = createAsyncThunk<
  Token,
  { username: string; password: string }
>("user/login", async ({ username, password }) => {
  const response = await axios.post(`${API_URL}/auth/jwt/create/`, {
    username,
    password,
  });

  if (response.status === 200) {
    // Store the JWT token in local storage.
    localStorage.setItem("tokens", JSON.stringify(response.data));
  }

  return response.data as Token;
});

export const signUpUser = createAsyncThunk<
  User,
  { username: string; email: string; password: string }
>("auth/register", async ({ username, email, password }) => {
console.log("I RUN")
  console.log("Payload" , {username , password})
  const response = await axios.post(`${API_URL}/auth/users/`, {
    username,
    email,
    password,
  });

  return response.data as User;
});

export const getUser = createAsyncThunk<User>("user/fetch", async () => {
  const response = await axiosInstance.get(`${API_URL}/auth/users/me`);

  return response.data as User;
});
