import {
  USER_DELETE_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
} from "../constants/userConstants";
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
    case "PROFILE_RESET":
      return { profileInfo: {}, loading: false, error: null };

    default:
      return state;
  }
};

const userListReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LIST_REQUEST:
      return { loading: true };
    case USER_LIST_SUCCESS:
      return {
        loading: false,
        users: action.payload,
      };
    case USER_LIST_FAIL:
      return { loading: false, error: action.error };
    case "USERS_RESET":
      return { users: [], loading: false, error: null };

    default:
      return state;
  }
};

const userDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_DELETE_REQUEST:
      return { loading: true };
    case USER_DELETE_SUCCESS:
      return {
        loading: false,
        success: action.payload,
      };
    case USER_DELETE_FAIL:
      return { loading: false, error: action.error };
    default:
      return state;
  }
};

export { userReducer, updateUserReducer, userListReducer, userDeleteReducer };
