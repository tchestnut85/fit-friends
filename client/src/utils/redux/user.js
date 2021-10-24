// action types
const SET_USER = 'SET_USER';
const UPDATE_USER = 'UPDATE_USER';
const LOGOUT_USER = 'LOGOUT_USER';

// action creators
export const setUser = () => {};

export const updateUser = () => {};

export const logoutUser = () => {};

// initial state
const initialState = {
    user: null,
    isLoggedIn: false,
};

// reducer
const userReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case SET_USER:
            return {
                ...state,
                user: payload,
            };
        case UPDATE_USER:
            return {
                ...state,
                isLoggedIn: true,
                user: {
                    id: payload.id,
                    email: payload.email,
                    name: payload.name,
                    username: payload.username,
                    teamMemberOf: payload.teamMemberOf,
                    teamsOwned: payload.teamsOwned,
                    createdAt: payload.createdAt,
                },
            };
        case LOGOUT_USER:
            return {
                ...state,
                user: null,
                isLoggedIn: false,
            };
        default:
            return state;
    }
};

export default userReducer;
