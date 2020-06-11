import React, { useState } from 'react';


export const PhotoForm = (props) => {

    const { photo } = props;
    const [description, setDescription] = useState(photo.description);
    const [descriptionEditionOn, setDescriptionEditionOn] = useState(false);

    return (
        <div className="polaroid-item">
            <div className="polaroid">
                <img src={props.domain + photo.url} />
                <i
                    className="material-icons delete"
                    title="Usuń"
                    onClick={() => props.onDeletePhoto(photo.temporaryId)}
                >delete</i>
                <div className="container" onDoubleClick={() => setDescriptionEditionOn(true)}>
                    {descriptionEditionOn ? (
                            <input
                                type="text"
                                value={description}
                                onBlur={() => props.onSaveDescription(
                                    photo.temporaryId, description, () => setDescriptionEditionOn(false))}
                                onChange={(ev) => setDescription(ev.target.value)} />
                        ) : description}
                </div>
            </div>
        </div>
    )
}
