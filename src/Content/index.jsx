import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Job from '../Job';
import Profile from '../Profile';
import classes from './content.module.scss';
const Content = () => {
    return (
        <div className={`${classes.wrapper} py-md`}>
            <Switch>
                <Route exact path="/" component={Job} />
                <Route exact path="/profile" component={Profile} />
            </Switch>
        </div>
    )
}
export default Content;