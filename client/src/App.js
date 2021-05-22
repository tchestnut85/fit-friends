import './index.css';

import { BrowserRouter as Router, Switch } from 'react-router-dom';

import NavBar from './components/NavBar';
import React from 'react';
import { UserProvider } from './utils/state/UserState/UserState';

function App() {
    return (
        <UserProvider>
            <Router>
                <NavBar />
                <Switch>
                    <div>
                        <h1>FIT FRIENDS!</h1>
                    </div>
                </Switch>
            </Router>
        </UserProvider>
    );
}

export default App;
