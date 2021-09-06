export const cartReducer = (
  state = {
    cartItems: [],
    shippingAddress: {},
    paymentMethod: "",
    totalPrice: 0,
    count: 0,
    loading: false,
    error: null,
  },
  action
) => {
  switch (action.type) {
    case "CART_ADD_REQUEST":
      return { ...state, loading: true };
    case "CART_ADD_SUCCESS":
      const recieved = action.payload;
      const isExists = state.cartItems.find(
        (item) => item.name === recieved.name
      );
      console.log(state);
      if (isExists) {
        state.cartItems.map((item) =>
          isExists.name === item.name ? (item.qty = Number(recieved.qty)) : item
        );
      } else {
        state.cartItems = [...state.cartItems, recieved];
      }
      console.log(state.totalPrice);
      return {
        ...state,
        loading: false,

        totalPrice: isExists
          ? state.totalPrice + recieved.price * (recieved.qty - isExists.qty)
          : state.totalPrice + recieved.price * recieved.qty,
        count: isExists
          ? state.coutn + recieved.qty - isExists.qty
          : recieved.qty,
      };
    case "CART_ADD_FAIL":
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case "CART_REMOVE_REQUEST":
      return { ...state, loading: true };

    case "CART_REMOVE_SUCCESS":
      const itemToRemove = state.cartItems.find(
        (item) => (item._id = action.payload)
      );
      console.log(itemToRemove);
      const modified = state.cartItems.filter(
        (item) => item._id !== action.payload
      );

      return {
        ...state,
        cartItems: modified,
        totalPrice: state.totalPrice - itemToRemove.price * itemToRemove.qty,
        count: state.count - itemToRemove.qty,
        loading: false,
      };
    case "CART_REMOVE_FAIL":
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case "ADD_SHIPPING_ADDRESS":
      return {
        ...state,
        shippingAddress: action.payload,
      };
    case "ADD_PAYMENT_METHOD":
      return {
        ...state,
        paymentMethod: action.payload,
      };
    default:
      return state;
  }
};
