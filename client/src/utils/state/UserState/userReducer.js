import { LOGOUT, SET_USER, UPDATE_USER } from './userActions';
import { clearData, getData, saveData } from '../../localStorage';

import { useReducer } from 'react';

export const reducer = (state, action) => {
    switch (action.type) {
        case SET_USER:
            const data = {
                ...state,
                isLoggedIn: true,
                user: {
                    id: action.payload.id,
                    email: action.payload.email,
                    name: action.payload.name,
                    username: action.payload.username,
                    teamMemberOf: action.payload.teamMemberOf,
                    teamsOwned: action.payload.teamsOwned,
                    createdAt: action.payload.createdAt,
                },
            };
            saveData(data);
            return data;
        case LOGOUT:
            clearData();
            return {
                ...state,
                user: {},
                isLoggedIn: false,
            };
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
