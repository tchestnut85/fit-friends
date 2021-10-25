import Auth from '../auth';
import { MESSAGES } from '../constants';
import { loginUser } from '../API';

// action types
const SET_USER = 'SET_USER';
const UPDATE_USER = 'UPDATE_USER';
const LOGOUT_USER = 'LOGOUT_USER';

// action creators
export const loginAction = user => async dispatch => {
  try {
    const response = await loginUser(user);
    console.log('response:', response);
    if (!response.ok) throw new Error(MESSAGES.error.login);

    const data = await response.json();
    console.log('data:', data);

    dispatch({ type: SET_USER, payload: data.user });

    const { token } = data;
    Auth.login(token);
  } catch (err) {
    console.error(err);
  }
};

export const getUser = () => {};

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
