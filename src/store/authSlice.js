import { createSlice } from "@reduxjs/toolkit";
import { clearPosts } from "./postsSlice"; // Adjust path as needed

//initial state of app
const initialState = {
  status: false, //by default user is not authenticated
  userData: null, //no data by default
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  //we define function in here, using which other components know the current state of the app/user auth
  reducers: {
    login: (state, action) => {
      state.status = true;
      state.userData = action.payload;
    },

    logout: (state) => {
      state.status = false;
      state.userData = null;
    },
  },
});

//exporting function so other components can use it to track login or logout status
export const { login, logout } = authSlice.actions;

export const handleLogout = () => (dispatch) => {
  dispatch(logout()); // Clear auth state
  dispatch(clearPosts()); // Clear posts state
};

export default authSlice.reducer;
