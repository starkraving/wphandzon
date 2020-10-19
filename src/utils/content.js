const find = (haystack, needle) => {
    if (haystack.id && haystack.id === needle) {
        return haystack;
    }
    if (haystack.children && haystack.children.length) {
        let child;
        for (let i = 0 ; i < haystack.children.length ; i++) {
            child = find(haystack.children[i], needle);
            console.log(typeof child);
            if (null !== child) {
                return child;
            }
        }
    }

    return null;
}

export function addNewContent(content, parentId, row, newContent) {
    let parent = content;

    if (parentId !== null) {
        parent = find(content, parentId);
        console.log(parent);
        if (!parent) {return content;}
    }

    const maxRow = Math.max(...parent.children.map(item => item.layout.row));
    let contentId = new Date().getTime();
    newContent = {
        ...newContent,
        id: contentId,
        children: newContent.children.map(child => {
            contentId++;
            return {
                ...child,
                id: contentId,
            };
        }),
    };
    if (!row || isNaN(row)) {
        row = maxRow + 1;
    }

    newContent.layout = {
        ...newContent.layout,
        row,
        column: 1,
        span: 12,
    };
    if (maxRow >= row) {
        // TODO: update columns to add in new content;
    }
    
    parent.children.push(newContent);
    // TODO: re-sort content

    return content;
}