export const cartReducer = (
  state = {
    cartItems: [],
    shippingAddress: {},
    paymentMethod: "",
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
      const { qty, price } = recieved;

      let temp = false;

      if (isExists) {
        temp = true;
        state.cartItems.map((item) =>
          isExists.name === item.name ? (item.qty = qty) : item
        );
      } else {
        state.cartItems = [...state.cartItems, recieved];
      }

      return {
        ...state,
        loading: false,
        count: state.count + qty,
        totalPrice: state.totalPrice + qty * price,
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

      const modified = state.cartItems.filter(
        (item) => item._id !== action.payload
      );
      console.log(modified);
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
    case "RESET_CART":
      return {
        cartItems: [],
        shippingAddress: {},
        paymentMethod: "",
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};
