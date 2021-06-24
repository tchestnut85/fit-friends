// TODO items:
// todo 1: Make a reusable input component to clean up the member inputs
// todo 2: refactor the useState form state mgmt to clean it up.
// todo 3: Refactor the form state handlers to be cleaner. Maybe a switch statement

import { Button, Form, Input, Select } from 'semantic-ui-react';
import React, { useEffect, useState } from 'react';
import { createTeam, getCurrentUser } from '../utils/API';

import Auth from '../utils/auth';
import { SET_USER } from '../utils/state/UserState/userActions';
import { challengeTypes } from '../utils/challengeTypes';
import { useUserContext } from '../utils/state/UserState/UserState';

export const CreateChallenge = () => {
    // Get the logged-in user's context data
    const [userState, userDispatch] = useUserContext();
    console.log('userState:', userState);

    // Form state ----------------------------------
    const [memberState, setMember] = useState({
        member1: '',
        member2: '',
        member3: '',
        member4: '',
    });
    const { member1, member2, member3, member4 } = memberState;
    console.log('memberState:', memberState);

    const [teamFormState, setTeamFormState] = useState({
        teamName: '',
        challengeType: '',
        owner: userState.user.id,
        duration: '',
        members: [],
    });
    const { teamName, challengeType, owner, duration, members } = teamFormState;
    console.log('teamFormState:', teamFormState);
    //  Form State end -----------------------------------

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

    // On page load, fetch the user's data
    useEffect(() => {
        getUserData();
        // eslint-disable-next-line
    }, []);

    // Handle the form state changes and form submission------------------------------
    const handleChange = (e) => {
        const { name, value } = e.target;
        setTeamFormState({ ...teamFormState, [name]: value });
    };

    const handleSetChallengeType = (e, data) => {
        setTeamFormState({ ...teamFormState, challengeType: data.value });
    };

    const handleMember = (e) => {
        const { name, value } = e.target;
        setMember({ ...memberState, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            // members.push(member);
            setMember({
                member1: '',
                member2: '',
                member3: '',
                member4: '',
            });
        } catch (err) {
            console.error(err);
        }
    };
    // End the form handling state changes ------------------------------

    return (
        <main>
            <h2 className='heading-light centered py-2'>
                Start a Team Challenge
            </h2>
            <section>
                <Form
                    onSubmit={handleSubmit}
                    className='col-centered space-between create-form'
                >
                    <Input
                        type='text'
                        name='teamName'
                        value={teamName}
                        placeholder="Your Team's Name"
                        required
                        onChange={handleChange}
                    />
                    <Select
                        placeholder='Select Type of Challenge'
                        name='challengeType'
                        required
                        options={challengeTypes}
                        onChange={handleSetChallengeType}
                    />
                    {/* Add members - for now, user must know other user's username and we'll search that to get the user's ID  */}
                    <div className='col-centered'>
                        <label>Add Team Members</label>
                        <Input
                            type='text'
                            name='member1'
                            value={member1}
                            placeholder='Add a Team Member'
                            required
                            onChange={handleMember}
                            onBlur={() =>
                                setTeamFormState({
                                    ...teamFormState,
                                    members: [...members, member1],
                                })
                            }
                        />
                        <Input
                            type='text'
                            name='member2'
                            value={member2}
                            placeholder='Add a Team Member'
                            required
                            onChange={handleMember}
                            onBlur={() =>
                                setTeamFormState({
                                    ...teamFormState,
                                    members: [...members, member2],
                                })
                            }
                        />
                        <Input
                            type='text'
                            name='member3'
                            value={member3}
                            placeholder='Add a Team Member'
                            required
                            onChange={handleMember}
                            onBlur={() =>
                                setTeamFormState({
                                    ...teamFormState,
                                    members: [...members, member3],
                                })
                            }
                        />
                        <Input
                            type='text'
                            name='member4'
                            value={member4}
                            placeholder='Add a Team Member'
                            required
                            onChange={handleMember}
                            onBlur={() =>
                                setTeamFormState({
                                    ...teamFormState,
                                    members: [...members, member4],
                                })
                            }
                        />
                    </div>
                    <Button type='submit'>Submit!</Button>

                    {/* duration */}
                </Form>
            </section>
        </main>
    );
};
