import React, { useState } from 'react';

import Auth from '../utils/auth';
import { SET_USER } from '../utils/state/UserState/userActions';
import { createUser } from '../utils/API';
import { useUserContext } from '../utils/state/UserState/UserState';

export const Signup = ({ history }) => {
    const [, dispatch] = useUserContext();

    const [user, setUser] = useState({
        name: '',
        username: '',
        email: '',
        password: '',
        password2: '',
    });
    const { name, username, email, password, password2 } = user;

    const [errorMessage, setErrorMessage] = useState(null);

    const errorDisplay = (message) => {
        setErrorMessage(message);
        setTimeout(() => setErrorMessage(null), 5000);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (password !== password2) {
                errorDisplay('Password confirmation does not match.');
                return;
            }

            const response = await createUser({
                name,
                email,
                username,
                password,
            });
            const data = await response.json();

            if (!response.ok) {
                throw new Error('There was an error when trying to sign up.');
            }

            dispatch({
                type: SET_USER,
                payload: data.user,
            });

            const { token } = data;
            Auth.login(token);
            history.push('/home');
        } catch (err) {
            console.error(err);
            errorDisplay(err.message);
        }
    };

    return (
        <main className='col-centered'>
            <h2>Register Your Account</h2>

            <form
                className='col-centered form-container'
                onSubmit={handleSubmit}
            >
                <div className='form-item mx-2 my-2'>
                    <label htmlFor='name'>Your Name</label>
                    <input
                        type='text'
                        name='name'
                        value={name}
                        autoComplete='name'
                        placeholder='your full name'
                        required
                        onChange={handleChange}
                    />
                </div>
                <div className='form-item mx-2 my-2'>
                    <label htmlFor='username'>Username</label>
                    <input
                        type='text'
                        name='username'
                        value={username}
                        autoComplete='username'
                        placeholder='your username'
                        required
                        onChange={handleChange}
                    />
                </div>
                <div className='form-item mx-2 my-2'>
                    <label htmlFor='email'>Your Email</label>
                    <input
                        type='email'
                        name='email'
                        value={email}
                        autoComplete='email'
                        placeholder='your email'
                        required
                        onChange={handleChange}
                    />
                </div>
                <div className='form-item mx-2 my-2'>
                    <label htmlFor='password'>Password</label>
                    <input
                        type='password'
                        name='password'
                        value={password}
                        autoComplete='new-password'
                        placeholder='******'
                        required
                        onChange={handleChange}
                    />
                </div>
                <div className='form-item mx-2 my-2'>
                    <label htmlFor='password2'>Confirm Password</label>
                    <input
                        type='password'
                        name='password2'
                        value={password2}
                        autoComplete='confirm-password'
                        placeholder='******'
                        required
                        onChange={handleChange}
                    />
                </div>

                <button type='submit'>Register</button>
            </form>
            {errorMessage && <p className='error'>{errorMessage}</p>}
        </main>
    );
};
