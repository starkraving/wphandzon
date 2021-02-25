import React, { useState } from 'react';

const defaults = {
    editing: false,
    textEditing: false,
    activeElementId: null,
    hoveredElementCoords: null,
    activeElementCoords: null,
}

export const EditorContext = React.createContext({
    editing: defaults.editing,
    textEditing: defaults.textEditing,
    activeElementId: defaults.activeElementId,
    hoveredElementCoords: defaults.hoveredElementCoords,
    activeElementCoords: defaults.activeElementCoords,
    setEditing: () => {},
    setTextEditing: () => {},
    setHoveredElementCoords: () => {},
    setActiveElementCoords: () => {},
    setActiveElementId: () => {},
});

const EditorProvider = ({children}) => {
    const [editing, setEditing] = useState(defaults.editing);
    const [textEditing, setTextEditing] = useState(defaults.textEditing);
    const [hoveredElementCoords, setHoveredElementCoords] = useState(defaults.hoveredElementCoords);
    const [activeElementCoords, setActiveElementCoords] = useState(defaults.activeElementCoords);
    const [activeElementId, setActiveElementId] = useState(defaults.activeElementId);

    return (
        <EditorContext.Provider value={{
            editing,
            textEditing,
            activeElementId,
            hoveredElementCoords,
            activeElementCoords,
            setEditing,
            setTextEditing,
            setActiveElementId,
            setHoveredElementCoords,
            setActiveElementCoords
        }}>{children}</EditorContext.Provider>
    );
};

export default EditorProvider;