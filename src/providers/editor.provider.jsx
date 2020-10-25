import React, { useState } from 'react';

const defaults = {
    editing: false,
    activeElementId: null,
    hoveredElementCoords: null,
    activeElementCoords: null,
}

export const EditorContext = React.createContext({
    editing: defaults.editing,
    activeElementId: defaults.activeElementId,
    hoveredElementCoords: defaults.hoveredElementCoords,
    activeElementCoords: defaults.activeElementCoords,
    setEditing: () => {},
    setHoveredElementCoords: () => {},
    setActiveElementCoords: () => {},
    setActiveElementId: () => {},
});

const EditorProvider = ({children}) => {
    const [editing, setEditing] = useState(defaults.editing);
    const [hoveredElementCoords, setHoveredElementCoords] = useState(defaults.hoveredElementCoords);
    const [activeElementCoords, setActiveElementCoords] = useState(defaults.activeElementCoords);
    const [activeElementId, setActiveElementId] = useState(defaults.activeElementId);

    return (
        <EditorContext.Provider value={{
            editing,
            activeElementId,
            hoveredElementCoords,
            activeElementCoords,
            setEditing,
            setActiveElementId,
            setHoveredElementCoords,
            setActiveElementCoords
        }}>{children}</EditorContext.Provider>
    );
};

export default EditorProvider;