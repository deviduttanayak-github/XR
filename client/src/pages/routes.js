import React from 'react';
import {Switch, Route, Link} from 'react-router-dom';
import Signup from './signup';
import Auth from './Auth';
import Login from './login'

function Routes() {

    

    return (
        <div>
            <Switch>
                <Route exact path="/">
                    <h1>Home</h1> 
                    <ul>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/signup">Signup</Link></li>
                        <li><Link to="/logout">Logout</Link></li>
                    </ul>
                </Route>
                <Route exact path="/login" component={Login} />
                <Route exact path="/signup" component={Signup} />
                <Route path='/'>
                    <h2 className="text-danger">Sorry No such URL exists :)</h2>
                </Route>
            </Switch>
        </div>
    )
}

export default Routes
