import axios from "axios";
import {
  USER_DELETE_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
} from "../constants/userConstants";
import { ORDER_LIST_MY_RESET } from "../constants/orderConstants";

const loginUser = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: "ADD_USER_REQUEST" });

    const config = {
      header: { "Content-Type": "application/json" },
    };

    const { data } = await axios.post("/api/users/login", { email, password });

    dispatch({ type: "ADD_USER_SUCCESS", payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: "ADD_USER_FAIL",
      error:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
const logoutUser = () => async (dispatch) => {
  try {
    dispatch({ type: "REMOVE_USER_REQUEST" });
    dispatch({ type: ORDER_LIST_MY_RESET });
    dispatch({ type: "PROFILE_RESET" });
    dispatch({ type: "CART_RESET" });
    localStorage.removeItem("userInfo");
    localStorage.removeItem("cartItems");
    localStorage.removeItem("shippingAddress");
    localStorage.removeItem("paymentMethod");
  } catch (error) {
    dispatch({
      type: "ADD_USER_FAIL",
      error:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

const registerUser = (registerData) => async (dispatch) => {
  try {
    dispatch({ type: "ADD_USER_REQUEST" });
    const config = {
      header: { "Content-Type": "application/json" },
    };

    const { data } = await axios.post("/api/users", registerData, config);
    dispatch({ type: "ADD_USER_SUCCESS", payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: "ADD_USER_FAIL",
      error:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

const getProfile = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: "PROFILE_UPDATE_REQUEST" });
    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + getState().user.userInfo.token,
      },
    };

    const { data } = await axios.get(`/api/users/${id}`, config);

    dispatch({ type: "PROFILE_UPDATE_SUCCESS", payload: data });
  } catch (error) {
    console.log("error occour in get Profile");
    dispatch({
      type: "PROFILE_UPDATE_FAIL",
      error:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

const updateUser = (updateData) => async (dispatch, getState) => {
  try {
    dispatch({ type: "PROFILE_UPDATE_REQUEST" });
    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + getState().user.userInfo.token,
      },
    };

    console.log("update data", updateData);
    const { data } = await axios.put("/api/users/profile", updateData, config);
    dispatch({ type: "PROFILE_UPDATE_SUCCESS", payload: data });
  } catch (error) {
    console.log("error occour in update Profile");
    dispatch({
      type: "PROFILE_UPDATE_FAIL",
      error:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

const listUsers = () => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_LIST_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + getState().user.userInfo.token,
      },
    };

    const { data } = await axios.get("/api/users", config);
    dispatch({ type: USER_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_LIST_FAIL,
      error:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

const deleteUser = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_DELETE_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + getState().user.userInfo.token,
      },
    };

    const { data } = await axios.delete(`/api/users/${id}`, config);
    dispatch({ type: USER_DELETE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_DELETE_FAIL,
      error:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export {
  loginUser,
  logoutUser,
  registerUser,
  updateUser,
  getProfile,
  listUsers,
  deleteUser,
};
