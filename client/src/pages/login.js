import React, {useState} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import './style.css';
import { BASEURL, show } from '../common/Conf';

function Signup() {
    
    const [msg, setmsg] = useState(null);

    const signIn = (e) => {
        let form = document.getElementById("login-form");
        let inputs = form.getElementsByTagName("input");
        if(inputs.length != 2){
            alert("Refresh and try again");
            return;
        }
        let pack = {
            email : "", password : ""
        };
        pack.email = inputs[0].value;
        pack.password = inputs[1].value;
        console.log(pack);
        axios.post(BASEURL + '/auth/login', pack)
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
                    <h1><span className="badge bg-primary">Login</span></h1>
                </div>
                <div id="login-form" className="p-3 col-lg-6 col-sm-12 rounded bg-white">
                    <div className="mb-3 ">
                        <label htmlFor="login-email" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="login-email" placeholder="name@example.com" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="login-pass" className="form-label">Password</label>
                        <input type="password" className="form-control" id="login-pass" />
                    </div>
                </div>
                <div className="mt-3 d-flex flex-column col-lg-6 col-sm-12">
                    <button onClick={signIn} className="btn btn-primary">
                        Login
                    </button>

                    <div className="mt-2">
                        {
                            msg ? show(msg) : null
                        }
                    </div>
                    
                    <div className="mt-2">
                        <Link to='/signup' className="btn btn-outline-primary">
                            Have no account? Create one here
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Signup
