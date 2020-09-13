import React from 'react';

const ContentBlock = ({styles, html, layout, children}) => {
    const contentFromBlock = () => {
        return {
            __html: html
        };
    };

    // will want to switch from inline styles to styled component with layout as arg
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
            msGridColumns: '1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1f4 1fr 1fr 1fr'
        } : {};

    styles = {
            ...styles,
            ...layoutStyles,
            ...parentStyles
        };
    return (html) ? <div style={styles} dangerouslySetInnerHTML={contentFromBlock()}/>
                  : <div style={styles}>
                        {children.map(blockProps => (<ContentBlock key={blockProps.id} {...blockProps} />))}
                    </div>;
};

export default ContentBlock;