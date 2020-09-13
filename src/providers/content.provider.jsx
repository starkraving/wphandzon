import React, { useState, useEffect } from 'react';

const defaults = {
    content: []
};

export const ContentContext = React.createContext({
    content: defaults.content,
    addContent: () => {},
    editContent: () => {},
    removeContent: () => {}
});

const ContentProvider = ({pageService, children}) => {
    const [content, setContent] = useState(defaults.content);

    const addContent = (row, newContent) => {
        newContent = {
            ...newContent,
            id: new Date().getTime()
        };
        if (row === null) {
            content.push([newContent])
        }
        if (!isNaN(row) && content.length > row) {
            content[row].push(newContent);
        }
        
        setContent(content);
    };
    
    const editContent = (row, id, content) => {};

    const removeContent = (row, id) => {};

    useEffect(() => {
        pageService.getPageData().then(data => {
            setContent(data);
        });
    }, [pageService]);

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