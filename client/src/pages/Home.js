import React, { useEffect } from 'react';

import Auth from '../utils/auth';
import { Loading } from '../components/Loading';
import { SET_USER } from '../utils/state/UserState/userActions';
import { getCurrentUser } from '../utils/API';
import { useUserContext } from '../utils/state/UserState/UserState';

export const Home = () => {
    const [state, dispatch] = useUserContext();
    const { user } = state;

    // Fetch the loggedin user's data by decoding the JWT from Auth
    const getUserData = async () => {
        try {
            const token = Auth.loggedIn() ? Auth.getToken() : null;

            if (!token) {
                return false;
            }

            const response = await getCurrentUser(token);

            if (!response.ok) {
                throw new Error('Could not retrieve user data.');
            }

            const user = await response.json();
            console.log('Home.js - line 34 - user:', user);

            dispatch({
                type: SET_USER,
                payload: user,
            });
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        getUserData();
        // eslint-disable-next-line
    }, []);

    // Display "loading" while the data is fetched/loading
    if (!user) {
        return <Loading />;
    }

    return (
        <main>
            <h2>Hi {user.name}!</h2>
        </main>
    );
};
