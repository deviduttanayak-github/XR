var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
var Account = require('../model/account'); 
const Monitor = require('../model/monitor');
var Transaction = require('../model/transaction');

// utils --------------------------------
const HASHKEY = 8;
const EXPDATE = 1000 * 5 * 60; // 60 * 60 * 24;
const OK = "SUCCESS";
const FAIL = "FAILED";
const msg = (id) => {
    if(id) return {msg : OK};
    else return {msg : FAIL};
}
const msgwd = (id, pload) => {
    if(id) return { msg : OK, data : pload };
    else return {msg : FAIL, data : pload};
}
const genToken = (uid) => {
    // console.log("JWT_SECRET: ",process.env.JWT_SECRET);
    const token = jwt.sign(uid.toString(), process.env.JWT_SECRET)
    // token = "123456";
    
    return token;
}
const parseId = (token) => {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded.id;
}
// utils -------------------------------- end --

router.get('/search', (req, res) => {
    let pref = req.query.pref, where = req.query.where;
    console.log("search", req.body, " ", pref, " ", where);
    if(where == "email"){
        Account.find({ "email" : { "$regex" : pref}}, "email acid")
        .then(resp => {
            console.log(resp);
            res.send(msgwd(1, resp));
        })
        .catch(e => {
            console.log("S:", e);
            res.send(msg(0));
        })
    }
    else if(where == "acid"){
        Account.find({ "acid" : { "$regex" : pref}}, "email acid")
        .then(resp => {
            console.log(resp);
            res.send(msgwd(1, resp));
        })
        .catch(e => {
            console.log("S:", e);
            res.send(msg(0));
        })
    }
    else{
        res.send(msgwd(0, "Sorry the search parameter isn't available"));
    }
});

router.get('/details', async (req, res) => {
    try{
        let acc = await Account.countDocuments({});
        let trans = await Transaction.countDocuments({});
        let tamt = await Transaction.aggregate([{ $group : {
            _id : null, amt : { $sum : "$amount" }
        }}]);
        let mon = await Monitor.findById({ _id : "6117c22745422c3508ee83b8" });
        // console.log(trans, " ", acc, " ", tamt);
        res.send(msgwd(1, {accounts : acc, transactions : trans, tamount : tamt[0].amt, requests : mon.requests}));
    }
    catch(e){
        // console.log(e);
        res.send(msgwd(0, "Something went wrong"));
    }
});

module.exports = router;

