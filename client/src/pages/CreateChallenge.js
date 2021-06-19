import { Button, Dropdown, Form, Input } from 'semantic-ui-react';
import React, { useEffect, useState } from 'react';
import { createTeam, getCurrentUser } from '../utils/API';

import Auth from '../utils/auth';
import { SET_USER } from '../utils/state/UserState/userActions';
import { useUserContext } from '../utils/state/UserState/UserState';

export const CreateChallenge = () => {
    // Get the logged-in user's context data
    const [userState, userDispatch] = useUserContext();
    // console.log('userState:', userState);

    // Form state
    const [teamFormState, setTeamFormState] = useState({
        teamName: '',
        challengeType: '',
        owner: userState.id,
        duration: '',
        members: [],
    });
    const { teamName, challengeType, owner, duration, members } = teamFormState;
    console.log('teamFormState:', teamFormState);

    // Fetch the logged-in user's data by decoding the JWT from Auth
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

            userDispatch({
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

    const handleChange = (e) => {
        console.log('e:', e);
        const { name, value } = e.target;
        setTeamFormState({ ...teamFormState, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
        } catch (err) {
            console.error(err);
        }
    };

    const challengeTypes = [
        { key: 'Weight Loss', value: 'weight loss', text: 'Weight Loss' },
        { key: 'Running', value: 'running', text: 'Running' },
        { key: 'Walking', value: 'walking', text: 'Walking' },
        {
            key: 'Weight Lifting',
            value: 'weight lifting',
            text: 'Weight Lifting',
        },
        { key: 'Yoga', value: 'yoga', text: 'Yoga' },
    ];

    return (
        <main>
            <h2 className='heading-light centered py-2'>
                Start a Team Challenge
            </h2>
            <section>
                <Form onSubmit={handleSubmit}>
                    <Input
                        type='text'
                        name='teamName'
                        value={teamName}
                        placeholder="Your Team's Name"
                        required
                        onChange={handleChange}
                    />
                    <Dropdown
                        placeholder='Select Type of Challenge'
                        selection
                        name='challengeType'
                        value={challengeType}
                        required
                        options={challengeTypes}
                        onChange={handleChange}
                    ></Dropdown>
                </Form>
            </section>
        </main>
    );
};
