import React, { useEffect, useState } from 'react';

import { observeImages } from '../helpers';


export const AboutMe = ({trip}) => {
    const [selectedTab, setSelectedTab] = useState(null);
    const [data, setData] = useState(null);

    useEffect(() => {
        setSelectedTab('basic');
    }, []);

    useEffect(() => {
        fetch('/api/about_me')
            .then(response => response.json())
            .then(data => {
                setData(data);
            });
    }, []);

    useEffect(() => {
        observeImages();
    }, [selectedTab]);

    return (
        <>
            <div className="trips-tabs">
                {[
                    ['Podstawowe informacje', 'basic'],
                    ['Mapa', 'map'],
                    ['Odwiedzone kraje', 'countries'],
                    ['Odwiedzone stolice', 'capitals']
                ].map(([label, name]) => (
                    <div
                        className={`trips-tab${name === selectedTab ? ' trips-tab-selected' : ''}`}
                        key={name}
                        onClick={() => setSelectedTab(name)}>
                        {label}
                    </div>
                ))}
            </div>

            {selectedTab === 'basic' && (
                <section>
                    <section>
                        <p className="leonardo-sentence">"I gdy już poznasz smak lotu,
                            będziesz chodzić po ziemi ze wzrokiem skierowanym w&nbsp;niebo,
                            gdzie byłeś, dokąd tęsknisz i&nbsp;pragniesz wrócić..."</p>
                        <p className="leonardo-author">Leonardo da Vinci</p>
                    </section>

                    <section className="about-me-with-polaroid">
                        <div>
                            <p>Moje świadome podróżowanie zaczęło się w&nbsp;podstawówce, były to
                                wycieczki po Polsce, później z&nbsp;jednodniowymi wypadami do
                                sąsiednich stolic. To stamtąd został mi sentyment do Wiednia
                                chociażby, do którego wróciłam jeszcze trzykrotnie już
                                samodzielnie.</p>
                            <p>Po studiach byłam na trzech autokarowych wycieczkach
                                zorganizowanych: do Chorwacji, Hiszpanii i&nbsp;Włoch.
                            </p>
                        </div>
                        <div className="polaroid-item">
                            <div className="polaroid">
                                <img src="" data-src={`${window.staticUrl}img/geodotka2.jpg`} />
                                <div className="container">geodotka w Chorwacji</div>
                            </div>
                        </div>
                    </section>

                    <section className="about-me-with-polaroid">
                        <div>
                            <p>
                                Pierwszy raz do samolotu wsiadłam w&nbsp;sierpniu 2014 r.
                                Była to zorganizowana wycieczka na Sycylię.
                            </p>
                            <p>Po tym wyjeździe stwierdziłam, że chcę samodzielnie organizować
                                swój czas, w zwiazku z czym zaczęłam kombinować gdzie, jak,
                                kiedy i za ile. Pierwsze moje wyjazdy były do Cambridge i Londynu (2015 r.),
                                Budapesztu, Hanoweru i Amsterdamu (2016 r.).
                            </p>
                        </div>
                        <div className="polaroid-item">
                            <div className="polaroid">
                                <img src="" data-src={`${window.staticUrl}img/geodotka.jpg`} />
                                <div className="container">geodotka na Etnie</div>
                            </div>
                        </div>
                    </section>

                    <section>
                        <p>
                            Na wyjazdy nie ruszam się bez kubka i&nbsp;grzałki, która pamięta czasy,
                            kiedy nie było mnie jeszcze na świecie.
                            Poza tym zwykle mam pół plecaka jedzenia, bo jestem niejadkiem
                            i polowanie na jedzenie na wyjazdach to dla mnie prawdziwa męka,
                            zwłaszcza że nie przepadam za słodkościami i unikam owoców morza.
                        </p>
                        <p>
                            Lubię poznawać topografię Europy i&nbsp;planować kolejne wyprawy.
                            Moim kryterium wyboru celu wyjazdu jest przede wszystkim miejsce,
                            w&nbsp;którym jeszcze nie byłam lub w&nbsp;którym byłam, ale mam
                            niedosyt i&nbsp;chcę zobaczyć jeszcze raz. Wyjątkiem są włoskie
                            miasta, do których zawsze chętnie wrócę, bo uwielbiam ich
                            architekturę. Lubię mista o&nbsp;zwartych centrach, gdzie na
                            piechotę mogę ogarnąć dużą część tego, co warto zobaczyć. Nie
                            przepadam za nowoczesnością (choć lubię ciekawe wysokie budynki),
                            więc szukam miejsc z&nbsp;obiektami, które stoją już jakiś czas.
                            No i&nbsp;rzecz dość istotna: jadę tam, gdzie wiem, że przyjemnie
                            spędzę czas bez nadmiernego kombinowania, jak się poruszać. To ma
                            być urlop, a&nbsp;nie stres związany z&nbsp;tym, że nie dotrę
                            w&nbsp;jakieś miejsce.
                        </p>
                    </section>
                    <section className="about-me-with-polaroid">
                        <div>
                            <p>
                                Kiedyś postanowiłam, że zwiedzę wszystkie stolice Europy. Później
                                zweryfikowałam nieco ten plan: zwiedzę wszystkie stolice Europy,
                                do których da się dotrzeć bez paszportu. Rok po roku konsekwentnie
                                realizuję ten plan. No takie hobby, cóż poradzić.
                            </p>
                            <p>
                                W pewnym momencie życia spodobały mi się wyspy i&nbsp;na nich
                                zaczęłam spędzać tygodniowe wakacje.
                            </p>
                            <p>
                                Unikam tłumów. Mogę zrezygnować ze zwiedzania czegoś, jeśli tylko
                                ten obiekt jest zatłoczony lub gdy prowadzi do niego gigantyczna
                                kolejka.
                            </p>
                            <p>
                                W zwiedzaniu lubię to, że na żywo wszystko wygląda inaczej niż na
                                zdjęciach w&nbsp;przewodnikach, na street view lub fotkach
                                w&nbsp;Internecie.
                            </p>
                            <p>
                                Jeśli chcesz się ze mną skontaktować, możesz to zrobić <a className="email" href="mailto:geodotka@interia.pl">wysyłając e-maila</a>,
                                choć nie obiecuję, że odpiszę ;)
                            </p>
                        </div>
                        <div className="polaroid-item">
                            <div className="polaroid">
                                <img src="" data-src={`${window.staticUrl}img/geodotka3.jpg`} />
                                <div className="container">geodotka aktualnie</div>
                            </div>
                        </div>
                    </section>
                </section>
            )}

            {selectedTab === 'map' && (
                <section>
                    <div className="i-was-there">
                        <div className="polaroid">
                            <img src="" data-src={`${window.staticUrl}img/eurotrip.png?d=06012020`} />
                        </div>
                    </div>
                </section>
            )}
            
            {selectedTab === 'countries' && (
                <section>
                    <div className="capitals">
                        {(data.countries || []).map(country => (
                            <div className="polaroid-item">
                                <div className="polaroid">
                                    <img src="" data-src={`${window.staticUrl}img/trips/countries/${country.fileName}`} />
                                    <div className="container">{country.description}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {selectedTab === 'capitals' && (
                <section>
                    <div className="capitals">
                        {(data.capitals || []).map(capital => (
                            <div className="polaroid-item">
                                <div className="polaroid">
                                    <img src="" data-src={`${window.staticUrl}img/trips/capitals/${capital.fileName}`} />
                                    <div className="container">{capital.description}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </>
    )
};
