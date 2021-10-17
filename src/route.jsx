import { Switch, Route } from 'react-router-dom'
import App from "./App";
import Login from "./user/Login";
import Register from './user/Register';

const MainRouter = () => {
    return (
        <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route path="/" component={App} />
        </Switch>
    )
}
export default MainRouter;