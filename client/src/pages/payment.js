import React, {useState} from 'react';
import axios from 'axios';
import {BASEURL, show} from '../common/Conf';

var recent = null;

function Payment() {
    
    const [typying, settypying] = useState(false);
    const [results, setresults] = useState([]);
    const [msg, setmsg] = useState(null);

    const searchEmail = () => {
        let mail = document.getElementById("payment-mail").value;
        if(!typying) settypying(true);
        let pack = { pref : mail, where : "email" };
        axios.get(BASEURL + '/public/search', { params : pack})
            .then( res => {
                let temp = []; let arr = res.data.data;
                recent = arr;
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
        document.getElementById("payment-mail").value = val;
        settypying(false);
    }

    const pay = (e) => {
        let email = document.getElementById("payment-mail").value;
        let amt = document.getElementById("payment-amt").value;
        let note = document.getElementById("payment-note").value;
        console.log(email, " ", amt);
        let pack = {credit_id : email, amount : amt, purpose : note};
        console.log(pack);
        axios.post(BASEURL + '/payment/pay', pack)
            .then( res => {
                console.log(res);
                setmsg(res.data);
            })
            .catch( err => {
                console.log("Pay:", err);
                setmsg({msg : "Failed", data : "Something went wrong"});
            })
    }

    return (
        <div>
            <h1><span className="badge bg-primary">Make Payment</span></h1>
            <div className="container-fluid">
                <div id="payment-form" className="col-lg-6 col-sm-12">
                    <div className="input-group mb-3">
                        <input id="payment-mail" type="text" onBlur={()=>{settypying(false)}} className="form-control" placeholder="Recipient's email" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                        <span className="input-group-text" id="basic-addon2">example@gmail.com</span>
                        <span className="input-group-text"><a onClick={searchEmail} className="btn btn-primary">Search</a></span>
                    </div>
                    {
                        typying && ( <Suggestions results={results} setThis={setThis} /> )
                    }
                    <div className="input-group mb-3">
                        <span className="input-group-text">Amount</span>
                        <input id="payment-amt" type="number" className="form-control" aria-label="Amount (to the nearest dollar)" />
                        <span className="input-group-text">.00</span>
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text">Add Note</span>
                        <input id="payment-note" type="text" className="form-control" aria-label="Amount (to the nearest dollar)" />
                    </div>
                </div>

                <div className="mb-2 col-lg-6 col-sm-12">
                    <button onClick={pay} className="btn btn-primary w-100 mb-2">Pay</button>
                    {
                        msg ? show(msg) : null
                    }
                </div>
            </div>

        </div>
    )
};

const Suggestions = (props) => {


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

export default Payment
