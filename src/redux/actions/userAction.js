import { ActionTypes } from "../constants/action-types";

export const setUsers = (users) => {
  return {
    type: ActionTypes.SET_USERS,
    payload: users,
  };
};
export const deleteUserAction = (dummyID) => {
  return {
    type: ActionTypes.REMOVE_USER,
    payload: dummyID,
  };
};
export const selectedUser = (user) => {
  return {
    type: ActionTypes.SELECTED_USER,
    payload: user,
  };
};
export const removeSelectedUser = () => {
  return {
    type: ActionTypes.REMOVE_SELECTED_USER,
  };
};

export const addUser = (payloadData) => {
  return {
    type: ActionTypes.ADD_USER,
    payload: payloadData,
  };
};
export const updateUser = (payloadData) => {
  console.log("payloadData: ", payloadData);
  return {
    type: ActionTypes.UPDATE_USER,
    payload: payloadData,
  };
};
