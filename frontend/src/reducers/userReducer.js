const userReducer = (
  state = { userInfo: {}, error: null, loading: false },
  action
) => {
  switch (action.type) {
    case "ADD_USER_REQUEST":
      return { ...state, loading: true };
    case "ADD_USER_SUCCESS":
      return {
        ...state,
        loading: false,
        userInfo: action.payload,
        error: null,
      };
    case "ADD_USER_FAIL":
      return { ...state, loading: false, error: action.error };
    case "REMOVE_USER_REQUEST":
      return { ...state, userInfo: {} };
    default:
      return state;
  }
};

const updateUserReducer = (
  state = { profileInfo: {}, error: null, loading: false },
  action
) => {
  switch (action.type) {
    case "PROFILE_UPDATE_REQUEST":
      return { ...state, loading: true };
    case "PROFILE_UPDATE_SUCCESS":
      return {
        ...state,
        loading: false,
        profileInfo: action.payload,
        error: null,
      };
    case "PROFILE_UPDATE_FAIL":
      return { ...state, loading: false, error: action.error };

    default:
      return state;
  }
};

export { userReducer, updateUserReducer };
