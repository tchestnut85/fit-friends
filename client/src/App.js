import './index.css';

import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import Auth from './utils/auth';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import NavBar from './components/NavBar';
import React from 'react';
import { Signup } from './pages/Signup';
import { UserProvider } from './utils/state/UserState/UserState';

function App() {
    return (
        <Router>
            <UserProvider>
                <div className='app-container'>
                    <NavBar />
                    <Switch>
                        {Auth.loggedIn() ? (
                            <Route exact path='/' component={Home} />
                        ) : (
                            <Route exact path='/' component={Signup} />
                        )}
                        <Route exact path='/signup' component={Signup} />
                        <Route exact path='/login' component={Login} />
                        <Route exact path='/home' component={Home} />
                    </Switch>
                </div>
            </UserProvider>
        </Router>
    );
}

export default App;
