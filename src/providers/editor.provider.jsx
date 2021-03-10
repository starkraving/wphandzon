import React, { useState } from 'react';
import useWindowScrollListener from '../hooks/useWindowScrollListener';

const defaults = {
    editing: false,
    textEditing: false,
    resizing: false,
    activeElement: null,
    resizingMouseCoords: [],
    hoveredElementCoords: null,
    activeElementCoords: null,
}

export const EditorContext = React.createContext({
    editing: defaults.editing,
    textEditing: defaults.textEditing,
    resizing: defaults.resizing,
    activeElement: defaults.activeElement,
    resizingMouseCoords: defaults.resizingMouseCoords,
    hoveredElementCoords: defaults.hoveredElementCoords,
    activeElementCoords: defaults.activeElementCoords,
    setEditing: () => {},
    setTextEditing: () => {},
    setResizing: () => {},
    setResizingMouseCoords: () => {},
    setHoveredElementCoords: () => {},
    setActiveElementCoords: () => {},
    setElementCoords: () => {},
    setActiveElement: () => {},
});

const EditorProvider = ({children}) => {
    const [editing, setEditing] = useState(defaults.editing);
    const [textEditing, setTextEditing] = useState(defaults.textEditing);
    const [resizing, setResizing] = useState(defaults.resizing);
    const [resizingMouseCoords, setResizingMouseCoords] = useState(defaults.resizingMouseCoords);
    const [hoveredElementCoords, setHoveredElementCoords] = useState(defaults.hoveredElementCoords);
    const [activeElementCoords, setActiveElementCoords] = useState(defaults.activeElementCoords);
    const [activeElement, setActiveElement] = useState(defaults.activeElement);

    const {scrollX, scrollY} = useWindowScrollListener();

    const setElementCoords = (type, ref) => {
        const {top, left, width, height} = ref.getBoundingClientRect();
        const args = {top: (top + scrollY), left: (left + scrollX), width, height};
        switch (type) {
            case 'hovered' :
                setHoveredElementCoords(args);
                break;
            case 'active' :
                setActiveElementCoords(args);
                break;
            default :
                console.warn(`Invalid coord type of "${type}" used in setElementCoords`);
        }
    };

    return (
        <EditorContext.Provider value={{
            editing,
            textEditing,
            resizing,
            activeElement,
            hoveredElementCoords,
            activeElementCoords,
            resizingMouseCoords,
            setEditing,
            setTextEditing,
            setResizing,
            setActiveElement,
            setHoveredElementCoords,
            setActiveElementCoords,
            setResizingMouseCoords,
            setElementCoords
        }}>{children}</EditorContext.Provider>
    );
};

export default EditorProvider;