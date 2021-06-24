import { Input } from 'semantic-ui-react';
import React from 'react';

export const AddMemberInput = ({
    name,
    member,
    members,
    setTeamFormState,
    teamFormState,
    handleMember,
}) => {
    return (
        <Input
            type='text'
            name={name}
            value={member}
            placeholder='Add a Team Member'
            required
            onChange={handleMember}
            onBlur={() =>
                setTeamFormState({
                    ...teamFormState,
                    members: [...members, member],
                })
            }
        />
    );
};
