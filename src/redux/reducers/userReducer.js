import { ActionTypes } from "../constants/action-types";
const intialState = {
  users: [],
};

export const userReducer = (state = intialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_USERS:
      return { ...state, users: payload };
    case ActionTypes.REMOVE_USER:
      const temp = state.users.filter((item) => item.id !== payload);
      return { ...state, users: temp };
    case ActionTypes.ADD_USER:
      const tempArr = [...state.users];
      tempArr.push(payload);
      return { ...state, users: tempArr };
    case ActionTypes.UPDATE_USER:
      const updatedUser = payload;

      const updatedUsers = state.users.map((user) => {
        if (user.id === updatedUser.id) {
          return updatedUser;
        }
        return user;
      });
      return { ...state, users: updatedUsers };

    default:
      return state;
  }
};

export const selectedUserReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case ActionTypes.SELECTED_USER:
      return { ...state, ...payload };
    case ActionTypes.REMOVE_SELECTED_USER:
      return {};
    default:
      return state;
  }
};
