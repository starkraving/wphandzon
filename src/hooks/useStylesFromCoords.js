const useStylesFromCoords = (coords) => {
    const topBorderStyles = {
        height: '1px',
        top: (Math.round(coords.top) - 1) + 'px',
        left: (Math.round(coords.left) - 1) + 'px',
        width: (Math.round(coords.width) + 2) + 'px'
    };

    const rightBorderStyles = {
        height: (Math.round(coords.height) + 2) + 'px',
        top: (Math.round(coords.top) - 1) + 'px',
        left: (Math.round(coords.left) + Math.round(coords.width) + 1) + 'px',
        width: '1px'
    };

    const bottomBorderStyles = {
        height: '1px',
        top: (Math.round(coords.top) + Math.round(coords.height) + 1) + 'px',
        left: (Math.round(coords.left) - 1) + 'px',
        width: (Math.round(coords.width) + 2) + 'px'
    };

    const leftBorderStyles = {
        height: (Math.round(coords.height) + 2) + 'px',
        top: (Math.round(coords.top) - 1) + 'px',
        left: (Math.round(coords.left) - 1) + 'px',
        width: '1px'
    };

    return {
        topBorderStyles,
        rightBorderStyles,
        bottomBorderStyles,
        leftBorderStyles
    };
};

export default useStylesFromCoords;