import React from 'react';
import { Link } from 'react-router-dom';


export const TripDetails = ({trip}) => {
    const tags = trip.tags || [];
    return (
        <div className="card">
            {tags.length > 0 && (
                <div className="row">
                    <div className="col s12 m12 12">
                        <div className="trip-info">
                            <div className="trip-info-tips">
                                {tags.map(tag => (
                                    <Link
                                        className="waves-effect waves-light btn"
                                        key={tag.id}
                                        to={tag.url}>
                                        {tag.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {[
                [
                    {title: 'Dojazd', mainIcon: 'directions_bus',
                     additionalIcon: null, value: trip.travel},
                    {title: 'Koszty dojazdu', mainIcon: 'directions_bus',
                     additionalIcon: 'euro_symbol', value: trip.travelPrice},
                ],
                [
                    {title: 'Noclegi', mainIcon: 'local_hotel',
                     additionalIcon: null, value: trip.hotel},
                    {title: 'Koszty noclegów', mainIcon: 'local_hotel',
                     additionalIcon: 'euro_symbol', value: trip.hotelPrice},
                ],
                [
                    {title: 'Wyjazd planowany', mainIcon: 'watch_later',
                     additionalIcon: null, value: trip.plannedAt},
                    {title: 'Przwodniki, mapy', mainIcon: 'map',
                     additionalIcon: null, value: trip.guidebook},
                ]
            ].map((rowData, i) => (
                <div className="row" key={i}>
                    {rowData.map(cell => (
                        !!cell.value && (
                            <div className="col s12 m6 6" key={cell.title}>
                                <div className="trip-info">
                                    <div className="trip-icons">
                                        {!!cell.additionalIcon && (
                                            <i className="material-icons">{cell.additionalIcon}</i>
                                        )}
                                        <i className="material-icons" title={cell.title}>{cell.mainIcon}</i>
                                    </div>
                                    <div className="trip-info-description">{cell.value}</div>
                                </div>
                            </div>
                        )
                    ))}
                </div>
            ))}
            
            {trip.tips.length > 0 && (
                <div className="row">
                    <div className="col s12 m12 12">
                        <div className="trip-info">
                            <div
                                className="trip-info-tips"
                                dangerouslySetInnerHTML={{__html: trip.tips}} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
};
