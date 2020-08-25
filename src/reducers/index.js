import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import authReducer from "./auth";
import statusReducer from "./status";
import credentailsReducer from "./credentials";

export default combineReducers({
  form: formReducer,
  auth: authReducer,
  status: statusReducer,
  credentials: credentailsReducer,
});
