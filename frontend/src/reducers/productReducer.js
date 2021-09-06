export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case "PRODUCT_LIST_REQUEST":
      return { error: null, loading: true, products: [] };
    case "PRODUCT_LIST_SUCCESS":
      return { error: null, loading: false, products: action.payload.data };
    case "PRODUCT_LIST_FAIL":
      return { products: [], loading: false, error: action.error };
    default:
      return state;
  }
};

export const productDetailsReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case "PRODUCT_SINGLE_REQUEST":
      return { error: null, loading: true, product: {} };
    case "PRODUCT_SINGLE_SUCCESS":
      return { error: null, loading: false, product: action.payload.data };
    case "PRODUCT_SINGLE_FAIL":
      return { product: {}, loading: false, error: action.error };
    default:
      return state;
  }
};
