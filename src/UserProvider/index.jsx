import React from "react"
import http from "../util/axios";
export const UserContext = React.createContext(null);
const UserProvider = (props) => {
    const [user, setUser] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(true);
    React.useEffect(() => {
        let accessToken = localStorage.getItem('JPtechSolutionAccessToken');
        if (accessToken) {
            http.get('/user/login', { headers: { authorization: `Bearer ${accessToken}` } })
                .then(response => !response.data.error && setUser(response.data))
                .finally(() => setIsLoading(false))
        } else {
            setIsLoading(false)
        }
    }, [])
    if (isLoading) return <h1>Loading User</h1>
    return <UserContext.Provider value={{ user, setUser, isUserLoading: isLoading, setIsUserLoading: setIsLoading }}>{props.children}</UserContext.Provider>
}
export default UserProvider