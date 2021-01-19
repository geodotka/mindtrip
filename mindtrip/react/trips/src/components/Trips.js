import React, { useEffect, useState } from 'react';

import { observeImages } from '../helpers'

export const Trips = (props) => {
    const [trips, setTrips] = useState([]);
    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState(null);

    useEffect(() => {
        fetch('/api/trips')
            .then(response => response.json())
            .then(data => {
                setTrips(data.trips);
                let countries_ = [];
                for (let country_ of data.trips.map(trip => trip.country)) {
                    countries_ = [...countries_, ...country_.split(', ')];
                }
                countries_ = [...new Set(countries_)].sort(
                    (c1, c2) => c1.localeCompare(c2, 'pl'));
                if (countries_.length) {
                    setCountries(countries_);
                    setSelectedCountry(countries_[0]);
                }
            });
    }, []);

    useEffect(() => {
        observeImages();
    }, [selectedCountry]);

    if (!trips.length) { return null }

    return (
        <>
            <div className="trips-tabs">
                {countries.map(country => (
                    <div
                        className={`trips-tab${country === selectedCountry ? ' trips-tab-selected' : ''}`}
                        key={country}
                        onClick={() => setSelectedCountry(country)}>
                        {country}
                    </div>
                ))}
            </div>

            <section className="country">
                {trips.filter(
                    trip => trip.country.includes(selectedCountry)).map(trip => (
                    <a href={`/podroze/${trip.id}`} key={trip.id}>
                        <div className={`polaroid-item${!trip.isComplete ? ' not-complete' : ''}`}>
                            <div className="polaroid">
                                <div className="polaroid-photo">
                                    <img src="" data-src={trip.picture} />
                                    {!trip.isComplete &&
                                        <i className="material-icons build" title="W opracowaniu">build</i>
                                    }
                                    {trip.describeCapital &&
                                        <i className="material-icons capital" title="stolica">account_balance</i>
                                    }
                                </div>
                                <div className="container">
                                    <div>{trip.destination}</div>
                                    <div>{trip.startAt} - {trip.endAt}</div>
                                </div>
                            </div>
                        </div>
                    </a>
                ))}
            </section>
        </>
    )
};
