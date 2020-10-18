import React, { useState } from 'react';

const defaults = {
    editing: false,
    hoveredElementCoords: null,
    activeElementCoords: null,
}

export const EditorContext = React.createContext({
    editing: defaults.editing,
    hoveredElementCoords: defaults.hoveredElementCoords,
    activeElementCoords: defaults.activeElementCoords,
    setEditing: () => {},
    setHoveredElementCoords: () => {},
    setActiveElementCoords: () => {},
});

const EditorProvider = ({children}) => {
    const [editing, setEditing] = useState(defaults.editing);
    const [hoveredElementCoords, setHoveredElementCoords] = useState(defaults.hoveredElementCoords);
    const [activeElementCoords, setActiveElementCoords] = useState(defaults.activeElementCoords);

    return (
        <EditorContext.Provider value={{
            editing,
            hoveredElementCoords,
            activeElementCoords,
            setEditing,
            setHoveredElementCoords,
            setActiveElementCoords
        }}>{children}</EditorContext.Provider>
    );
};

export default EditorProvider;