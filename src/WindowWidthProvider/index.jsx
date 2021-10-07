import React from 'react';
export const WindowWidthContext = React.createContext(null);
const WindowWidthProvider = ({ children }) => {
    const [width, setWidth] = React.useState(null);
    const handleWindowResize = () => setWidth(window.innerWidth)
    React.useEffect(() => {
        handleWindowResize()
        window.addEventListener("resize", handleWindowResize);
        return () => window.removeEventListener("resize", handleWindowResize)
    }, [])
    return (
        <WindowWidthContext.Provider value={{width}}>
            {children}
        </WindowWidthContext.Provider>
    )
}

export default WindowWidthProvider;