import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../types/User";
import {
  getUser,
  loginUser,
  signUpUser,
} from "../../actions/auth";
import { Token } from "../../types/Token";

interface userState {
  loading: boolean;
  success: boolean;
  user: User | Token;
  error: unknown;
}

export const authSlice = createSlice({
  name: "user",
  initialState: { loading: false, success: false, user: {} } as userState,

  reducers: {},
  extraReducers: (builder) => {
    builder

      //Register
      .addCase(signUpUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.user = action.payload;
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //get Logged in User
      .addCase(getUser.pending, (state) => {
        state.loading = true;
      })

      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })

      .addCase(getUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

interface usersState {
  loading: boolean;
  success: boolean;
  usersList: User[];
  error: unknown;
}

// export const usersSlice = createSlice({
//   name: "usersList",
//   initialState: {
//     loading: false,
//     success: false,
//     usersList: [],
//     error: "",
//   } as usersState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fectchUsers.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fectchUsers.fulfilled, (state, action) => {
//         state.loading = false;
//         state.success = true;
//         state.usersList = action.payload;
//       })
//       .addCase(fectchUsers.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });
