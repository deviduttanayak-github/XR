import React, {useState, useEffect} from 'react'
import axios from 'axios';
import {Link} from 'react-router-dom';
import {BASEURL, show} from '../common/Conf';
import Activation from '../components/activation';
import Display from '../components/display';
import Analytics from '../components/analytics';

function Profile() {

    const [profile, setprofile] = useState(null);
    const [msg, setmsg] = useState(null);
    const [tab, settab] = useState(-1);

    useEffect(() => {
        axios.get(BASEURL + '/account/profile')
            .then( res => {
                // console.log(res);
                setprofile(res.data);
                settab(0);
            })
            .catch( err => {
                console.log("Prof:", err);
                setmsg({msg : 0, data : "Something went wrong"});
            })
    }, [])


    const changeTab = (tab_) => {
        // console.log("T:", tab_);
        settab(tab_);
    }

    // 1. activate account option if  acc_id not activated 
    // 2. display all details make 3 components : Activate, Display, Anallytics

    return (
        <div>
            <div className="d-flex flex-row">
                <div className="d-flex flex-row ">
                    <h1><span className="badge bg-primary">Account</span></h1>
                </div>
                <div className="d-flex flex-row-reverse w-100 p-1">
                    <div className="btn-group">
                    <button type="button" className="btn btn-danger">Action</button>
                    <button type="button" className="btn btn-danger dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
                        <span className="visually-hidden">Toggle Dropdown</span>
                    </button>
                    <ul className="dropdown-menu">
                        <li><a onClick={() => {changeTab(1)}} className="dropdown-item" role="button">Activate Account</a></li>
                        <li><a onClick={() => {changeTab(0)}} className="dropdown-item" role="button">Profile</a></li>
                        <li><a onClick={() => {changeTab(2)}} className="dropdown-item" role="button">Analytics</a></li>
                        <li><a onClick={() => {changeTab(3)}} className="dropdown-item" role="button">Update Details</a></li>
                        <li><a onClick={() => {changeTab(4)}} className="dropdown-item" role="button">Logout</a></li>
                    </ul>
                    </div>
                </div>
            </div>

            {/* <Analytics profile={profile} /> */}
            {/* <Activation profile={{
                acid : null
            }} /> */}
            {
                msg ? show(msg) : 
                    tab == 0 ? <Display profile={profile} /> :
                    tab == 1 ? <Activation profile={profile} /> : 
                    tab == 2 ? <Analytics profile={profile} />:
                    tab == 3 ? <h1>Update Info Tab</h1>: 
                    tab == 4 ? <Link className="btn btn-warning" to="/logout">Click to logout</Link> : null
            }
        </div>
    )
}

const display = (profile) => {
    return (
        <ol className="bg-success">
            <li>name : {profile.name}</li>
            <li>email : {profile.email}</li>
            <li>account id: {profile.acid}</li>
            <li>monthly income : {profile.monthlyIncome}</li>
            <li>balance : {profile.balance}</li>
        </ol>
    )
}

export default Profile
