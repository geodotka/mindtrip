import React, { Component } from 'react';


export default class PhotoManager extends Component {

    constructor(props) {
        super(props);

        this.state = {
            trips: [],
            selectedTripId: null,
        };
    }

    componentDidMount() {
        fetch('/api/trips')
            .then(response => response.json())
            .then(data => {
                this.setState({
                    trips: data,
                });
            });
    }

    render() {
        return (
            <div style={{display: 'flex'}}>
                <div style={{}}>
                    <div>Wybierz wycieczkę</div>
                    {this.renderTrips()}
                </div>
                <div style={{position: 'relative'}}>
                    <div style={{position: 'sticky', top: 100}}>
                        {this.renderTripForm()}
                    </div>
                </div>
            </div>
        )
    }

    renderTrips() {
        return this.state.trips.map(trip => this.renderTrip(trip))
    }

    renderTrip(trip) {
        const stylesSelected = {color: 'darkgreen', display: 'flex'};
        const stylesUnselected = {display: 'flex', cursor: 'pointer'};
        return (
            <p
                style={this.state.selectedTripId === trip.id ? stylesSelected : stylesUnselected}
                onClick={() => this.setState({selectedTripId: trip.id})}
            >
                <img src={trip.picture} style={{width: 120, height: 90}} />
                <div style={{display: 'box', fontSize: 15}}>
                    <p style={{margin: 4}}>{trip.destination}</p>
                    <p style={{margin: 4}}>({trip.country})</p>
                    <p style={{margin: 4}}>({trip.startAt} - {trip.endAt})</p>
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
            <p>{day.name} {day.date.length > 0 && `(${day.date})`}</p>
        )
    }

}
