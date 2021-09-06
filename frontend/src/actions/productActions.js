import axios from "axios";

export const getProducts = () => async (dispatch) => {
  try {
    dispatch({ type: "PRODUCT_LIST_REQUEST" });
    const products = await axios.get("/api/products");

    if (!products) {
      throw new Error("No Products found");
    }
    dispatch({ type: "PRODUCT_LIST_SUCCESS", payload: products });
  } catch (error) {
    dispatch({ type: "PRODUCT_LIST_FAIL", error: error.message });
  }
};

export const getSingleProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: "PRODUCT_SINGLE_REQUEST" });
    const product = await axios.get(`/api/products/${id}`);

    if (!product) {
      throw new Error("No Product found");
    }
    dispatch({ type: "PRODUCT_SINGLE_SUCCESS", payload: product });
  } catch (error) {
    dispatch({ type: "PRODUCT_SINGLE_FAIL", error: error.message });
  }
};
