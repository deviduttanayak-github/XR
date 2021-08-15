var express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
var router = express.Router();
var Account = require('../model/account'); 
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
const parseId = (token) => {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
}
const genAccountId = () => {
    // how to assign account ID 
};
const queryUpdate = async ( query) => {
    for(let key in query){
        if(key == "password"){
            query[key] = await bcrypt.hash(query[key], HASHKEY);
        }
    }
    return query;
}
// utils -------------------------------- end --

router.get('/profile', async (req, res) => {
    let uid = parseId(req.cookies.jwt);
    console.log("account/profile", uid);
    Account.findById(uid)
        .then( account => {
            // console.log(account);
            res.send(account);
        })
        .catch( err => {
            console.log("Profile:", err);
            res.send(msgwd(0, "Sorry No such account found"));
        })
});

router.post('/activate', async (req, res) => {
    console.log("Activate", req.body);
    let uid = parseId(req.cookies.jwt);
    let acid = uid; // keep same for now
    try{
        let account = await Account.findById(uid);
        if(account && account.acid == null){
            let updates = await queryUpdate(req.body);
            updates.acid = acid;
            Account.updateOne({ "_id" : uid}, { "$set" : updates } )
                .then( new_acc => {
                    res.cookie('name', new_acc.name.split(" ")[0], {
                        maxAge: EXPDATE,
                        httpOnly: false
                    });
                    res.send(msgwd(1, "Activation successful"));
                })
                .catch( err => {
                    console.log("activation:", err);
                    res.send(msgwd(0, "Something went wrong!"));
                })
        }
        else{
            res.send(msgwd(0, "Account already activated!"));
        }
    }
    catch(e){
        console.log("ee", e);
        res.send(msgwd(0, "Failed to process your request"));
    }
});

// check for account activation 
router.use('/', (req, res, next) => {
    console.log("Checking Activation...");
    let uid = parseId(req.cookies.jwt);
    Account.findById(uid)
        .then(acc => {
            if(acc.acid != null){
                next();
            }
            else{
                res.send(msgwd(0, "Activate your account"));
            }
        })
        .catch(err => {
            res.statusCode = 404;
            res.send(msg(0));
        })
});

router.get('/query', async (req, res) => {
    let uid = parseId(req.cookies.jwt);
    let data = [];
    let query = req.body; // give an array of parameters
    try{
        let account = await Account.findById(uid);
        // console.log("A:", account);
        for(let i=0; i<query.length; i++){
            data.push( account[query[i]] );
        }
        res.send(msgwd(1, data));
    }
    catch(e){
        res.send(mag(0));
    }
})

router.post('/update', async (req, res) => {
    console.log('update');
    let uid = parseId(req.cookies.jwt);
    let query = req.body; // give an array of parameters and values {key : value, ...}
    let updates = await queryUpdate(query);
    Account.updateOne({ "_id" : uid}, { "$set" : updates } )
        .then( new_acc => {
            res.send(msgwd(1, "Updation successful"));
        })
        .catch( err => {
            console.log("uerr:", err);
            res.send(msgwd(0, "Something went wrong!"));
        })
});

module.exports = router;
