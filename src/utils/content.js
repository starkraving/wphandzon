export function addNewContent(content, row, newContent) {
    const maxRow = Math.max(...content.map(item => item.layout.row));
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
    
    content.push(newContent);
    // TODO: re-sort content

    return content;
}