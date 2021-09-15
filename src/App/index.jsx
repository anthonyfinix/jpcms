import Header from '../Header';
import Sidebar from '../Sidebar';
import Content from '../Content';
import React from 'react';
import { UserContext } from '../UserProvider';
import { useHistory } from 'react-router';
const App = () => {
    const {user} = React.useContext(UserContext);
    const history = useHistory()
    React.useEffect(()=>{
        if(!user) history.push('/login')
    },[])
    return (
        <>
            <Header />
            <div className="content-wrapper">
                <Sidebar />
                <Content />
            </div>
        </>
    )
}
export default App;