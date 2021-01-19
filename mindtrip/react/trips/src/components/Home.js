import React, { useEffect, useRef, useState } from 'react';


export const Home = (props) => {
    const [trips, setTrips] = useState([]);
    const [visibleTrips, setVisibleTrips] = useState([]);

    useEffect(() => {
        fetch('/api/trips_gallery')
            .then(response => response.json())
            .then(data => {
                setTrips(data.trips);
                setVisibleTrips(data.trips.map(trip => trip.id).slice(0, 3));
            });
    }, []);

    const [news, setNews] = useState([]);
    const [lastId, setLastId] = useState(null);

    useEffect(() => {
        fetch(`/api/news${lastId !== null ? '?from_id=' + lastId : ''}`)
            .then(response => response.json())
            .then(data => setNews(prevNews => [...prevNews, ...data.news]));
    }, [lastId]);
    let lastNewsRef = useRef();

    function handleScroll(e) {
        if (lastNewsRef === null) { return }
        if (lastNewsRef.current.getBoundingClientRect().bottom <= window.innerHeight) {
            setLastId(news[news.length - 1].id);
            document.removeEventListener('scroll', handleScroll);
        }
    }

    useEffect(() => {
        document.addEventListener('scroll', handleScroll);
        return () => document.removeEventListener('scroll', handleScroll);
    }, [news]);

    function handleSetNextTrips(isNext) {
        setVisibleTrips(prevTrips => {
            const tripsIds = trips.map(trip => trip.id);
            const firstIndex = tripsIds.indexOf(prevTrips[1]);
            return isNext
                ? tripsIds.slice(firstIndex, firstIndex + 3)
                : tripsIds.slice(firstIndex - 2, firstIndex + 1)
        })
    }

    let firstTripVisible = false
    let lastTripVisible = false
    if (trips.length > 0 && visibleTrips.length > 0) {
        firstTripVisible = visibleTrips[0] === trips[0].id;
        lastTripVisible = visibleTrips[visibleTrips.length - 1] === trips[trips.length - 1].id;
    }
    return (
        <>
            {trips.length > 0 && visibleTrips.length > 0 && (
                <div className="hp-gallery-container">
                    <div
                        className={`hp-gallery-arrow left${firstTripVisible ? ' disabled' : ''}`}
                        onClick={() => firstTripVisible ? {} : handleSetNextTrips(false)} />
                    <div className="hp-gallery">
                        {trips.map(trip => (
                            <a className={visibleTrips.includes(trip.id) ? '' : 'hidden'} href={trip.url} key={trip.id}>
                                <div>
                                    <img src={trip.pictureUrl} />
                                    {!trip.isComplete && (
                                        <span className="under-construction">
                                            <i className="material-icons build" title="W opracowaniu">build</i>
                                        </span>
                                    )}
                                    <span className="destination">{trip.destination}</span>
                                    <span className="dates">{trip.dates}</span>
                                </div>
                            </a>
                        ))}
                    </div>
                    <div
                        className={`hp-gallery-arrow right${lastTripVisible ? ' disabled' : ''}`}
                        onClick={() => lastTripVisible ? {} : handleSetNextTrips(true)} />
                </div>
            )}
            <div>
                <h3 className="center-align">Aktualności</h3>
            </div>
            {news.map(n => (
                <div className="row" key={n.id} ref={news[news.length - 1].id === n.id ? lastNewsRef : null}>
                    <div className="card-panel col s12 m12 12">
                        <section className="news">
                            <label>{n.createdAt}{n.title.length > 0 && ` - ${n.title}`}</label>
                            <p dangerouslySetInnerHTML={{__html: n.text}} />
                        </section>
                    </div>
                </div>
            ))}
        </>
    )
};
