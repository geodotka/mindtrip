import React, { Component } from 'react';
import { PhotoForm } from './PhotoForm';


export default class PhotosForm extends Component {

    constructor(props) {
        super(props);

        this.domain = `http://geodotka.stronazen.pl/`;
        this.urlSuffix = `${this.domain}${props.tripId}/${props.dayId}/`;

        this.state = {
            photos: [...props.photos.map(
                (p, i) => Object.assign({}, p, {temporaryId: i + 1}))],
            photoDescription: '',
            photoName: '',
        };
    }

    handleChangeFormName = (ev) => {
        this.setState({photoName: ev.target.value});
    }

    handleChangeFormDescription = (ev) => {
        this.setState({photoDescription: ev.target.value});
    }

    handleAddPhoto = () => {
        this.setState(prevState => ({
            photoDescription: '',
            photoName: '',
            photos: [
                ...prevState.photos,
                {
                    url: `${this.props.tripId}/${this.props.dayId}/${prevState.photoName}`,
                    description: prevState.photoDescription,
                    isVertical: false,
                    temporaryId: Math.max(...prevState.photos.map(p => p.temporaryId), 0) +1,
                }
            ],
        }));
    }

    handleDeletePhoto = (temporaryId) => {
        this.setState(prevState => ({
            photos: prevState.photos.filter(
                photo => photo.temporaryId !== temporaryId),
        }));
    }

    handleSave = () => {
        // TODO: disable buttons and inputs
        this.props.onSave(
            this.props.tripId,
            this.props.dayId,
            this.state.photos.map(p => ({
                url: p.url,
                description: p.description,
                isVertical: p.isVertical,
            }))
        );
    }

    handleChangePhotoAttribute = (temporaryId, attributeName, value, callback=null) => {
        this.setState(prevState => (
            {
                photos: prevState.photos.map(photo => {
                    if (photo.temporaryId === temporaryId) {
                        photo[attributeName] = value;
                    }
                    return photo
                })
            }
        ), () => {if (callback) { callback() }});
    }

    render() {
        return (
            <div style={{width: '100%'}}>
                {this.renderPhotos()}
                {this.renderForm()}
                <button
                    className="form-button"
                    type="button"
                    onClick={this.handleSave}
                >Zapisz</button>
            </div>
        )
    }

    renderPhotos() {
        return (
            <section className="photos day-container">
                {this.state.photos.map(photo => (
                    <PhotoForm
                        domain={this.domain}
                        key={photo.temporaryId}
                        photo={photo}
                        onDeletePhoto={this.handleDeletePhoto}
                        onSaveAttribute={this.handleChangePhotoAttribute}
                    />
                ))}
            </section>
        )
    }

    renderForm() {
        const { photoDescription, photoName } = this.state;
        return (
            <form>
                <div style={{textAlign: 'left'}}>
                    <label>Nazwa pliku:</label>
                    <input
                        style={{width: 300}}
                        type="text"
                        value={photoName}
                        onChange={this.handleChangeFormName} />
                </div>
                <div style={{textAlign: 'left'}}>
                    <label>Opis zdjęcia:</label>
                    <input
                        style={{width: 300}}
                        type="text"
                        value={photoDescription}
                        onChange={this.handleChangeFormDescription} />
                </div>
                <div style={{textAlign: 'left'}}>
                    <button
                        disabled={photoName.length === 0}
                        style={{margin: 10}}
                        type="button"
                        onClick={this.handleAddPhoto}
                    >Dodaj</button>
                </div>
                {photoName.length > 0 && (
                    <div style={{textAlign: 'left'}}>
                        <p>Podgląd:</p>
                        <img
                            alt="Nie ma takiego zdjęcia"
                            src={`${this.urlSuffix}${photoName}`}
                            style={{maxHeight: 100}} />
                    </div>
                )}
            </form>
        )
    }

}
