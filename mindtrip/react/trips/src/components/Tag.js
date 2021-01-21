import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { TripPolaroid } from './TripPolaroid';


export const Tag = (props) => {
    const [tag, setTag] = useState(null);
    const [trips, setTrips] = useState([]);

    const { slug } = useParams();
    useEffect(() => {
        fetch(`/api/trips?tag=${slug}`)
            .then(response => response.json())
            .then(data => {
                setTrips(data.trips);
                setTag(data.tag);
            });
    }, []);

    return (
        <div className="card-panel center-align">
            {tag === null
                ? <p>Trwa pobieranie danych...</p>
                : (
                    <>
                        <h4>{tag.name}</h4>
                        <hr />
                        <section className="country">
                            {!!trips.length
                                ? trips.map(trip => (
                                    <TripPolaroid key={trip.id} trip={trip} />
                                ))
                                : <p>Nie ma wycieczek z tym tagiem :(</p>
                            }
                        </section>
                    </>
                )
            }
        </div>
    )
};
