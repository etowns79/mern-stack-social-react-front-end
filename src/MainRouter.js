import React from 'react'
import { Route, Switch } from 'react-router-dom';
import Home from './core/Home';
import Signup from './user/Signup';

export default function MainRouter() {
    return (
        <div>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/signup" exact component={Signup} />
            </Switch>
        </div>
    )
}
