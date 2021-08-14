import React, {useState} from 'react';
import axios from 'axios';
import {BASEURL, show} from '../common/Conf';

function Activation(props) {

    const [msg, setmsg] = useState(null);
    const [ok, setok] = useState(false);

    const activate = (e) => {
        let form = document.getElementById("activate-form");
        let inputs = form.getElementsByTagName("input");
        let pack = {
            name : inputs[0].value, monthlyIncome : inputs[1].value,  monthlyBudget : inputs[2].value,
            monthlySavings : inputs[3].value, utility : inputs[4].value
        };
        for(let key in pack){
            if(pack[key] == ""){
                if(key == 'name') pack.name = "Guest";
                else pack[key] = 0;
            }
        }
        // console.log(pack);
        axios.post(BASEURL + '/account/activate', pack)
            .then( res => {
                // console.log(res);
                setmsg(res.data);
                if(res.data.msg == "SUCCESS") setok(true);
            })
            .catch( err => {
                console.log("Act:", err);
                setmsg({msg : "FAILED", data : "Something went wrong"});
            })
    }

    if(props.profile == null){
        return (<div>{show({msg : "FAILED", data : "Oops!!"})}</div>)
    }
    else if(props.profile.acid != null){
        return (<div>{show({msg : "SUCCESS", data : "Account already activated"})}</div>)
    }
    else{
        return (
            <div className="container-fluid">
                <div>
                    <h3><span className="badge bg-dark text-white">
                    Activate your account by filling the details below
                    </span></h3>
                </div>
                <div id="activate-form" className="bg-white p-3 m-2 rounded col-lg-6 col-sm-12">
                    <div class="mb-3">
                        <label htmlFor="act-name" class="form-label">Name</label>
                        <input type="text" class="form-control" id="act-name" placeholder="Enter your full name" />
                    </div>
                    <div class="mb-3">
                        <label htmlFor="act-mon-inc" class="form-label">Monthly Income</label>
                        <input type="number" class="form-control" id="act-mon-inc" placeholder="Enter monthly income" />
                    </div>
                    <div class="mb-3">
                        <label htmlFor="act-mon-bud" class="form-label">Monthly Budget</label>
                        <input type="number" class="form-control" id="act-mon-bud" placeholder="Enter monthly budget" />
                    </div>
                    <div class="mb-3">
                        <label htmlFor="act-mon-sav" class="form-label">Monthly Target Savings</label>
                        <input type="number" class="form-control" id="act-mon-sav" placeholder="Enter monthly target savings" />
                    </div>
                    <div class="mb-3">
                        <label htmlFor="act-mon-oin" class="form-label">Other Income</label>
                        <input type="number" class="form-control" id="act-mon-oin" placeholder="Enter monthly other source income" />
                    </div>
                    
                    <button onClick={activate} className="btn btn-primary">Submit</button>
                    
                </div>
                {
                    msg ? show(msg) : null
                }
                {
                    ok && (<div className="text-white">
                        Refresh to see changes
                    </div>)
                }

            </div>
        )
    }
    
}

export default Activation
