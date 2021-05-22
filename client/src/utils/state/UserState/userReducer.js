import { LOGGED_IN, SET_CURRENT_USER, UPDATE_USER } from './userActions';

import { useReducer } from 'react';

export const reducer = (state, action) => {
    switch (action.type) {
        case LOGGED_IN:
            return {
                ...state,
                isLoggedIn: true,
            };
        case SET_CURRENT_USER:
        case UPDATE_USER:
            return {
                ...state,
                user: action.payload,
            };
        default:
            return state;
    }
};

export function useUserReducer(initialState) {
    return useReducer(reducer, initialState);
}
