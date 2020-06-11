import React, { useState } from 'react';


export const PhotoForm = (props) => {

    const { photo } = props;
    const [description, setDescription] = useState(photo.description);
    const [descriptionEditionOn, setDescriptionEditionOn] = useState(false);
    const [isVertical, setIsVertical] = useState(photo.isVertical || false);

    return (
        <div className={`polaroid-item${isVertical ? '' : '-wide'}`}>
            <div className="polaroid">
                <img src={props.domain + photo.url} />
                <i
                    className="material-icons delete"
                    title="Usuń"
                    onClick={() => props.onDeletePhoto(photo.temporaryId)}
                >delete</i>
                <input
                    checked={isVertical}
                    className="is-vertical"
                    title="Pionowe?"
                    type="checkbox"
                    onBlur={() => props.onSaveAttribute(
                        photo.temporaryId, 'isVertical', isVertical)}
                    onChange={(ev) => setIsVertical(ev.target.checked)}
                />
                <div className="container" onDoubleClick={() => setDescriptionEditionOn(true)}>
                    {descriptionEditionOn ? (
                            <input
                                type="text"
                                value={description}
                                onBlur={() => props.onSaveAttribute(
                                    photo.temporaryId, 'description', description,
                                    () => setDescriptionEditionOn(false))}
                                onChange={(ev) => setDescription(ev.target.value)} />
                        ) : description}
                </div>
            </div>
        </div>
    )
}
