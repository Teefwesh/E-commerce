import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { setHeaders, url } from "./api";

const initialState = {
  list: [],
  status: null,
  deleteStatus: null,
};

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  try {
    const response = await axios.get(`${url}/users`, setHeaders());

    return response.data;
  } catch (error) {
    console.log(error);
  }
});

export const deleteUser = createAsyncThunk("users/deleteUser", async (id) => {
  try {
    const response = await axios.delete(`${url}/users/${id}`, setHeaders());
    return response.data;
  } catch (error) {
    console.log(error.response.data);
    toast.error(error.response?.data, {
      position: "bottom-left",
    });
  }
});

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: {
    // FETCH USERS
    [fetchUsers.pending]: (state, action) => {
      state.status = "pending";
    },
    [fetchUsers.fulfilled]: (state, action) => {
      state.status = "success";
      state.list = action.payload;
    },
    [fetchUsers.rejected]: (state, action) => {
      state.status = "rejected";
    },

    // DELETE USERS
    [deleteUser.pending]: (state, action) => {
      state.status = "pending";
    },
    [deleteUser.fulfilled]: (state, action) => {
      const newList = state.list.filter(
        (user) => user._id !== action.payload._id
      );

      state.list = newList;
      state.deleteStatus = "success";
      toast.error(`User Deleted`, {
        position: "bottom-left",
      });
    },
    [deleteUser.rejected]: (state, action) => {
      state.deleteStatus = "rejected";
    },
  },
});

export default usersSlice.reducer;
