import { ActionTypes } from "../constants/action-types";
const intialState = {
  products: [],
};

export const productsReducer = (state = intialState, { type, payload }) => {
  console.log("payload: >>>>>", payload, type, state.products);
  console.log("as ma: >>>>>", ActionTypes.REMOVE_PRODUCT);
  switch (type) {
    case ActionTypes.SET_PRODUCTS:
      return { ...state, products: payload };
    case ActionTypes.ADD_PRODUCT:
      const tempArr = [...state.products];
      tempArr.push(payload);
      return { ...state, products: tempArr };

    case ActionTypes.UPDATE_PRODUCT:
      const updatedProject = payload;

      const updatedProducts = state.products.map((product) => {
        if (product.id === updatedProject.id) {
          return updatedProject;
        }
        return product;
      });
      return { ...state, products: updatedProducts };
    case ActionTypes.REMOVE_PRODUCT:
      const temp = state.products.filter((item) => item.id != Number(payload));
     
      return { ...state, products: temp };

    default:
      return state;
  }
};

export const selectedProductsReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case ActionTypes.SELECTED_PRODUCT:
      return { ...state, ...payload };
    case ActionTypes.REMOVE_SELECTED_PRODUCT:
      return {};

    default:
      return state;
  }
};
