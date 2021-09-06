import { composeWithDevTools } from "redux-devtools-extension";
import { userReducer, updateUserReducer } from "./reducers/userReducer.js";
import thunk from "redux-thunk";
import { createStore, applyMiddleware, combineReducers } from "redux";
import {
  productListReducer,
  productDetailsReducer,
} from "./reducers/productReducer.js";
import { cartReducer } from "./reducers/cartReducer";

const reducers = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  user: userReducer,
  profile: updateUserReducer,
});

let cartItems = [];
if (localStorage.getItem("cartItems")) {
  cartItems = JSON.parse(localStorage.getItem("cartItems"));
}
let shippingAddress = { address: "", city: "", pinCode: "", country: "" };
if (localStorage.getItem("shippingAddress")) {
  shippingAddress = JSON.parse(localStorage.getItem("shippingAddress"));
}

let userInfo = {};
if (localStorage.getItem("userInfo")) {
  userInfo = JSON.parse(localStorage.getItem("userInfo"));
}

const initialState = {
  cart: { cartItems, shippingAddress, totalPrice: 0, count: 0 },
  user: { userInfo: userInfo },
};
const middleware = [thunk];
const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
