var express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
var router = express.Router();
var Account = require('../model/account'); 
var Transaction = require('../model/transaction');
const { route } = require('./auth');
const mongoose = require('mongoose');

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
const genTransactionId = () => {
    var SYMBOLS = 'abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ_';
    var len = 15, id = "";
    for(let i=0; i<len; i++){
        let j = parseInt(Math.random() * (SYMBOLS.length - 1) );
        id += SYMBOLS[j];
    }
    return id;
}
// utils -------------------------------- end -- 

router.post('/pay', async (req, res) => {
    console.log("Pay", req.body);
    let credit_id = req.body.credit_id, amount = req.body.amount, 
        purpose = req.body.purpose ? req.body.purpose : "unspecified";
    let uid = parseId(req.cookies.jwt);
    let debit_id = uid;
    var session = await mongoose.startSession();
    session.startTransaction();
    try{
        var sender = await Account.findOne({_id : debit_id}).session(session);
        // console.log("sender:", sender);
        if(!sender){
            throw new Error("Sender account not found");
        }
        sender.balance -= amount; 
        if(sender.balance < 0){
            throw new Error("Insufficent balance");
        }
        var receiver = await Account.findOne({_id : credit_id}).session(session);
        // console.log("receiver:", receiver);
        if(!receiver || !receiver.acid){
            throw new Error("Receiver account not found");
        }

        receiver.balance += amount;
        let tid = genTransactionId();
        sender.transaction.push({
            "tid" : tid, "mode" : "debit", "amount" : amount, "purpose" : purpose
        });
        receiver.transaction.push({
            "tid" : tid, "mode" : "credit", "amount" : amount, "purpose" : purpose
        });
        var trans = new Transaction({
            "tid" : tid, "amount" : amount, "creditOn" : credit_id, "debitOn" : debit_id
        });
        // console.log(sender, receiver, trans);
        await trans.save();
        await sender.save();
        await receiver.save();
        await session.commitTransaction();
        session.endSession();
        res.send(msgwd(1, "Payment successful"));
    }
    catch(e){
        await session.abortTransaction();
        console.error(e);
        session.endSession();
        res.send(msgwd(0, "Something went wrong"));
    }
});

module.exports = router;
