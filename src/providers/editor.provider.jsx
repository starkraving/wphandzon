import React, { useState } from 'react';

const defaults = {
    editing: false,
    textEditing: false,
    activeElement: null,
    hoveredElementCoords: null,
    activeElementCoords: null,
}

export const EditorContext = React.createContext({
    editing: defaults.editing,
    textEditing: defaults.textEditing,
    activeElement: defaults.activeElement,
    hoveredElementCoords: defaults.hoveredElementCoords,
    activeElementCoords: defaults.activeElementCoords,
    setEditing: () => {},
    setTextEditing: () => {},
    setHoveredElementCoords: () => {},
    setActiveElementCoords: () => {},
    setActiveElement: () => {},
});

const EditorProvider = ({children}) => {
    const [editing, setEditing] = useState(defaults.editing);
    const [textEditing, setTextEditing] = useState(defaults.textEditing);
    const [hoveredElementCoords, setHoveredElementCoords] = useState(defaults.hoveredElementCoords);
    const [activeElementCoords, setActiveElementCoords] = useState(defaults.activeElementCoords);
    const [activeElement, setActiveElement] = useState(defaults.activeElement);

    return (
        <EditorContext.Provider value={{
            editing,
            textEditing,
            activeElement,
            hoveredElementCoords,
            activeElementCoords,
            setEditing,
            setTextEditing,
            setActiveElement: setActiveElement,
            setHoveredElementCoords,
            setActiveElementCoords
        }}>{children}</EditorContext.Provider>
    );
};

export default EditorProvider;