import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {BASEURL, show} from '../common/Conf';
import {Link} from 'react-router-dom'; 

var recent2 = [];
function Home() {

    const [msg, setmsg] = useState(null);
    const [details, setdetails] = useState(null);
    const [typying, settypying] = useState(false);
    const [results, setresults] = useState([]);

    useEffect(() => {
        axios.get(BASEURL + '/public/details')
            .then( res => {
                if(res.data.msg == "SUCCESS"){
                    setdetails(res.data.data);
                }
                else{
                    setmsg({msg:"FAILED", data : "Something went wrong"});
                }
            })
            .catch( err => {
                console.log("details:", err);
                setmsg({msg:"FAILED", data : "Something went wrong"});
            })
    }, []);

    const searchEmail = () => {
        let mail = document.getElementById("pub-mail").value;
        if(!typying) settypying(true);
        let pack = { pref : mail, where : "email" };
        console.log(pack);
        axios.get(BASEURL + '/public/search', { params : pack})
            .then( res => {
                console.log(res);
                let temp = []; let arr = res.data.data;
                recent2 = arr;
                for(let i=0; i<arr.length; i++){
                    if(arr[i].acid == null) continue;
                    else temp.push(arr[i].email);
                }
                setresults(temp);
            })
            .catch( err => {
                console.log(err);
            })
    }
    const setThis = (val) => {
        document.getElementById("pub-mail").value = val;
        settypying(false);
    }


    return (
        <div className="container-fluid mt-1">
            <div className="text-center text-white extra">
                <h2>Expense Tracker</h2>
            </div>
            
            <div className="row">
                <div className="col-lg-6 col-sm-12">
                    <div className="base-1 row text-center">
                        <div class="card text-white bg-primary mb-3 col-lg-6 col-sm-6" >
                            <div class="card-header">Total registered users : {details ? details.accounts : null} </div>
                            {/* <div class="card-body">
                                <h5 class="card-title"></h5>
                                <p class="card-text"></p>
                            </div> */}
                        </div>
                        <div class="card text-white bg-primary mb-3 col-lg-6 col-sm-6">
                            <div class="card-header">Total number of transactions : {details ? details.transactions : null} </div>
                        </div>
                        <div class="card text-white bg-primary mb-3 col-lg-6 col-sm-6">
                            <div class="card-header">Total requests : {details ? details.requests : null} </div>
                        </div>
                        <div class="card text-white bg-primary mb-3 col-lg-6 col-sm-6">
                            <div class="card-header">Total traansaction amount : {details ? details.tamount : null} </div>
                        </div>
                        {
                            msg ? show(msg) : null
                        }
                    </div>
                </div>

                <div className="col-lg-6 col-sm-12 row m-auto">
                    <div className="col-lg-6 sol-sm-6 mt-2">
                        <div class="bg-white w-100" >
                            <div class="card-body">
                                <h5 class="card-title">Already have an account?</h5>
                                <p class="card-text">Jump in</p>
                                <Link to="/login" class="btn btn-primary">Login Here</Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 col-sm-6 mt-2">
                        <div class="bg-white w-100" >
                            <div class="card-body">
                                <h5 class="card-title">New to here?</h5>
                                <p class="card-text">Create one here</p>
                                <Link to="/signup" class="btn btn-primary">Signup Here</Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-lg-6 col-sm-12">
                    <div className="base-1 row text-center">
                        <h4 className="text-white">Account Setup</h4>
                        <div className="text-white">
                            {"Create account -> Activate account -> Enjoy all features"}  
                        </div>
                    </div>
                </div>

                <div className="col-lg-6 col-sm-12">
                    <div className="base-1 row text-center">
                        <h4 className="text-white">Search Users</h4>
                        <div className="input-group mb-3">
                            <input id="pub-mail" type="text" onBlur={()=>{settypying(false)}} className="form-control" placeholder="Recipient's email" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                            <span className="input-group-text" id="basic-addon2">email</span>
                            <span className="input-group-text"><a onClick={searchEmail} className="btn btn-primary">Search</a></span>
                        </div>
                        {
                            typying && ( <Suggestions results={results} setThis={setThis} /> )
                        }
                    </div>
                </div>
                
            </div>
        </div>
    )
}

const Suggestions = (props) => {
    console.log("SS:", props);
    return (
        <div className="d-flex flex-column mb-1 mxh">
            {
                props.results.map( (val, key) => {
                    return (
                        <div className="p-1 bg-white">
                            <a onClick={()=>{props.setThis(val)}} role="button">{val}</a>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Home
