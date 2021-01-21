import React, { useEffect, useState } from 'react';

import { observeImages } from '../helpers'


export const TripDay = ({day, photosDomain}) => {
    const [selectedTab, setSelectedTab] = useState(null);

    useEffect(() => {
        if (setSelectedTab === null) { return }
        observeImages();
    }, [selectedTab]);

    function handleSetSelectedTab(name) {
        setSelectedTab(prevVal => {
            return prevVal === name ? null : name
        });
    }

    return (
        <div className="card-panel col s12 m12 12">
            <div className="row">
                <div className="col s12 m6">
                    {day.name}{day.date.length > 0 && ` (${day.date})`}
                </div>
                <div className="col s12 m6">
                    <a
                        className={`waves-effect waves-light btn${selectedTab === 'description' ? ' btn-active' : ''}`}
                        onClick={() => handleSetSelectedTab('description')}>
                        Opis
                    </a>
                    <a
                        className={`waves-effect waves-light btn${selectedTab === 'photos' ? ' btn-active' : ''}`}
                        disabled={!day.photos.length}
                        onClick={() => handleSetSelectedTab('photos')}>
                        Zdjęcia
                    </a>
                    <a
                        className={`waves-effect waves-light btn${selectedTab === 'tips' ? ' btn-active' : ''}`}
                        disabled={!day.tips.length}
                        onClick={() => handleSetSelectedTab('tips')}>
                        Wskazówki
                    </a>
                </div>
            </div>
            
            {selectedTab === 'description' && (
                <article
                    className="day-container"
                    dangerouslySetInnerHTML={{__html: day.description}} />
            )}

            {selectedTab === 'photos' && !!day.photos.length && (
                <section className="photos day-container">
                    {day.photos.map(photo => (
                        <div
                            className={`polaroid-item${!photo.isVertical ? '-wide' : ''}`}
                            key={photo.url}>
                            <div className="polaroid">
                                <img src="" data-src={`${photosDomain}${photo.url}`} />
                                <div className="container">{photo.description}</div>
                            </div>
                        </div>
                    ))}
                </section>
            )}

            {selectedTab === 'tips' && !!day.tips.length && (
                <section className="day-container">
                    <div
                        className="day-container"
                        dangerouslySetInnerHTML={{__html: day.tips}} />
                </section>
            )}
        </div>
    )
};
