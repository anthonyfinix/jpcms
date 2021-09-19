import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Job from '../Job';
import classes from './content.module.css';
const Content = () => {
    return (
        <div className={classes.wrapper}>
            <Switch>
                <Route exact path="/" component={Job} />
            </Switch>
        </div>
    )
}
export default Content;