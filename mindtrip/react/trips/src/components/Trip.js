import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { observeImages } from '../helpers'
import { TripDay } from './TripDay'
import { TripDetails } from './TripDetails'


export const Trip = (props) => {
    const [data, setData] = useState(null);

    const { id: tripId } = useParams();
    useEffect(() => {
        fetch(`/api/trips/${tripId}`)
            .then(response => response.json())
            .then(data => {
                setData(data);
            });
    }, [tripId]);

    useEffect(() => {
        observeImages();
    }, [data]);

    if (data === null) {
        return null
    }

    const {countries, nextTrip, prevTrip, trip} = data;
    return (
        <>
            {(data.prevTrip !== null || data.nextTrip !== null) && (
                <section className="trip-prev-next">
                    {data.prevTrip !== null && (
                        <Link
                            className="trip-link prev-trip-link"
                            title={prevTrip.destination}
                            to={`/podroze/${prevTrip.id}`}>
                            <div className="trip-link-arrow prev-trip-link-arrow" />
                            Poprzednia
                        </Link>
                    )}
                    {data.nextTrip !== null && (
                        <Link
                            className="trip-link next-trip-link"
                            title={nextTrip.destination}
                            to={`/podroze/${nextTrip.id}`}>
                            Następna
                            <div className="trip-link-arrow next-trip-link-arrow" />
                        </Link>
                    )}
                </section>
            )}

            <section className="trip-header">
                <div className="trip-photo-mobile">
                    <img src="" data-src={trip.pictureUrl} />
                </div>
                <div>
                    <p className="trip-destination">{trip.destination}{countries.includes(trip.destination) ? '' : ` (${countries})`}</p>
                    <p className="trip-dates">{trip.dates}</p>
                    <p className="trip-summary">{trip.summary}</p>
                </div>
            </section>

            <TripDetails trip={trip} />
            {trip.days.map(day => (
                <TripDay day={day} key={day.id} photosDomain={data.photosDomain} />
            ))}
        </>
    )
};
