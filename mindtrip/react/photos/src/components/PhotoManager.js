import React, { Component } from 'react';


const TRIPS = [
    {
        id: 30,
        destination: 'Zakintos (Grecja)',
        picture: 'https://geodotkawpodrozy.pythonanywhere.com/media/30/P9264836_01.jpg',
        startAt: '20.09.2019',
        endAt: '27.09.2019',
        days: [
            {
                name: 'Dzień 1, piątek – Laganas',
                date: '20.09.2019',
                photos: [],
            },
            {
                name: 'Dzień 2, sobota – Laganas, Zakintos',
                date: '21.09.2019',
                photos: [],
            },
            {
                name: 'Dzień 3, niedziela – rejs wokół wyspy',
                date: '22.09.2019',
                photos: [],
            },
            {
                name: 'Dzień 4, poniedziałek – półwysep Vasilikos',
                date: '23.09.2019',
                photos: [],
            },
            {
                name: 'Dzień 5, wtorek – Laganas',
                date: '24.09.2019',
                photos: [],
            },
            {
                name: 'Dzień 6, środa – Kefalonia',
                date: '25.09.2019',
                photos: [],
            },
            {
                name: 'Dzień 7, czwartek – wycieczka samochodowa po wyspie',
                date: '26.09.2019',
                photos: [],
            },
            {
                name: 'Dzień 8, piątek – wyspa Marathonisi, Laganas',
                date: '27.09.2019',
                photos: [],
            },
        ],
    },
    {
        id: 29,
        destination: 'Majorka (Hiszpania)',
        picture: 'https://geodotkawpodrozy.pythonanywhere.com/media/29/P6184148.jpg ',
        startAt: '16.06.2019',
        endAt: '23.06.2019',
        days: [
            {
                name: 'Dzień 1, niedziela – El Arenal',
                date: '16.06.2019',
                photos: [],
            },
            {
                name: 'Dzień 2, poniedziałek – El Arenal, Palma',
                date: '17.06.2019',
                photos: [],
            },
            {
                name: 'Dzień 3, wtorek – półwysep Formentor, Sóller',
                date: '18.06.2019',
                photos: [],
            },
            {
                name: 'Dzień 4, środa – Platja de Muro, Alcúdia',
                date: '19.06.2019',
                photos: [],
            },
            {
                name: 'Dzień 5, czwartek – Smocze Jaskinie, Porto Cristo, Cala Millor',
                date: '20.06.2019',
                photos: [],
            },
            {
                name: 'Dzień 6, piątek – Wioska Hiszpańska',
                date: '21.06.2019',
                photos: [],
            },
            {
                name: 'Dzień 7, sobota – Plaça de Toros',
                date: '22.06.2019',
                photos: [],
            },
            {
                name: 'Dzień 8, niedziela – Castell de Bellver',
                date: '23.06.2019',
                photos: [],
            },
            {
                name: 'Majorkańskie murale',
                date: '',
                photos: [],
            },
        ],
    },
]


export default class PhotoManager extends Component {

    constructor(props) {
        super(props);

        this.state = {
            trips: [],
            selectedTripId: null,
        };
    }

    componentDidMount() {
        this.setState({
            trips: TRIPS,
        });
    }

    render() {
        return (
            <div style={{display: 'flex'}}>
                <div style={{}}>
                    <div>Wybierz wycieczkę</div>
                    {this.renderTrips()}
                </div>
                <div style={{}}>
                    {this.renderTripForm()}
                </div>
            </div>
        )
    }

    renderTrips() {
        return this.state.trips.map(trip => this.renderTrip(trip))
    }

    renderTrip(trip) {
        return (
            <p style={this.state.selectedTripId === trip.id ? {border: 'solid 1px', display: 'flex'} : {display: 'flex'}}>
                <img src={trip.picture} style={{width: 200, height: 150}} />
                <div style={{display: 'box'}}>
                    <p>{trip.destination}</p>
                    <p>({trip.startAt} - {trip.endAt})</p>
                    <button onClick={() => this.setState({selectedTripId: trip.id})}>Wybierz</button>
                </div>
            </p>
        )
    }

    renderTripForm() {
        if (!this.state.selectedTripId) {
            return <p>Wybierz wycieczkę z listy</p>
        }

        const trip = this.state.trips.filter(trip => trip.id === this.state.selectedTripId)[0];
        if (!trip) {
            return <p>Wybierz wycieczkę z listy</p>
        }

        return trip.days.map(day => this.renderDay(day))
    }

    renderDay(day) {
        return (
            <p>{day.name} ({day.date})</p>
        )
    }

}
