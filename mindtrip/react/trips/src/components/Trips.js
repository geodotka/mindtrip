import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { TripPolaroid } from './TripPolaroid'

export const Trips = ({setSelectedMenuLink}) => {
    const [trips, setTrips] = useState([]);
    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState(null);

    useEffect(() => {
        setSelectedMenuLink('trips');
        return () => setSelectedMenuLink(null)
    }, []);

    const history = useHistory();
    function setCountryInUrl(countryName) {
        history.push(`${history.location.pathname}?kraj=${countryName}`);
    }

    useEffect(() => {
        if (!countries.length) { return }
        const searchParams = new URLSearchParams(history.location.search);
        let countryName = searchParams.get('kraj') || '';
        if (!countries.includes(countryName)) {
            countryName = countries[0];
        }
        setSelectedCountry(countryName);
    }, [history.location, countries]);

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
                }
            });
    }, []);

    if (!trips.length) { return null }

    return (
        <>
            <div className="trips-tabs">
                {countries.map(country => (
                    <div
                        className={`trips-tab${country === selectedCountry ? ' trips-tab-selected' : ''}`}
                        key={country}
                        onClick={() => setCountryInUrl(country)}>
                        {country}
                    </div>
                ))}
            </div>

            <section className="country">
                {trips.filter(
                    trip => trip.country.includes(selectedCountry)).map(trip => (
                        <TripPolaroid key={trip.id} trip={trip} />
                    )
                )}
            </section>
        </>
    )
};
