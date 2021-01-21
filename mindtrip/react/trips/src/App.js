import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { AboutMe, Home, Tag, Trip, Trips } from './components';


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
            <Route exact path="/tagi/:slug">
                <Tag />
            </Route>
            <Route exact path="/o-mnie">
                <AboutMe />
            </Route>
        </Switch>
    </Router>
)

const wrapper = document.getElementById('react');
wrapper ? ReactDOM.render(<App />, wrapper) : null;
