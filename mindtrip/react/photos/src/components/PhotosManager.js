import React, { Component } from 'react';
import PhotosForm from './PhotosForm';


export default class PhotoManager extends Component {

    constructor(props) {
        super(props);

        this.state = {
            trips: [],
            selectedTripId: null,
            selectedDayId: null,
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
                <div style={{borderRight: '1px dashed', padding: 20}}>
                    <div>Wybierz wycieczkę</div>
                    {this.renderTrips()}
                </div>
                <div style={{position: 'relative', width: '70%', padding: 20}}>
                    <div style={{position: 'sticky', top: 100}}>
                        {this.renderTripDetails()}
                    </div>
                </div>
            </div>
        )
    }

    renderTrips() {
        return this.state.trips.map(trip => this.renderTripOnList(trip))
    }

    renderTripOnList(trip) {
        const commonStyles = {display: 'flex', padding: 5};
        const stylesSelected = Object.assign({}, commonStyles, {color: 'darkgreen'});
        const stylesUnselected = Object.assign({}, commonStyles, {cursor: 'pointer'});
        return (
            <div
                key={trip.id}
                style={this.state.selectedTripId === trip.id ? stylesSelected : stylesUnselected}
                onClick={() => this.setState({selectedTripId: trip.id})}
            >
                <img src={trip.picture} style={{width: 120, height: 90}} />
                <div style={{display: 'box', fontSize: 15}}>
                    <p style={{margin: 4}}>{trip.destination}</p>
                    <p style={{margin: 4}}>({trip.country})</p>
                    <p style={{margin: 4}}>({trip.startAt} - {trip.endAt})</p>
                </div>
            </div>
        )
    }

    renderTripDetails() {
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
        const { selectedDayId } = this.state;
        const isSelected = day.id === selectedDayId;
        return (
            <div key={day.id} className={isSelected ? 'card-panel center-align' : 'center-align'}>
                <div
                    className="row"
                    style={{cursor: 'pointer'}}
                    onClick={() => this.setState({selectedDayId: day.id})}
                >
                    {day.name} {day.date.length > 0 && `(${day.date})`}
                </div>
                {isSelected && (
                    <PhotosForm
                        dayId={day.id}
                        photos={day.photos}
                        tripId={this.state.selectedTripId} />
                )}
            </div>
        )
    }
}
