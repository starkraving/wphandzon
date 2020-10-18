import React from 'react';
import useStylesFromCoords from '../../hooks/useStylesFromCoords';
import { Border } from './styles';

const ActiveContentHighlighter = ({coords}) => {
    const {topBorderStyles, rightBorderStyles, bottomBorderStyles, leftBorderStyles} = useStylesFromCoords(coords);

    return (
        <>
            <Border style={topBorderStyles} />
            <Border style={rightBorderStyles} />
            <Border style={bottomBorderStyles} />
            <Border style={leftBorderStyles} />
        </>
    );
}

export default ActiveContentHighlighter;