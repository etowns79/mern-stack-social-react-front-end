import React from 'react'
import { Route, Switch } from 'react-router-dom';
import Home from './core/Home';
import Signup from './user/Signup';
import Signin from './user/Signin';
import Menu from './core/Menu';

export default function MainRouter() {
    return (
        <div>
            <Menu />
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/signup" exact component={Signup} />
                <Route path='/signin' exact component={Signin} />
            </Switch>
        </div>
    )
}
