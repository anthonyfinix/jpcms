import { Switch, Route } from 'react-router-dom'
import App from "./App";
import Login from "./Login";
import Register from './Register';

const MainRouter = () => {
    return (
        <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/" component={App} />
        </Switch>
    )
}
export default MainRouter;