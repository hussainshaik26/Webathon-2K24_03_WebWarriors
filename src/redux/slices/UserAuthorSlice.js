// create redux slice
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// make http request using redux thunk middleware
export const userAuthorLoginThunk = createAsyncThunk(
  "user-author-login",
  async (userCredentialsObject, thunkApi) => {
    try {
      if (userCredentialsObject.userType === "user") {
        const res = await axios.post(
          "http://localhost:4000/user-api/login",
          userCredentialsObject
        );
        if (res.data.message === "Login success") {
          // store token in local or session storage
          localStorage.setItem("token", res.data.token);
          // return data
        } else {
          return thunkApi.rejectWithValue(res.data.message);
        }
        return res.data;
      }
    } catch (err) {
      return thunkApi.rejectWithValue(err);
    }
  }
);

export const userAuthorSlice = createSlice({
  name: "user-author-slice",
  initialState: {
    isPending: false,
    loginUserStatus: false,
    currentUser: {},
    errorOccured: false,
    errMsg: "",
  },
  reducers: {
    resetState: (state, action) => {
      state.isPending = false;
      state.loginUserStatus = false;
      state.currentUser = {};
      state.errorOccured = false;
      state.errMsg = "";
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(userAuthorLoginThunk.pending, (state, action) => {
        state.isPending = true;
      })
      .addCase(userAuthorLoginThunk.fulfilled, (state, action) => {
        state.isPending = false;
        state.currentUser = action.payload.user;
        state.loginUserStatus = true;
        state.errMsg = "";
        state.errorOccured = false;
      })
      .addCase(userAuthorLoginThunk.rejected, (state, action) => {
        state.isPending = false;
        state.currentUser = {};
        state.loginUserStatus = false;
        state.errMsg = action.payload;
        state.errorOccured = true;
      }),
});

// export action creator functions
export const { resetState } = userAuthorSlice.actions;
// export root reducer of this slice
export default userAuthorSlice.reducer;
