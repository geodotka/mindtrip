import React, { useEffect, useRef, useState } from 'react';


export const Home = (props) => {
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

    return (
        <>
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
