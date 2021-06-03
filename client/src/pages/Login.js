import React, { useState } from 'react';

import Auth from '../utils/auth';
import { FaExclamationTriangle } from 'react-icons/fa';
import { LOGIN } from '../utils/state/UserState/userActions';
import { loginUser } from '../utils/API';
import { useUserContext } from '../utils/state/UserState/UserState';

export const Login = ({ history }) => {
    const [, dispatch] = useUserContext();

    const [user, setUser] = useState({
        email: '',
        password: '',
    });
    const { email, password } = user;

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
            const response = await loginUser({
                email,
                password,
            });
            const data = await response.json();

            if (!response.ok) {
                throw new Error('There was an error when trying to login.');
            }

            dispatch({
                type: LOGIN,
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
            <h2>Login To Your Account</h2>

            <form
                className='col-centered form-container'
                onSubmit={handleSubmit}
            >
                <div className='form-item mx-2 my-2'>
                    <label htmlFor='email'>Your Email</label>
                    <input
                        type='email'
                        name='email'
                        placeholder='your email'
                        value={email}
                        autoComplete='email'
                        required
                        onChange={handleChange}
                    />
                </div>
                <div className='form-item mx-2 my-2'>
                    <label htmlFor='password'>Password</label>
                    <input
                        type='password'
                        name='password'
                        placeholder='******'
                        value={password}
                        autoComplete='current-password'
                        required
                        onChange={handleChange}
                    />
                </div>

                <button type='submit'>Login</button>
            </form>
            {errorMessage && (
                <p className='error'>
                    <FaExclamationTriangle /> {errorMessage}
                </p>
            )}
        </main>
    );
};
