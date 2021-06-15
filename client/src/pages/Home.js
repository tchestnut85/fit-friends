import React, { useEffect } from 'react';

import Auth from '../utils/auth';
import { Loading } from '../components/Loading';
import { SET_USER } from '../utils/state/UserState/userActions';
import { getCurrentUser } from '../utils/API';
import { useUserContext } from '../utils/state/UserState/UserState';

export const Home = () => {
    const [state, dispatch] = useUserContext();
    const { user } = state;
    console.log('user:', user);

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
            <h2 className='centered py-2'>Hi, {user.name}!</h2>
            <section className='grid-container mx-1'>
                <div className='grid-item'>User Info: {user.username}</div>
                <div className='grid-item'>
                    Teams Joined:{' '}
                    {user.teamMemberOf
                        ? user.teamMemberOf
                        : `${user.name}, you don't belong to any teams yet. You can start a team or join a friend's team!`}
                </div>
                <div className='grid-item'>Teams Owned: {user.teamsOwned}</div>
                <div className='grid-item'>User Stats:</div>
            </section>
        </main>
    );
};
