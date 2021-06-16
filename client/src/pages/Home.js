import { Card, Icon, Image, List } from 'semantic-ui-react';
import React, { useEffect } from 'react';

import Auth from '../utils/auth';
import { HomepageCard } from '../components/HomepageCard';
import { Loading } from '../components/Loading';
import { SET_USER } from '../utils/state/UserState/userActions';
import { getCurrentUser } from '../utils/API';
import { useUserContext } from '../utils/state/UserState/UserState';

export const Home = () => {
    const [state, dispatch] = useUserContext();
    const { user } = state;

    // Example User data:
    // createdAt: '2021-06-02T23:43:47.460Z';
    // email: 'test001@mail.com';
    // id: '60b817b3bd981768d080aa93';
    // name: 'test001 person';
    // teamMemberOf: [];
    // teamsOwned: [];
    // username: 'test001';

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
            <h2 className='heading-light centered py-2'>Hi, {user.name}!</h2>
            <section className='grid-container'>
                <Card className='grid-home-1'>
                    {/* Using my Github profile pic as a placeholder */}
                    <Image src='https://avatars.githubusercontent.com/u/67440557?v=4' />
                    <Card.Content>
                        <Card.Header>{user.name}</Card.Header>
                        <Card.Meta>{`Username: ${user.username}`}</Card.Meta>
                        <Card.Meta>{`Joined: ${user.createdAt}`}</Card.Meta>
                        <Card.Description>{user.bio}</Card.Description>
                    </Card.Content>
                    <Card.Content>Stats:</Card.Content>
                </Card>

                <HomepageCard user={user} header='Teams Joined:' />
                <HomepageCard user={user} header='Teams Captained:' />
            </section>
        </main>
    );
};
