import { useCallback, useContext, useEffect } from 'react';
import { ContentContext } from '../providers/content.provider';
import { EditorContext } from '../providers/editor.provider';

const useResizeListener = () => {

    const {resizing, resizingMouseCoords, hoveredElementCoords, setResizingMouseCoords, setElementCoords} = useContext(EditorContext);
    const {resizeContent} = useContext(ContentContext);

    const handleResize = useCallback((...args) => {
        const [activeElement, action, spanChange] = args;
        
        resizeContent(activeElement.parentId, activeElement.layout.row, activeElement.id, action, spanChange);
        // TODO: snap mouse coords to where the active handle is
        setResizingMouseCoords((curr) => [curr[0], curr[2], curr[2], activeElement, activeElement]);
        setElementCoords('active', activeElement.current);

    }, [resizeContent, setResizingMouseCoords, setElementCoords]);

    useEffect(() => {
        const [activeHandle, xStart, xNow, activeElement, hoverElement] = resizingMouseCoords;
        if (!resizing || null === hoveredElementCoords || !activeElement || !hoverElement) {
            return;
        }
        // TODO: handle left-left right-right with no sibling involved
        const {width} = hoveredElementCoords;
        const direction = xNow - xStart;
        const bucket = Math.round(width / hoverElement.layout.span);
        const spanChange = Math.floor(Math.abs(xNow - xStart) / bucket);
        
        if (0 === spanChange) {
            return;
        }

        const action = [activeHandle, (direction < 0 ? 'left' : 'right')].join('-');
        handleResize(activeElement, action, spanChange);
        
    }, [resizing, resizingMouseCoords, hoveredElementCoords, handleResize]);
};

export default useResizeListener;