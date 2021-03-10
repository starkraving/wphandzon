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

export function addNewContent(content, parentId, row, column, newContent) {
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
        column,
        span: 12,
    };
    
    parent.children.push(newContent);
    parent.children = spreadRowChildren(parent.children, row);

    return content;
}

export function deleteContent(content, parentId, row, id) {
    let parent = content;
    if (parentId !== null) {
        parent = find(content, parentId);
        if (!parent) {return content;}
    }

    parent.children = spreadRowChildren(
        parent.children.filter((child) => child.id !== id),
        row
    );

    return content;
}

export function resizeContentRow(content, parentId, row, id, action, spanChange) {
    let parent = content;
    if (parentId !== null) {
        parent = find(content, parentId);
        if (!parent) {return content};
    }

    const children = getElementsByRow(parent.children, row).sort(sortByColumn);
    const pos = children.reduce((carry, el, idx) => {
        if (carry !== false) {
            return carry;
        }
        return (el.child.id === id) ? idx : carry;
    }, false);

    if (pos === false) {return content};

    const prevPos = (pos === 0) ? null : pos - 1;
    const nextPos = (pos === children.length - 1) ? null : pos + 1;

    switch (action) {
        case 'left-left' :
            if (null !== prevPos && children[prevPos].child.layout.span - spanChange < 1) {
                console.warn('sibling min boundary reached');
                break;
            }
            if (children[pos].child.layout.column - spanChange < 1) {
                console.warn('container boundary reached');
                break;
            }
            children[pos].child.layout.column -= spanChange;
            children[pos].child.layout.span += spanChange;
            if (null !== prevPos) {
                children[prevPos].child.layout.span -= spanChange;
            }
            break;

        case 'left-right' :
            if (children[pos].child.layout.span - spanChange < 1) {
                console.warn('min boundary reached');
            }
            children[pos].child.layout.column += spanChange;
            children[pos].child.layout.span -= spanChange;
            if (null !== prevPos) {
                children[prevPos].child.layout.span += spanChange;
            }
            break;

        case 'right-left' :
            if (children[pos].child.layout.span - spanChange < 1) {
                console.warn('min boundary reached');
            }
            children[pos].child.layout.span -= spanChange;
            if (null !== nextPos) {
                children[nextPos].child.layout.column -= spanChange;
                children[nextPos].child.layout.span += spanChange;
            }
            break;

        case 'right-right' :
            if (null !== nextPos && children[nextPos].child.layout.span - spanChange < 1) {
                console.warn('sibling min boundary reached');
                break;
            }
            if (null === nextPos && children[pos].child.layout.column + spanChange > 12) {
                console.warn('container boundary reached');
                break;
            }
            children[pos].child.layout.span += spanChange;
            if (null !== nextPos) {
                children[nextPos].child.layout.column += spanChange;
                children[nextPos].child.layout.span -= spanChange;
            }
            break;

        default:
            console.warn('illegal resize action', action);
    }

    children.forEach((el) => {
        const {idx, child} = el;
        parent.children[idx] = child;
    });

    return content;
}

export function updateContent(content, parentId, row, id, element) {
    let parent = content;
    if (parentId !== null) {
        parent = find(content, parentId);
        if (!parent) {return content;}
    }

    const pos = parent.children.reduce((carry, child, idx) => {
        if (carry !== false) {
            return carry;
        }
        return (child.id === id) ? idx : carry;
    }, false);

    if (pos !== false) {
        parent.children.splice(pos, 1, {
            ...parent.children[pos],
            ...element
        });
        parent.children = spreadRowChildren(parent.children, row);
    }

    return content;
}


function spreadRowChildren(children, row) {
    if (!children || !children instanceof Array || children.length === 0) {
        return children;
    }
    const siblings = getElementsByRow(children, row);

    if (!siblings.length) {
        return children;
    }

    const spread = Math.floor(12 / siblings.length);
    const remainder = 12 - (spread * siblings.length);
    siblings
        .sort(sortByColumn)
        .map(spreadColumns(spread, remainder))
        .forEach((el) => {
            const {idx, child} = el;
            children[idx] = child;
        });
    
    return children;

}

function sortByColumn(prev, next) {
    if (prev.child.layout.column < next.child.layout.column) {
        return -1;
    }
    if (prev.child.layout.column > next.child.layout.column) {
        return 1;
    }
    return 0;
}

function spreadColumns(spread, remainder) {
    return (el, idx, siblings) => {
        el.child.layout.span = spread;
        el.child.layout.column = (idx * spread) + 1;
        if (idx === siblings.length - 1 && remainder) {
            el.child.layout.span += remainder;
        }
        return el;
    };
}

function getElementsByRow(children, row) {
    return children.reduce((collector, child, idx) => {
        if (child.layout.row !== row) {
            return collector;
        }
        collector.push({
            idx,
            child
        });
        
        return collector;
    }, []);
}