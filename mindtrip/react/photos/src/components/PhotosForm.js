import React, { Component } from 'react';
import { PhotoForm } from './PhotoForm';


export default class PhotosForm extends Component {

    constructor(props) {
        super(props);

        this.urlSuffix = `${props.photosDomain}${props.tripId}/${props.dayId}/`;

        this.state = {
            photos: [...props.photos.map(
                (p, i) => Object.assign({}, p, {temporaryId: i + 1}))],
            photoDescription: '',
            photoName: '',
            draggingPhotoTemporaryId: null,
            formOn: false,
            savingOn: false,
            savingInfo: '',
        };

        this.saveMsgTimeout = null;
    }

    componentWillUnmount() {
        if (this.saveMsgTimeout !== null) {
            clearTimeout(this.saveMsgTimeout);
        }
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
            formOn: false,
        }));
    }

    handleDeletePhoto = (temporaryId) => {
        this.setState(prevState => ({
            photos: prevState.photos.filter(
                photo => photo.temporaryId !== temporaryId),
        }));
    }

    handleSave = () => {
        this.setState(
            {savingOn: true, savingInfo: ''},
            () => this.props.onSave(
                this.props.tripId,
                this.props.dayId,
                this.state.photos.map(p => ({
                    url: p.url,
                    description: p.description,
                    isVertical: p.isVertical,
                })),
                () => this.setState(
                    {savingOn: false, savingInfo: 'Dzień zapisany :)'},
                    () => this.saveMsgTimeout = setTimeout(() => {
                        this.setState({savingInfo: ''})
                    }, 3000)
                )
            )
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

    handleDrag = (temporaryId) => {
        this.setState({draggingPhotoTemporaryId: temporaryId});
    }

    handleDrop = (temporaryId) => {
        const { draggingPhotoTemporaryId } = this.state;
        if (!draggingPhotoTemporaryId || draggingPhotoTemporaryId === temporaryId) { return }
        this.setState(prevState => {
            const draggingPhoto = prevState.photos.filter(
                photo => photo.temporaryId === draggingPhotoTemporaryId)[0];
            if (!draggingPhoto) {return {}}
            let photos = [];
            for (let p of prevState.photos.filter(
                    photo => photo.temporaryId !== draggingPhotoTemporaryId)) {
                if (p.temporaryId === temporaryId) {
                    photos.push(draggingPhoto);
                }
                photos.push(p);
            }
            return {photos, draggingPhotoTemporaryId: null}
        });
    }

    render() {
        return (
            <div style={{width: '100%', display: 'block'}}>
                {this.renderPhotos()}
                {this.renderForm()}
                <div style={{margin: 20}}>
                    <button
                        className="btn"
                        disabled={this.state.savingOn}
                        type="button"
                        onClick={this.handleSave}
                    >Zapisz dzień</button>
                </div>
                {this.state.savingInfo.length > 0 && <div>{this.state.savingInfo}</div>}
            </div>
        )
    }

    renderPhotos() {
        return (
            <section className="photos day-container">
                {this.state.photos.map(photo => (
                    <PhotoForm
                        domain={this.props.photosDomain}
                        key={photo.temporaryId}
                        photo={photo}
                        savingOn={this.state.savingOn}
                        onDeletePhoto={this.handleDeletePhoto}
                        onDrag={this.handleDrag}
                        onDrop={this.handleDrop}
                        onSaveAttribute={this.handleChangePhotoAttribute}
                    />
                ))}
            </section>
        )
    }

    renderForm() {
        if (!this.state.formOn) {
            return (
                <div style={{margin: 20}}>
                    <button
                        className="btn"
                        disabled={this.state.savingOn}
                        style={{width: 160}}
                        onClick={() => this.setState({formOn: true})}>
                        Dodaj zdjęcie</button>
                </div>
            )
        }
        const { photoDescription, photoName } = this.state;
        return (
            <div style={{position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)'}}>
                <div style={{display: 'flex', width: '50%', margin: '500px auto', background: 'white', padding: 20, justifyContent: 'center'}}>
                    <form style={{width: '60%'}}>
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
                                className="btn"
                                style={{margin: 10}}
                                type="button"
                                onClick={() => this.setState({formOn: false})}
                            >Anuluj</button>
                            <button
                                className="btn"
                                disabled={photoName.length === 0}
                                style={{margin: 10}}
                                type="button"
                                onClick={this.handleAddPhoto}
                            >Dodaj</button>
                        </div>
                    </form>
                    {photoName.length > 0 && (
                        <div style={{textAlign: 'left'}}>
                            <p>Podgląd:</p>
                            <img
                                alt="Nie ma takiego zdjęcia"
                                src={`${this.urlSuffix}${photoName}`}
                                style={{maxHeight: 100}} />
                        </div>
                    )}
                </div>
            </div>
        )
    }

}
