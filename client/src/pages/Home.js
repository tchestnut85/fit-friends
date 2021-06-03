import Auth from '../utils/auth';
import React from 'react';
import { useUserContext } from '../utils/state/UserState/UserState';

export const Home = () => {
    const [state] = useUserContext();
    console.log('state:', state);

    return (
        <main>
            <h2>Hi {state.user.name}!</h2>
        </main>
    );
};
