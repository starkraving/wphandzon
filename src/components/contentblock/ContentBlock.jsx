import React from 'react';
import { useRef } from 'react';
import { useContext } from 'react';
import useWindowScrollListener from '../../hooks/useWindowScrollListener';
import { EditorContext } from '../../providers/editor.provider';

const ContentBlock = ({styles, html, layout, children}) => {
    const {setHoveredElementCoords, setActiveElementCoords, setEditing} = useContext(EditorContext);
    const contentRef = useRef();
    const {scrollX, scrollY} = useWindowScrollListener();

    const contentFromBlock = () => {
        return {
            __html: html
        };
    };

    // will want to switch from inline styles to styled component with layout, styles and children as arg
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
        const {top, left, width, height} = contentRef.current.getBoundingClientRect();
        setHoveredElementCoords({top: (top + scrollY), left: (left + scrollX), width, height});
        e.stopPropagation();
    };

    const handleMouseOut = (e) => {
        setHoveredElementCoords(null);
        e.stopPropagation();
    }

    const handleClick = (e) => {
        const {top, left, width, height} = contentRef.current.getBoundingClientRect();
        setEditing(true);
        setActiveElementCoords({top: (top + scrollY), left: (left + scrollX), width, height});
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
    }

    const props = {
        ref: contentRef,
        onMouseOver: handleMouseOver,
        onMouseOut: handleMouseOut,
        onClick: handleClick,
        style: styles
    };

    return (html) 
        ? <div {...props} dangerouslySetInnerHTML={contentFromBlock()}/>
        : <div {...props}>
            {children.map(blockProps => (<ContentBlock key={blockProps.id} {...blockProps} />))}
        </div>;
};

export default ContentBlock;