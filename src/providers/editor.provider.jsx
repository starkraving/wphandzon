import React, { useState } from 'react';

const defaults = {
    editing: false,
    activeElementCoords: null
}

export const EditorContext = React.createContext({
    editing: defaults.editing,
    activeElementCoords: defaults.activeElementCoords,
    setEditing: () => {},
    setActiveElementCoords: () => {}
});

const EditorProvider = ({children}) => {
    const [editing, setEditing] = useState(defaults.editing);
    const [activeElementCoords, setActiveElementCoords] = useState(defaults.activeElementCoords);

    return (
        <EditorContext.Provider value={{
            editing,
            activeElementCoords,
            setEditing,
            setActiveElementCoords
        }}>{children}</EditorContext.Provider>
    );
};

export default EditorProvider;