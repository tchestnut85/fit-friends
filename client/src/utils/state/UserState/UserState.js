import React, { createContext, useContext } from 'react';

import { useUserReducer } from './userReducer';

const UserContext = createContext();
const { Provider } = UserContext;

const UserProvider = ({ value = [], ...props }) => {
    const [state, dispatch] = useUserReducer({
        // set the initial state of the user
        user: {},
        isLoggedIn: null,
    });

    return <Provider value={[state, dispatch]} {...props} />;
};

const useUserContext = () => {
    return useContext(UserContext);
};

export { UserProvider, useUserContext };
