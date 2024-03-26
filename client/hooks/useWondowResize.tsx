import { useState, useEffect } from 'react';

const useWindowSize = () => {
    const [size, setSize] = useState([window.innerWidth, window.innerHeight]);

    useEffect(() => {
        const resizeHandler = () =>
            setSize([window.innerWidth, window.innerHeight]);
        window.addEventListener('resize', resizeHandler);
        return () => window.removeEventListener('resize', resizeHandler);
    }, []);

    return size;
};

export default useWindowSize;
