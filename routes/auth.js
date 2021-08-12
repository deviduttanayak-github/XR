var express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
var router = express.Router();
var Account = require('../model/account'); 
// var Transaction = require('../model/transaction');

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

router.post('/signup', async (req, res, next) => {
    let data = req.body;
    // console.log(data);
    data.password = await bcrypt.hash(data.password, HASHKEY);
    // console.log(data);
    var account = new Account(data);
    account.save()
        .then(acc => {
            // console.log("M:", acc);
            res.send(msg(1));
        })
        .catch( err => {
            // console.log("E:", err);
            if(err.code == 11000){
                res.send(msgwd(0, "Given email already has an account"));
            }
            else res.send(msgwd(0, "Something went wrong!"));
        })
});

router.post('/login', async (req, res) => {
    let data = req.body;
    // console.log(data);
    try{
        let acc = await Account.findOne({email : data.email});
        let isMatch = null;
        if(acc) isMatch = await bcrypt.compare(data.password, acc.password)
        if(!acc || !isMatch){
            res.send(msgwd(0, "Incorrect Credentials"));
        }
        else{
            let uid = acc._id;
            let token = genToken(uid);
            res.cookie('jwt', token, {
                maxAge: EXPDATE,
                httpOnly: true
            });
            res.cookie('name', acc.name.split(" ")[0], {
                maxAge: EXPDATE,
                httpOnly: false
            });
            res.send({
                msg : "SUCCESS", name : acc.name.split(" ")[0]
            });
        }
    }
    catch(e) {
        res.send(msgwd(0, "Database Error"));
    }
});

router.get('/logout', (req, res) => {
    res.clearCookie('jwt');
    res.clearCookie('name');
    res.send(msgwd(1, "Done"));
});
        
module.exports = router;