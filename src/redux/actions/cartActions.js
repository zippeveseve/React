import { ActionTypes } from "../constants/action-types";

export const userCart = (payload) => {
  return {
    type: ActionTypes.CART,
    payload: payload,
  };
};

// export const selectedProduct = (product) => {
//   return {
//     type: ActionTypes.SELECTED_PRODUCT,
//     payload: product,
//   };
// };
export const deleteCartItemAction = (dummyID) => {
  return {
    type: ActionTypes.REMOVE_CART_PRODUCT,
    payload: dummyID,
  };
};

export const addToCart = (value) => {
  return {
    type: ActionTypes.ADD_TO_CART,
    payload: value,
  };
};

export const removeFromCart = (value) => {
  return {
    type: ActionTypes.REMOVE_FROM_CART,
    payload: value,
  };
};
