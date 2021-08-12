import React, {useState, useEffect} from 'react';
import {Switch, Route, Link} from 'react-router-dom';
import Signup from './signup';
import Auth from './Auth';
import Login from './login'
import Profile from './profile';
import Payment from './payment';
import axios from 'axios';
import { BASEURL, show } from '../common/Conf';

const checkCookie = (cookie) => {
    if(!cookie) return null;
    var param = cookie.split("=");
    if(param[0] == "name"){
        return param[1];
    }
    else return null;
}

function Routes() {
    const [user, setuser] = useState(null);
    var name = checkCookie(document.cookie);

    useEffect(() => {
        if(name){
            setuser({name : name});
        }
    }, [])

    const check = () => {
        console.log("cookie:", document.cookie);
        console.log("user:", user);
        console.log("name:", name);
    }
    // check();

    return (
        <div>
            {/* temp */}
            <div className="">
                <h3> <span className="badge bg-secondary">
                        {
                            user ? ("Hello " + user.name) : "You haven't signed in"
                        }
                    </span> 
                </h3>
            </div>

            <Switch>
                <Route exact path="/">
                    <h1>Home</h1> 
                    <ul>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/signup">Signup</Link></li>
                        <li><Link to="/logout">Logout</Link></li>
                        <li><Link to="/profile">Profile</Link></li>
                        <li><Link to="/payment">Payment</Link></li>
                    </ul>
                </Route>
                <Route exact path="/login"> <Login setuser={setuser} /> </Route>
                <Route exact path="/signup" component={Signup} />
                <Route exact path='/profile' component={Profile} />
                <Route exact path='/payment' component={Payment} />
                <Route exact path='/logout'><Logout setuser={setuser} /></Route>
                <Route path='/'>
                    <h2 className="text-danger">Sorry No such URL exists :)</h2>
                </Route>
            </Switch>
        </div>
    )
};

const Logout = (props) => {
    const [msg, setmsg] = useState(null);

    useEffect(() => {
        axios.get(BASEURL + '/auth/logout')
            .then( res => {
                props.setuser(null);
                setmsg(res.data);
            })
            .catch( err => {
                console.log("L:", err);
                setmsg({msg : "FAILED", data : "Something went wrong"});
            })
    }, [])

    return (
        <div>
            {
                msg ? show(msg) : (
                    <div className="text-white">Just a second, Logging out...</div>
                )
            }
        </div>
    )

}

export default Routes
