import './index.css';

import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import { Home } from './pages/Home';
import { Login } from './pages/Login';
// import Auth from './utils/auth';
import NavBar from './components/NavBar';
import React from 'react';
import { Signup } from './pages/Signup';
import { UserProvider } from './utils/state/UserState/UserState';

function App() {
    return (
        <UserProvider>
            <Router>
                <NavBar />
                <Switch>
                    <Route exact path='/' component={Signup} />
                    <Route exact path='/login' component={Login} />
                    <Route exact path='/home' component={Home} />
                </Switch>
            </Router>
        </UserProvider>
    );
}

export default App;
