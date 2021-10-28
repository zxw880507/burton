import { combineReducers } from "redux";
import productReducer from "./features/productSlice";
import checkboxReducer from "./features/checkboxSlice";
import formReducer from "./features/formSlice";

export default combineReducers({
  productState: productReducer,
  checkboxState: checkboxReducer,
  formState: formReducer,
});
