import { ActionTypes } from "../constants/action-types";

export const setProducts = (products) => {
  return {
    type: ActionTypes.SET_PRODUCTS,
    payload: products,
  };
};

export const addProducts = (product) => {
  return {
    type: ActionTypes.ADD_PRODUCT,
    payload: product,
  };
};
export const deleteProductAction = (id) => {
  return {
    type: ActionTypes.REMOVE_PRODUCT,
    payload: id,
  };
};
export const selectedProduct = (product) => {
  return {
    type: ActionTypes.SELECTED_PRODUCT,
    payload: product,
  };
};
export const removeSelectedProduct = () => {
  return {
    type: ActionTypes.REMOVE_SELECTED_PRODUCT,
  };
};
export const updateProduct = (payloadData) => {
  console.log("payloadData: ", payloadData);
  return {
    type: ActionTypes.UPDATE_PRODUCT,
    payload: payloadData,
  };
};
