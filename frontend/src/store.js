import { composeWithDevTools } from "redux-devtools-extension";
import {
  userReducer,
  updateUserReducer,
  userListReducer,
  userDeleteReducer,
} from "./reducers/userReducer.js";
import thunk from "redux-thunk";
import { createStore, applyMiddleware, combineReducers } from "redux";
import {
  productListReducer,
  productDetailsReducer,
} from "./reducers/productReducer.js";
import { cartReducer } from "./reducers/cartReducer";
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderPayReducer,
  orderListMyReducer,
} from "./reducers/orderReducer.js";

const reducers = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  user: userReducer,
  profile: updateUserReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderMyList: orderListMyReducer,
  usersList: userListReducer,
  userDelete: userDeleteReducer,
});

let cartItems = [];
if (localStorage.getItem("cartItems")) {
  cartItems = JSON.parse(localStorage.getItem("cartItems"));
}
let shippingAddress = { address: "", city: "", pinCode: "", country: "" };
if (localStorage.getItem("shippingAddress")) {
  shippingAddress = JSON.parse(localStorage.getItem("shippingAddress"));
}

const countFetch =
  cartItems.length == 0
    ? 0
    : cartItems.reduce((value, item) => value + item.qty, 0);

const priceFetch =
  cartItems.length == 0
    ? 0
    : cartItems.reduce((value, item) => value + item.qty * item.price, 0);
let userInfo = {};
if (localStorage.getItem("userInfo")) {
  userInfo = JSON.parse(localStorage.getItem("userInfo"));
}

const initialState = {
  cart: {
    cartItems,
    shippingAddress,
    count: countFetch,
    totalPrice: priceFetch,
  },
  user: { userInfo: userInfo },
};
const middleware = [thunk];
const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
