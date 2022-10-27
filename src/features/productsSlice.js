import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { setHeaders, url } from "./api";

const initialState = {
  items: [],
  status: null,
  createStatus: null,
  deleteStatus: null,
  editStatus: null,
};

export const productsFetch = createAsyncThunk(
  "products/productsFetch",
  async () => {
    try {
      const response = await axios.get(`${url}/products`);
      return response.data;
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data);
    }
  }
);

export const createProducts = createAsyncThunk(
  "products/createProducts",

  async (values) => {
    try {
      const response = await axios.post(
        `${url}/products`,
        values,
        setHeaders()
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteProducts = createAsyncThunk(
  "products/deleteProducts",

  async (id) => {
    try {
      const response = await axios.delete(
        `${url}/products/${id}`,
        setHeaders()
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

// UPDATE PRODUCT
export const editProduct = createAsyncThunk(
  "products/editProduct",

  async (values) => {
    try {
      const response = await axios.put(
        `${url}/products/${values.product._id}`,
        values,
        setHeaders()
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: {
    [productsFetch.pending]: (state, action) => {
      state.status = "pending";
    },

    [productsFetch.fulfilled]: (state, action) => {
      state.status = "success";
      state.items = action.payload;
    },

    [productsFetch.rejected]: (state, action) => {
      state.status = "rejected";
    },

    // CREATE
    [createProducts.pending]: (state, action) => {
      state.createStatus = "pending";
    },

    [createProducts.fulfilled]: (state, action) => {
      state.items.push(action.payload);
      state.createStatus = "success";

      toast.success(`Product created`, {
        position: "bottom-left",
      });
    },

    [createProducts.rejected]: (state, action) => {
      state.createStatus = "rejected";

      toast.error(`Not authorized`, {
        position: "bottom-left",
      });
    },

    // DELETE
    [deleteProducts.pending]: (state, action) => {
      state.deleteStatus = "pending";
    },

    [deleteProducts.fulfilled]: (state, action) => {
      const newList = state.items.filter(
        (item) => item._id !== action.payload._id
      );

      state.items = newList;
      state.deleteStatus = "success";
      toast.error(`Product deleted`);
    },

    [deleteProducts.rejected]: (state, action) => {
      state.deleteStatus = "rejected";
    },

    // EDIT
    [editProduct.pending]: (state, action) => {
      state.editStatus = "pending";
    },

    [editProduct.fulfilled]: (state, action) => {
      const updatedProducts = state.items.map((product) =>
        product._id === action.payload._id ? action.payload : product
      );

      state.items = updatedProducts;
      state.editStatus = "success";
      toast.info(`Product edited`);
    },

    [editProduct.rejected]: (state, action) => {
      state.editStatus = "rejected";
    },
  },
});

export default productsSlice.reducer;
