import React, { useState } from 'react';

const Signup = () => {
    const [user, setUser] = useState({
        name: '',
        username: '',
        email: '',
        password: '',
        password2: '',
    });
    const { name, username, email, password, password2 } = user;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    return (
        <main className='col-centered'>
            <h2>Register Your Account</h2>
            <form className='col-centered form-container'>
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
                    <label htmlFor='password'>Confirm Password</label>
                    <input
                        type='password'
                        name='password'
                        value={password}
                        required
                        onChange={handleChange}
                    />
                </div>
            </form>
        </main>
    );
};

export default Signup;
