import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';

import { AboutMe, Home, PhotosManager, Tag, Trip, Trips } from './components';


export const App = () => {
    const [selectedMenuLink, setSelectedMenuLink] = useState(null);
    return (
        <Router>
            <nav>
                <div className="nav-wrapper">
                    <ul className="left">
                        <li className="home-page-icon">
                            <Link to="/" className={`home_page_icon${selectedMenuLink === 'home' ? ' nav-selected' : ''}`}>
                                <i className="material-icons left">home</i>
                            </Link>
                        </li>
                        <li><Link to="/podroze" className={selectedMenuLink === 'trips' ? 'nav-selected' : ''}>Podróże</Link></li>
                        <li><Link to="/o-mnie" className={selectedMenuLink === 'aboutMe' ? 'nav-selected' : ''}>O mnie</Link></li>
                        <li>
                            <span className="capitals_counter" title="Odwiedzone stolice">
                                <i className="material-icons right">account_balance</i>27 x
                            </span>
                        </li>
                    </ul>
                </div>
            </nav>

            <main>
                <section className="banner">
                    geodotka w podróży <i className="material-icons flight-takeoff">flight_takeoff</i>
                </section>
                <Switch>
                    <Route exact path="/">
                        <Home setSelectedMenuLink={setSelectedMenuLink} />
                    </Route>
                    <Route exact path="/podroze">
                        <Trips setSelectedMenuLink={setSelectedMenuLink} />
                    </Route>
                    <Route exact path="/podroze/:id">
                        <Trip />
                    </Route>
                    <Route exact path="/tagi/:slug">
                        <Tag />
                    </Route>
                    <Route exact path="/o-mnie">
                        <AboutMe setSelectedMenuLink={setSelectedMenuLink} />
                    </Route>
                    <Route exact path="/photos-manager">
                        <PhotosManager />
                    </Route>
                    <Route exact path="*">
                        <div class="error404"><span>404</span>strona nie istnieje</div>
                    </Route>
                </Switch>
            </main>

            <footer>
                copyright by geodotka {(new Date).getFullYear()}
            </footer>
        </Router>
    )
};

const wrapper = document.getElementById('react');
wrapper ? ReactDOM.render(<App />, wrapper) : null;
