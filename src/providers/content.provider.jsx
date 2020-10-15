import React, { useState, useEffect, useCallback } from 'react';
import {addNewContent} from '../utils/content';

const defaults = {
    content: []
};

export const ContentContext = React.createContext({
    content: defaults.content,
    addContent: (row, newContent) => {},
    editContent: (row, id, content) => {},
    removeContent: (row, id) => {}
});

const ContentProvider = ({pageService, children}) => {
    const [content, setContent] = useState(defaults.content);

    const addContent = (row, newContent) => {
        setContent(addNewContent(content, row, newContent));
    };
    
    const editContent = (row, id, content) => {};

    const removeContent = (row, id) => {};

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