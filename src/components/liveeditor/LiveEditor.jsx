import React, { useContext } from 'react';
import {ContentContext} from '../../providers/content.provider';
import ContentBlock from '../contentblock/ContentBlock';

const LiveEditor = () => {
    const {content} = useContext(ContentContext);
    return (
        <ContentBlock key={'main'} styles={{}} html={''} layout={null}>{content}</ContentBlock>
    );
}

export default LiveEditor;