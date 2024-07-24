import { combineReducers } from "redux";
import counterReducer from "./counterReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
  counter: counterReducer,
  user: userReducer, //nhờ dòng này mà redux có trường "user"
});

export default rootReducer;
