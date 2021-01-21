import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { observeImages } from '../helpers';


export const TripPolaroid = ({trip}) => {
    let imgRef = React.createRef();

    useEffect(() => {
        observeImages(imgRef.current);
    }, []);

    return (
        <Link to={`/podroze/${trip.id}`}>
            <div className={`polaroid-item${!trip.isComplete ? ' not-complete' : ''}`}>
                <div className="polaroid">
                    <div className="polaroid-photo">
                        <img data-src={trip.pictureUrl} ref={imgRef} src="" />
                        {!trip.isComplete &&
                            <i className="material-icons build" title="W opracowaniu">build</i>
                        }
                        {trip.describeCapital &&
                            <i className="material-icons capital" title="stolica">account_balance</i>
                        }
                    </div>
                    <div className="container">
                        <div>{trip.destination}</div>
                        <div>{trip.startAt === trip.endAt ? trip.startAt : `${trip.startAt} - ${trip.endAt}`}</div>
                    </div>
                </div>
            </div>
        </Link>
    )
};
