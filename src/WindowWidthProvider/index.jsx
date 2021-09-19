import React from 'react';
export const WindowWidthContext = React.createContext(null);
const WindowWidthProvider = ({ children }) => {
    const [width, setWidth] = React.useState(null);
    const handleWindowResize = (e) => {
        setWidth(window.innerWidth)
    }
    React.useEffect(() => {
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