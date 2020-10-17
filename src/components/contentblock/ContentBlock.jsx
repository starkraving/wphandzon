import React from 'react';
import { useRef } from 'react';
import { useContext } from 'react';
import { EditorContext } from '../../providers/editor.provider';

const ContentBlock = ({styles, html, layout, children}) => {
    const {setActiveElementCoords} = useContext(EditorContext);
    const contentRef = useRef();

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
        setActiveElementCoords({top: top + window.scrollX, left: left + window.scrollY, width, height});
        e.stopPropagation();
    };

    const handleMouseOut = (e) => {
        setActiveElementCoords(null);
        e.stopPropagation();
    }

    return (html) 
        ? <div ref={contentRef} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} style={styles} dangerouslySetInnerHTML={contentFromBlock()}/>
        : <div ref={contentRef} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} style={styles}>
            {children.map(blockProps => (<ContentBlock key={blockProps.id} {...blockProps} />))}
        </div>;
};

export default ContentBlock;