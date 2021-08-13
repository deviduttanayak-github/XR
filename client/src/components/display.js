import React, {useState, useEffect} from 'react';
import {show} from '../common/Conf'
import './style.css'

var demo = {
    acid: '611535be451f1139dc49278a',
    name: 'Buyer Rex',
    friends: ["Ramo", "Lex"],
    monthlyIncome: 99000,
    monthlyBudget : 0,
    monthlySavings: 20000,
    utility: 0,
    balance: 1455,
    _id: "611535be451f1139dc49278a",
    email: 'buyer@gmail.com',
    password: '$2b$08$Ce4q9eIg3f7FKmwHsTQZr.mi.qBDRx9k/xvPt6ppHXj6R0qWG4zte',
    otherIncome: [],
    transaction: [
      {
        time: "2021-08-12T15:20:50.912Z",
        _id: "61153ca2dbca6540a46afa5f",
        tid: 'wahXFasjaQSZrit',
        mode: 'debit',
        amount: 45,
        purpose: 'Food'
      },
      {
        time: "2021-08-12T15:20:50.912Z",
        _id: "61153ca2dbca6540a46afa5f",
        tid: 'wahXFasjaQSZrit',
        mode: 'credit',
        amount: 105,
        purpose: 'Udhari'
      }
    ],
    createdAt: "2021-08-12T14:52:46.386Z",
    updatedAt: "2021-08-12T15:22:10.571Z",
    __v: 1
};

function Display(props) {

    const [profile, setprofile] = useState(null);

    useEffect(() => {
        console.log("D:", props)
        setprofile(props.profile);
    }, [])

    if(profile == null){
        return (<div>{show({msg : "FAILED", data : "Something went wrong"})}</div>)
    }
    else
    return (
        <div className="container-fluid mt-2">
            <div className="d-flex justify-content-center">
                <h2><span className="badge bg-white text-black bt">Account Details</span> </h2>
            </div>
            <div className="details row p-2 m-1">
                <div className="col-lg-6 col-sm-12 text-center">
                    <span className="badge bg-secondary">Account ID</span> 
                    <h3><span className="badge bg-info" >{profile.acid}</span></h3>    
                </div>
                <div className="col-lg-6 col-sm-12 text-center">
                    <span className="badge bg-secondary">Balance</span> 
                    <h3><span className="badge bg-info" >{profile.balance}</span></h3>     
                </div>
                <div className="border-top "></div>
                <div className="col-lg-6 col-sm-12 mt-1">
                    <div className="plate">
                        <KeyVal first={"Name"} value={profile.name} />
                        <KeyVal first={"Email"} value={profile.email} />
                        <KeyVal first={"Friends"} value={profile.friends} />
                    </div>
                </div>
                <div className="col-lg-6 col-sm-12 mt-1">
                    <div className="plate">
                        <KeyVal first={"Monthly Income"} value={profile.monthlyIncome} />
                        <KeyVal first={"Monthly Budget"} value={profile.monthlyBudget} />
                        <KeyVal first={"Monthly Savings"} value={profile.monthlySavings} />
                        <KeyVal first={"Other Income"} value={profile.otherIncome} />
                    </div>
                </div>
            </div>
            <div className="border-top mb-2"></div>
            <div className="transactions">
                <div className="text-white">
                    <h3>Transactions</h3>
                    <Trans trans={profile.transaction} />
                </div>
            </div>

        </div>
    )
}

const KeyVal = (props) => {
    let y = props.value;
    if(props.first == "Friends"){
        let f = props.value;
        y = "";
        if(f.length){
            y += f[0];
        }
        for(let i=1; i<f.length; i++){
            y += ", " + f[i];
            if(i == 4 && f.length > 5){
                y += ", ...";
                break;
            }
        }
    }
    return (
        <div className="m-1">
            <span className="badge bg-secondary m-1">{props.first}</span> 
            <span className="badge bg-info text-black" >{y}</span> 
        </div>
    )
};

const Trans = (props) => {
    let trans = props.trans;
    return (
        <div className="mt-2 bg-white">
            <table className="table">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Date</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Mode</th>
                    <th scope="col">Transaction ID</th>
                    <th scope="col">Purpose</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        trans.map( (val, key) => {
                            return (
                                <tr>
                                    <th scope="row">{key + 1}</th>
                                    <th>{val.time}</th>
                                    <th>{val.amount}</th>
                                    <th>{val.mode}</th>
                                    <th>{val.tid}</th>
                                    <th>{val.purpose}</th>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
};

export default Display
