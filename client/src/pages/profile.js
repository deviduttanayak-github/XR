import React, {useState, useEffect} from 'react'
import axios from 'axios';
import {BASEURL, show} from '../common/Conf';

function Profile() {

    const [profile, setprofile] = useState(null);
    const [msg, setmsg] = useState(null);

    useEffect(() => {
        axios.get(BASEURL + '/account/profile')
            .then( res => {
                console.log(res);
                setprofile(res.data);
            })
            .catch( err => {
                console.log(err);
                setmsg({msg : 0, data : "Something went wrong"});
            })
    }, [])

    // 1. activate account option if  acc_id not activated 
    // 2. display all details

    return (
        <div>
            <h1><span className="badge bg-primary">Profile</span></h1>
            {
                profile ? display(profile) : null
            }
            {
                msg ? show(msg) : null
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
