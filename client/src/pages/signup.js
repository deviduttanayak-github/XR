import React, {useState} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import './style.css';
import { BASEURL, show } from '../common/Conf';

function Signup() {
    
    const [msg, setmsg] = useState(null);

    const createAccount = (e) => {
        let form = document.getElementById("signup-form");
        let inputs = form.getElementsByTagName("input");
        if(inputs.length != 3){
            alert("Refresh and try again");
            return;
        }
        else if(inputs[1].value != inputs[2].value){
            alert("Password didn't match");
            return;
        }
        let pack = {
            email : "", password : ""
        };
        pack.email = inputs[0].value;
        pack.password = inputs[1].value;
        console.log(pack);
        axios.post(BASEURL + '/auth/signup', pack)
            .then( res => {
                console.log(res.data);
                setmsg(res.data);
            })
            .catch( err => {
                setmsg({msg: 0, data : "Something went wrong"});
            })
    }

    return (
        <div className="">
            {/* make this center */}
            <div className="container-fluid mt-3">
                <div className="col-lg-6 col-sm-12 text-center">
                    <h1><span className="badge bg-primary">Sign Up</span></h1>
                </div>
                <div id="signup-form" className="p-3 col-lg-6 col-sm-12 rounded bg-white">
                    <div className="mb-3 ">
                        <label htmlFor="signup-email" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="signup-email" placeholder="name@example.com" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="signup-pass" className="form-label">Password</label>
                        <input type="password" className="form-control" id="signup-pass" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="signup-pass-conf" className="form-label">Confirm Password</label>
                        <input type="password" className="form-control" id="signup-pass-conf" />
                    </div>
                </div>
                <div className="mt-3 d-flex flex-column col-lg-6 col-sm-12">
                    <button onClick={createAccount} className="btn btn-primary">
                        Create Account
                    </button>

                    <div className="mt-2">
                        {
                            msg ? show(msg) : null
                        }
                    </div>
                    
                    <div className="mt-2">
                        <Link to="/login" className="btn btn-outline-primary" >
                            Already have an account? Sign In here
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Signup
