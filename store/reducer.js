import { combineReducers } from "redux";
import productReducer from "./features/productSlice";
import checkboxReducer from "./features/checkboxSlice";
import formReducer from "./features/formSlice";
import modeReducer from "./features/modeSlice";
import demandReducer from "./features/demandSlice";

export default combineReducers({
  productState: productReducer,
  checkboxState: checkboxReducer,
  formState: formReducer,
  modeState: modeReducer,
  demandState: demandReducer,
});
