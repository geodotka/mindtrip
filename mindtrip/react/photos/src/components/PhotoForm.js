import React, { useState } from 'react';
import { Draggable, Droppable } from 'react-simple-drag-n-drop';


export const PhotoForm = (props) => {

    const { photo, savingOn } = props;
    const [description, setDescription] = useState(photo.description);
    const [descriptionEditionOn, setDescriptionEditionOn] = useState(false);
    const [isVertical, setIsVertical] = useState(photo.isVertical || false);

    return (
        <Droppable onDropCallback={() => savingOn ? {} : props.onDrop(photo.temporaryId)}>
            <Draggable
                isDragAndDropElement
                onDragCallback={() => props.onDrag(photo.temporaryId)}
            >
                <div className={`polaroid-item${isVertical ? '' : '-wide'}`}>
                    <div className="polaroid">
                        <img src={props.domain + photo.url} />
                        <i
                            className="material-icons delete"
                            title="Usuń"
                            onClick={() => savingOn ? {} : props.onDeletePhoto(photo.temporaryId)}
                        >delete</i>
                        <input
                            checked={isVertical}
                            className="is-vertical"
                            disabled={savingOn}
                            title="Pionowe?"
                            type="checkbox"
                            onBlur={() => props.onSaveAttribute(
                                photo.temporaryId, 'isVertical', isVertical)}
                            onChange={(ev) => setIsVertical(ev.target.checked)}
                        />
                        <div className="container" onDoubleClick={() => savingOn ? {} : setDescriptionEditionOn(true)}>
                            {descriptionEditionOn ? (
                                    <input
                                        disabled={savingOn}
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
            </Draggable>
        </Droppable>
    )
}
