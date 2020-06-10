import React, { Component } from 'react';


export default class PhotosForm extends Component {

    constructor(props) {
        super(props);

        this.domain = `http://geodotka.stronazen.pl/`;
        this.urlSuffix = `${this.domain}${props.tripId}/${props.dayId}/`;

        this.state = {
            photos: [...props.photos],
            photoDescription: '',
            photoName: '',
        };
    }

    handleChangePhotoName = (ev) => {
        this.setState({photoName: ev.target.value});
    }

    handleChangePhotoDescription = (ev) => {
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
                    temporaryId: Math.max(...prevState.photos.map(p => p.temporaryId), 0) +1,
                }
            ],
        }));
    }

    handleDeletePhoto = (temporaryId) => {
        this.setState(prevState => ({
            photos: prevState.photos.filter(photo => photo.temporaryId !== temporaryId),
        }));
    }

    render() {
        return (
            <div style={{width: '100%'}}>
                {this.renderPhotos()}
                {this.renderForm()}
            </div>
        )
    }

    renderPhotos() {
        return (
            <section className="photos day-container">
                {this.state.photos.map(photo => this.renderPhoto(photo))}
            </section>
        )
    }

    renderPhoto(photo) {
        return (
            <div className="polaroid-item" key={photo.temporaryId}>
                <div className="polaroid">
                    <img src={this.domain + photo.url} />
                    <i
                        className="material-icons delete"
                        title="Usuń"
                        onClick={() => this.handleDeletePhoto(photo.temporaryId)}
                    >delete</i>
                    <div className="container">{photo.description}</div>
                </div>
            </div>
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
                        onChange={this.handleChangePhotoName} />
                </div>
                <div style={{textAlign: 'left'}}>
                    <label>Opis zdjęcia:</label>
                    <input
                        style={{width: 300}}
                        type="text"
                        value={photoDescription}
                        onChange={this.handleChangePhotoDescription} />
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
