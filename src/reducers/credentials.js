import {
  CREDENTIALS_GET,
  CREDENTIALS_SET,
  CREDENTIALS_ERROR,
} from "../actions/types";

const DEFAULT_STATE = {
  email: "",
  password: "",
  isSet: false,
  errorMessage: "",
};

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case CREDENTIALS_GET:
      return {
        ...state,
        email: action.payload.email,
        password: action.payload.password,
        isSet: true,
        errorMessage: "",
      };
    case CREDENTIALS_SET:
      return {
        ...state,
        email: action.payload.email,
        password: action.payload.password,
        isSet: true,
        errorMessage: "",
      };
    case CREDENTIALS_ERROR:
      return { ...state, errorMessage: action.payload };
    default:
      return state;
  }
};
