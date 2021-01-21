import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Home, Trip, Trips } from './components';


export const App = () => (
    <Router>
        <Switch>
            <Route exact path="/">
                <Home />
            </Route>
            <Route exact path="/podroze">
                <Trips />
            </Route>
            <Route exact path="/podroze/:id">
                <Trip />
            </Route>
        </Switch>
    </Router>
)

const wrapper = document.getElementById('react');
wrapper ? ReactDOM.render(<App />, wrapper) : null;
