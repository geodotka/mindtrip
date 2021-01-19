import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Home, Trips } from './components';


export const App = () => (
    <Router>
        <Switch>
            <Route exact path="/">
                <Home />
            </Route>
            <Route exact path="/podroze">
                <Trips />
            </Route>
        </Switch>
    </Router>
)

const wrapper = document.getElementById('react');
wrapper ? ReactDOM.render(<App />, wrapper) : null;
