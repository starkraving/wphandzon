import React from 'react';
import { BottomBorder, LeftBorder, RightBorder, TopBorder } from './styles';

const ContentHighlighter = ({coords}) => {
    return (
        <>
            <TopBorder {...coords}/>
            <RightBorder {...coords} />
            <BottomBorder {...coords} />
            <LeftBorder {...coords} />
        </>
    );
}

export default ContentHighlighter;