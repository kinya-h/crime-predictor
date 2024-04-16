import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { Token } from "../types/Token";
import { User } from "../types/User";

const API_URL = "http://127.0.0.1:5000";

interface ResError {
  username: [];
  email: [];
  pasword: [];
}
export const signUpUser = createAsyncThunk<User, User>(
  "user/register",
  async (user: User, { rejectWithValue }) => {
    try {
      const response = await axios.post<User>(`${API_URL}/auth/users/`, {
        username: user.username,
        email: user.email,
        password: user.password,
      });

      return response.data;
    } catch (err) {
      const error: AxiosError<ResError> = err as AxiosError<ResError>; // cast the error for access
      if (!error.response) {
        throw err;
      }
      // We got validation errors, let's return those so we can reference in our component and set form errors
      return rejectWithValue(error.response.data);
    }
  }
);

export const loginUser = createAsyncThunk<Token, User>(
  "user/login",
  async (user: User, { rejectWithValue }) => {
    console.log("payload user  = ", user);
    try {
      const response = await axios.post<Token>(`${API_URL}/auth/jwt/create/`, {
        username: user.username,
        password: user.password,
      });
      localStorage.setItem("tokens", JSON.stringify(response.data));

      return response.data;
    } catch (err) {
      const error: AxiosError<ResError> = err as AxiosError<ResError>; // cast the error for access
      if (!error.response) {
        throw err;
      }
      // We got validation errors, let's return those so we can reference in our component and set form errors
      return rejectWithValue(error.response.data);
    }
  }
);

export const fectchUsers = createAsyncThunk<User[]>("users/fetch", async () => {
  try {
    const tokens: string | null = localStorage.getItem("tokens");
    const jwtTokens: Token = tokens ? JSON.parse(tokens) : {};

    const response = await axios.get<User[]>(`${API_URL}/api/users`, {
      headers: {
        Authorization: `JWT ${jwtTokens.access}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("ERROR: ", error);
    throw error;
  }
});

export const getLoggedInUser = createAsyncThunk<User>(
  "users/fetch/me",
  async () => {
    try {
      const tokens: string | null = localStorage.getItem("tokens");
      const jwtTokens: Token = tokens ? JSON.parse(tokens) : {};
      const response = await axios.get<User>(`${API_URL}/auth/users/me`, {
        headers: {
          Authorization: `JWT ${jwtTokens.access}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("ERROR: ", error);
      throw error;
    }
  }
);
