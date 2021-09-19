import Header from '../Header';
import Sidebar from '../Sidebar';
import Content from '../Content';
import React from 'react';
import { UserContext } from '../UserProvider';
import { useHistory } from 'react-router';
import AppProvider from './AppProvider';
import classes from './app.module.scss';
const App = () => {
    const { user } = React.useContext(UserContext);
    const history = useHistory()
    React.useEffect(() => { if (!user) history.push('/login') }, [history, user])
    return (
        <AppProvider>
            <Header />
            <div className={`${classes.content_wrapper}`}>
                <Sidebar />
                <Content />
            </div>
        </AppProvider>
    )
}
export default App;