import { combineReducers } from "redux";
import { productsReducer, selectedProductsReducer } from "./productsReducer";
import { cartReducer } from "./cartReducer";
import { selectedUserReducer, userReducer } from "./userReducer";
const reducers = combineReducers({
  allProducts: productsReducer,
  product: selectedProductsReducer,
  cart: cartReducer,
  allUsers: userReducer,
  user: selectedUserReducer,
});
export default reducers;
