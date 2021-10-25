import React, { useState } from 'react';

import { FaExclamationTriangle } from 'react-icons/fa';
import { connect } from 'react-redux';
import { loginAction } from '../utils/redux/user';

const Login = ({ history, loginAction }) => {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const { email, password } = user;

  const [errorMessage, setErrorMessage] = useState(null);

  const errorDisplay = message => {
    setErrorMessage(message);
    setTimeout(() => setErrorMessage(null), 5000);
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      console.log('try');
      loginAction({ email, password });
      history.push('/home');
    } catch (err) {
      console.error(err);
      errorDisplay(err.message);
    }
  };

  return (
    <main className='col-centered'>
      <h2>Login To Your Account</h2>

      <form className='col-centered form-container' onSubmit={handleSubmit}>
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

export default connect(null, { loginAction })(Login);
