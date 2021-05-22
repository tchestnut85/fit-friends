import React, { useState } from 'react';

import Auth from '../utils/auth';
import { createUser } from '../utils/API';

const Signup = () => {
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

            if (!response.ok) {
                throw new Error('There was an error when trying to sign up.');
            }

            const { token } = await response.json();
            Auth.login(token);
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
                        required
                        onChange={handleChange}
                    />
                </div>

                <button type='submit'>Submit</button>
            </form>
            {errorMessage && (
                <p className='error'>There was an error: {errorMessage}</p>
            )}
        </main>
    );
};

export default Signup;
