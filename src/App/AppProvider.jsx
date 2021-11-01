import React from "react";
import CompanyProvider from '../company/provider';
export const AppContext = React.createContext({});
const AppProvider = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
    return (
        <AppContext.Provider value={{ isSidebarOpen, setIsSidebarOpen }}>
            <CompanyProvider>
                {children}
            </CompanyProvider>
        </AppContext.Provider>
    )
}
export default AppProvider;