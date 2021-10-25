import { getCurrentUser, loginUser } from '../API';

import Auth from '../auth';
import { MESSAGES } from '../constants';

// action types
const SET_USER = 'SET_USER';
const UPDATE_USER = 'UPDATE_USER';
const LOGOUT_USER = 'LOGOUT_USER';

// action creators
export const loginAction = user => async dispatch => {
  try {
    const response = await loginUser(user);
    if (!response.ok) throw new Error(MESSAGES.error.login);

    const data = await response.json();

    dispatch({ type: SET_USER, payload: data.user });

    const { token } = data;
    Auth.login(token);
  } catch (err) {
    console.error(err);
  }
};

export const getUserData = () => async dispatch => {
  // Fetch the loggedin user's data by sending JWT to server
  // and decoding it
  try {
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) return false;

    const response = await getCurrentUser(token);
    if (!response.ok) throw new Error(MESSAGES.error.userData);

    const data = await response.json();
    dispatch({ type: SET_USER, payload: data });
  } catch (err) {
    console.error(err);
  }
};

export const setUser = () => {};

export const updateUser = () => {};

export const logoutUser = () => {};

// initial state
const initialUserState = {
  isLoggedIn: false,
  id: '',
  email: '',
  name: '',
  username: '',
  teamMemberOf: [],
  teamsOwned: [],
  createdAt: '',
};

// reducer
const userReducer = (state = initialUserState, { type, payload }) => {
  switch (type) {
    case SET_USER:
      return {
        ...state,
        isLoggedIn: true,
        id: payload.id,
        email: payload.email,
        name: payload.name,
        username: payload.username,
        teamMemberOf: payload.teamMemberOf,
        teamsOwned: payload.teamsOwned,
        createdAt: payload.createdAt,
      };
    case UPDATE_USER:
      return {
        ...state,
        // update later
      };
    case LOGOUT_USER:
      return {
        ...state,
        ...initialUserState,
      };
    default:
      return state;
  }
};

export default userReducer;
