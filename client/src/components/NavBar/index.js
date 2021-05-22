import Auth from '../../utils/auth';
import { Link } from 'react-router-dom';
import React from 'react';
import runIcon from '../../images/run_circle_black.svg';

const NavBar = () => {
    const logout = (e) => {
        Auth.logout();
    };

    return (
        <header className='nav-header px-1 py-1'>
            <div className='centered'>
                <img
                    src={runIcon}
                    alt='Icon of a runner'
                    className='mx-1 run-icon'
                />
                <h1>
                    <Link to='/'>FitFriends</Link>
                </h1>
            </div>
            <nav>
                {Auth.loggedIn() ? (
                    <ul className='space-around nav-list'>
                        <li>
                            <Link to='/joinchallenge'>Join a Challenge</Link>
                        </li>
                        <li>
                            <Link to='/createchallenge'>
                                Create a Challenge
                            </Link>
                        </li>
                        <li>
                            <button onClick={logout}>Logout</button>
                        </li>
                    </ul>
                ) : (
                    <ul className='space-around nav-list'>
                        <li>
                            <Link to='/login'>Login</Link>
                        </li>
                        <li>
                            <Link to='/register'>Join</Link>
                        </li>
                    </ul>
                )}
            </nav>
        </header>
    );
};

export default NavBar;
