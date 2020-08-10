import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import authReducer from "./auth";
import credentailsReducer from "./credentials";

export default combineReducers({
  form: formReducer,
  auth: authReducer,
  credentials: credentailsReducer,
});
