import { useEffect, useState } from "react";

const useWindowScrollListener = () => {
    const [scrollX, setScrollX] = useState(window.scrollX);
    const [scrollY, setScrollY] = useState(window.scrollY);

    const handleScroll = () => {
        setScrollX(window.scrollX);
        setScrollY(window.scrollY);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return {scrollX, scrollY};
};

export default useWindowScrollListener;