const { Timestamp } = require('mongodb');
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var account = new Schema({
    acid : {
        type : String,
        default : null
    },
    name : {
        type : String,
        default : "Guest",
        require : true
    },
    email : {
        type : String,
        require : true,
        unique : true
    },
    password : {
        type : String,
        require : true
    },
    friends : [],
    monthlyIncome : {
        type : Number,
        default : 0
    },
    otherIncome : [{ // keep an array of size 12 
        amount : {
            type : Number,
        },
        type : { // Bonus, or Other Source
            type : String, 
        }
    }],
    monthlyBudget : {
        type : Number,
        default : 0
    },
    monthlySavings : {
        type : Number,
        default : 0
    },
    utility : {
        type : Number,
        default : 0
    },
    balance : {
        type : Number,
        default : 2000
    },
    transaction : [{
        tid : {
            type : String,
        },
        mode : {
            type : String
        },
        amount : {
            type : Number 
        },
        purpose : {
            type : String 
        },
        time : {
            type : Date,
            default : Date.now()
        }
    }]
},
{
    timestamps : true
});

var Account = mongoose.model('Account', account);
module.exports = Account;