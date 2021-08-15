import React, {useState, useEffect} from 'react';
import './style.css';

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
      },
      {
        time: "2021-07-12T15:20:50.912Z",
        mode: 'debit',
        amount: 45,
        purpose: 'Food'
      },
      {
        time: "2021-09-12T15:20:50.912Z",
        mode: 'debit',
        amount: 75,
        purpose: 'Furniture'
      }
    ],
    createdAt: "2021-08-12T14:52:46.386Z",
    updatedAt: "2021-08-12T15:22:10.571Z",
    __v: 1
};

// what to represent ??
// 1. monthly expenditure, 2. where spent, 3. ??

// utils ------------------------------
const pasrseDate = (dd) => {
    let date = dd.split("T")[0];
    date = date.split("-")[2];
    return date;
}

const makeData = (trans) => {
    let daily = Array(32), cred = Array(32);
    for(let i=1; i<=31; i++) daily[i] = [], cred[i] = [];
    for(let k=0; k < trans.length; k++){
        let day = parseInt(pasrseDate(trans[k].time));
        if(trans[k].mode == 'credit') cred[day].push([trans[k].amount, trans[k].purpose]);
        else daily[day].push([trans[k].amount, trans[k].purpose]);
    }
    
    for(let i=1; i<=31; i++){
        if(daily[i].length == 0){
            daily[i].push([0, "none"]);
        }
    }
    return {"debit" : daily, "credit" : cred};
}

const findMonthlyExpense = (data) => {
    let daily = Array(32);
    for(let i=0; i<=31; i++) daily[i] = 0;
    for(let i=1; i<=31; i++){
        for(let j=0; j<data[i].length; j++){
            daily[i] += data[i][j][0];
        }
    }
    return daily;
}

const groupExpense = (data) => {
    let group = new Map();
    for(let i=1; i<=31; i++) {
        for(let j=0; j<data[i].length; j++){
            let key = data[i][j][1].toLowerCase();
            group[key] = 0;
        }
    }
    for(let i=1; i<=31; i++) {
        for(let j=0; j<data[i].length; j++){
            let key = data[i][j][1].toLowerCase();
            group[key] += data[i][j][0];
        }
    }
    return group;
}

// utils ------------------------------ end --

// var myChart, pieChart, cred_chart1, cred_chart2; 
var debit_bar, debit_pie, cred_bar;
var colors = ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'];

function Analytics(props) {

    useEffect(() => {
        if(props.profile){
            let transactions = props.profile.transaction;
            let data = makeData(transactions);
            // console.log(data);
            let daily = findMonthlyExpense(data.debit);
            let groups = groupExpense(data.debit);
            // console.log("G:", groups);
            let cdaily = findMonthlyExpense(data.credit);
            debit_bar = plotExpensePerDay(daily, "debit_bar", "Expenses/day", "Monthly Expenditure");
            debit_pie = dougNut(groups, "debit_pie", "Expenses", "Source of Expenses");
            cred_bar = plotExpensePerDay(cdaily, "cred_bar", "Credit details", "Credit details");
        }
        return () => {
            if(props.profile){
                debit_bar.destroy();
                debit_pie.destroy();
                cred_bar.destroy();
            }
        }
    }, []);


    return (
        <div className="container-fluid mb-2 ">
            <h1 className="text-white w-100">Analytics</h1>
            <div className="d-flex flex-row row">
                <div className="col-lg-4 col-sm-12">
                    <canvas id="debit_bar" className="bg-white m-1" width="500" height="500" ></canvas>
                </div>
                <div className="col-lg-4 col-sm-12">
                    <canvas id="debit_pie" className="bg-white m-1" width="100" height="100" ></canvas>
                </div>
                <div className="col-lg-4 col-sm-12">
                    <canvas id="cred_bar" className="bg-white m-1" width="100" height="100" ></canvas>
                </div>
            </div>
        </div>
    )
}

const plotExpensePerDay = (daily, id, labe, title) => {
    var ctx = document.getElementById(id);

    let lab = Array(31), dat = Array(31), col = Array(31), len = colors.length;
    for(let i=1; i<=31; i++){
        lab[i-1] = i;
        col[i-1] = colors[(i-1)%len];
        dat[i-1] = daily[i];
    }

    let myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: lab, 
        datasets: [{
            label: labe,
            data: dat, 
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        },
        plugins: {
            title: {
                display: true,
                text: title,
                font : {
                    size : 20
                }
            }
        }
    }
});
return myChart;
}

const dougNut = (groups, id, labe, title) => {
    // data making
    let dat = [], lab = [];
    for(let key in groups){
        if(groups[key]){
            lab.push(key);
            dat.push(groups[key]);
        }
    }

    // label
    const data = {
    labels: lab,
    datasets: [{
        label: labe,
        data: dat, // [300, 50, 100],
        backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)'
        ],
        hoverOffset: 4
    }]
    };
    
    const config = {
    type: 'doughnut',
    data: data,
    options: {
        plugins: {
            title: {
                display: true,
                text: title,
                font : {
                    size : 20
                }
            }
        }
    }
    };

    var ctx = document.getElementById(id);
    let pieChart = new Chart(ctx, config);
    return pieChart;
}

export default Analytics
