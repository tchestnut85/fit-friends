import './index.css';

import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import NavBar from './components/NavBar';
import { Provider } from 'react-redux';
import React from 'react';
import { Signup } from './pages/Signup';
import { UserProvider } from './utils/state/UserState/UserState';
import store from './utils/redux/store';

function App() {
  return (
    <Router>
      <Provider store={store}>
        <UserProvider>
          <NavBar />
          <Switch>
            <Route exact path='/' component={Signup} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/home' component={Home} />
          </Switch>
        </UserProvider>
      </Provider>
    </Router>
  );
}

export default App;
