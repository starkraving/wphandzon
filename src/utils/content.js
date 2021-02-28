export const find = (haystack, needle) => {
    if (haystack.id && haystack.id === needle) {
        return haystack;
    }
    if (haystack.children && haystack.children.length) {
        let child;
        for (let i = 0 ; i < haystack.children.length ; i++) {
            child = find(haystack.children[i], needle);
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

    return content;
}

export function deleteContent(content, parentId, row, id) {
    let parent = content;
    if (parentId !== null) {
        parent = find(content, parentId);
        if (!parent) {return content;}
    }

    parent.children = spreadRemainingRowChildren(
        parent.children.filter((child) => child.id !== id),
        row
    );

    return content;
}

function spreadRemainingRowChildren(children, row) {
    if (!children || !children instanceof Array || children.length === 0) {
        return children;
    }
    const siblings = children.reduce((collector, child, idx) => {
        if (child.layout.row !== row) {
            return collector;
        }
        collector.push({
            idx,
            child
        });
        
        return collector;
    }, []);

    if (!siblings.length) {
        return children;
    }

    const spread = Math.floor(12 / siblings.length);
    const remainder = 12 - (spread * siblings.length);
    siblings
        .sort((prev, next) => {
            if (prev.child.layout.column < next.child.layout.column) {
                return -1;
            }
            if (prev.child.layout.column > next.child.layout.column) {
                return 1;
            }
            return 0;
        })
        .map((el, idx, siblings) => {
            el.child.layout.span = spread;
            el.child.layout.column = (idx * spread) + 1;
            if (idx === siblings.length - 1 && remainder) {
                el.child.layout.span += remainder;
            }
            return el;
        })
        .forEach((el) => {
            const {idx, child} = el;
            children[idx] = child;
        });
    
    return children;

}