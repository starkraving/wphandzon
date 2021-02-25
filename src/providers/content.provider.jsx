import React, { useState, useEffect, useCallback } from 'react';
import {addNewContent} from '../utils/content';

const defaults = {
    content: {id: null, styles: {}, html: null, layout: null, children: []}
};

export const ContentContext = React.createContext({
    content: defaults.content,
    addContent: (parentId, row, newContent) => {},
    editContent: (parentId, row, id, content) => {},
    removeContent: (parentId, row, id) => {}
});

const ContentProvider = ({pageService, children}) => {
    const [content, setContent] = useState(defaults.content);

    const addContent = (parentId, row, newContent) => {
        setContent(addNewContent(content, parentId, row, newContent));
    };
    
    const editContent = (parentId, row, id, content) => {};

    const removeContent = (parentId, row, id) => {
        console.log('DELETE: ', parentId, row, id);
    };

    const getInitialContent = useCallback(() => {
        pageService.getPageData().then(data => {
            setContent(data);
        });
    }, [pageService]);

    useEffect(() => {
        getInitialContent();
    }, [getInitialContent]);

    return (
        <ContentContext.Provider value={{
            content,
            addContent,
            editContent,
            removeContent,
        }}>{children}</ContentContext.Provider>
    );
}

export default ContentProvider;