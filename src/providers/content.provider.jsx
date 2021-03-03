import React, { useState, useEffect, useCallback } from 'react';
import {addNewContent, deleteContent, updateContent} from '../utils/content';

const defaults = {
    content: {id: null, styles: {}, html: null, layout: null, children: []}
};

export const ContentContext = React.createContext({
    content: defaults.content,
    addContent: (parentId, row, column, newContent) => {},
    editContent: (activeElement) => {},
    removeContent: (activeElement) => {}
});

const ContentProvider = ({pageService, children}) => {
    const [content, setContent] = useState(defaults.content);

    const addContent = (parentId, row, column, newContent) => {
        setContent(addNewContent(content, parentId, row, column, newContent));
    };
    
    const editContent = (activeElement, textEditing) => {
        let {parentId, layout, id, styles, html, children, current} = activeElement;
        if (textEditing) {
            html = current.innerHTML;
        }
        setContent(updateContent(content, parentId, layout.row, id, {
            id,
            styles,
            html,
            layout,
            children
        }));
    };

    const removeContent = (activeElement) => {
        const {parentId, layout, id} = activeElement;
        setContent(deleteContent(content, parentId, layout.row, id));
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