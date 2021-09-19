import React from "react";

export const AppContext = React.createContext({});
const AppProvider = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
    return <AppContext.Provider value={{ isSidebarOpen, setIsSidebarOpen }}>{children}</AppContext.Provider>
}
export default AppProvider;