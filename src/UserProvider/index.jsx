import React from "react"
import { connect } from 'react-redux'
import http from "../util/axios";
import LoadingSpinner from '../shared/LoadingSpinner';
import handleShowNotification from '../App/redux/middleware/handleShowNotification';
import { useHistory } from "react-router";
export const UserContext = React.createContext(null);
const UserProvider = (props) => {
    const history = useHistory()
    const [user, setUser] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(true);
    const [error, setError] = React.useState("");
    React.useEffect(() => {
        let accessToken = localStorage.getItem('JPtechSolutionAccessToken');
        if (accessToken) {
            http.get('/user/login', { headers: { authorization: `Bearer ${accessToken}` } })
                .then(response => {
                    if (response.data.error) {
                        history.push('/login')
                        props.handleShowNotification(response.data.error);
                    }
                    !response.data.error && setUser(response.data)
                })
                .finally(() => setIsLoading(false))
                .catch(e => setError(e))
        } else {
            setIsLoading(false)
        }
    }, [])
    if (isLoading) return <LoadingSpinner />
    // if (error) return <h1>User Error</h1>
    return <UserContext.Provider value={{ user, setUser, isUserLoading: isLoading, setIsUserLoading: setIsLoading }}>{props.children}</UserContext.Provider>
}

const mapDispatchToProps = {
    handleShowNotification
}
export default connect(null, mapDispatchToProps)(UserProvider)