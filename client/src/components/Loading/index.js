import { Loader } from 'semantic-ui-react';
import React from 'react';

export const Loading = () => {
    return (
        <div className='my-3'>
            <Loader active inline='centered' />;
        </div>
    );
};
