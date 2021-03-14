import React from 'react';
import { useRef } from 'react';
import { useContext } from 'react';
import { EditorContext } from '../../providers/editor.provider';

const ContentBlock = ({parentId, id, styles, html, layout, children}) => {
    const {
        setHoveredElementCoords,
        setResizingMouseCoords,
        setEditing,
        setTextEditing,
        setActiveElement,
        activeElement,
        textEditing,
        resizing,
        setElementCoords
    } = useContext(EditorContext);

    const contentRef = useRef();

    const currentElement = {
        parentId,
        id,
        styles,
        html,
        layout,
        children,
        current: contentRef.current
    };

    const contentFromBlock = () => {
        return {
            __html: html
        };
    };

    const layoutStyles = (layout) ? {
        gridRow: layout.row,
        msGridRow: layout.row,
        gridColumn: layout.column + ' / span ' + layout.span,
        msGridColumn: layout.column,
        msGridColumnSpan: layout.span
    } : {};
    
    const parentStyles = (children && children.length) ? {
        display: 'grid',
        msDisplay: 'grid',
        gridTemplateColumns: 'repeat(12, 1fr)',
        msGridColumns: '1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr'
    } : {};

    styles = {
        ...styles,
        ...layoutStyles,
        ...parentStyles,
        position: 'relative'
    };

    const handleMouseOver = (e) => {
        if (textEditing) {
            return;
        }
        setElementCoords('hovered', contentRef.current);
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
    };

    const handleMouseOut = (e) => {
        if (textEditing) {
            return;
        }
        setHoveredElementCoords(null);
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
    }

    const handleMouseMove = (e) => {
        const ts = Date.now();
        // de-bouncing
        if (!resizing || !activeElement || ts % 100 !== 0) {
            return;
        }
        // resizing into a sibling or resizing on its own row
        if (-1 === [parentId, id].indexOf(activeElement.parentId) || (parentId === activeElement.parentId && layout.row !== activeElement.layout.row)) {
            return;
        }
        
        const screenX = e.screenX;
        setResizingMouseCoords((curr) => [
                curr[0],
                curr[1],
                screenX,
                activeElement,
                (id === activeElement.parentId) ? activeElement : currentElement
            ]
        );
        setElementCoords('active', activeElement.current);
        setElementCoords('hovered', contentRef.current);
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
    }

    const handleClick = (e) => {
        if (!textEditing) {
            setEditing(true);
            setElementCoords('active', contentRef.current);
            setActiveElement(currentElement);
        }
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
    }

    const handleDblClick = (e) => {
        if (!textEditing && !children.length) {
            setTextEditing(true);
            setElementCoords(('active'), contentRef.current);
            setActiveElement(currentElement);
            setTimeout(() => {currentElement.current.focus();}, 0);
        }
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
    }

    const handleKeyUp = (e) => {
        if (!textEditing) {
            return;
        }
        setElementCoords('active', contentRef.current);
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
    }

    const props = {
        ref: contentRef,
        onMouseOver: handleMouseOver,
        onMouseOut: handleMouseOut,
        onMouseMove: handleMouseMove,
        onClick: handleClick,
        onDoubleClick: handleDblClick,
        onKeyUp: handleKeyUp,
        style: styles
    };
    if (textEditing && activeElement.id === id) {
        props.contentEditable = 'true';
    }
    if (resizing) {
        props.unselectable = 'on';
    }

    return (html) 
        ? <div {...props} dangerouslySetInnerHTML={contentFromBlock()}/>
        : <div {...props}>
            {children.map(blockProps => (<ContentBlock key={blockProps.id} parentId={id} {...blockProps} />))}
        </div>;
};

export default ContentBlock;