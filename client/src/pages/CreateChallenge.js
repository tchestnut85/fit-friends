// TODO items:
// DONE 1: Make a reusable input component to clean up the member inputs
// todo 2: finish the handleSubmit function form submission to create a new team. Need to use the createTeam function
// todo 3: refactor the useState form state mgmt to clean it up.
// todo 4: Refactor the form state handlers to be cleaner. Maybe a switch statement

import { Button, Form, Input, Select } from 'semantic-ui-react';
import React, { useEffect, useState } from 'react';
import { createTeam, getCurrentUser } from '../utils/API';

import { AddMemberInput } from '../components/AddMemberInput';
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
                        <AddMemberInput
                            handleMember={handleMember}
                            teamFormState={teamFormState}
                            setTeamFormState={setTeamFormState}
                            name='member1'
                            member={member1}
                            members={members}
                        />
                        <AddMemberInput
                            handleMember={handleMember}
                            teamFormState={teamFormState}
                            setTeamFormState={setTeamFormState}
                            name='member2'
                            member={member2}
                            members={members}
                        />
                        <AddMemberInput
                            handleMember={handleMember}
                            teamFormState={teamFormState}
                            setTeamFormState={setTeamFormState}
                            name='member3'
                            member={member3}
                            members={members}
                        />
                        <AddMemberInput
                            handleMember={handleMember}
                            teamFormState={teamFormState}
                            setTeamFormState={setTeamFormState}
                            name='member4'
                            member={member4}
                            members={members}
                        />
                    </div>
                    <Button type='submit'>Go!</Button>

                    {/* duration */}
                </Form>
            </section>
        </main>
    );
};
