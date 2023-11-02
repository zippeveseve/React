import { ActionTypes } from "../constants/action-types";

const initialState = {
  cart: [],
};

export const cartReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.CART:
      return { ...state, cart: payload };

    case ActionTypes.REMOVE_CART_PRODUCT:
      const updatedCart = state.cart.filter((item, index) => index !== payload);
      return { ...state, cart: updatedCart };

    case ActionTypes.ADD_TO_CART:
    case ActionTypes.REMOVE_FROM_CART:
      const index = state.cart.findIndex(item => item.productId === payload);
      const newCart = [...state.cart];

      if (index !== -1) {
        newCart[index].quantity += type === ActionTypes.ADD_TO_CART ? 1 : -1;
      } else {
        newCart.push({ productId: payload, quantity: 1 });
      }

      return { ...state, cart: newCart };

    default:
      return state;
  }
};
