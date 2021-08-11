var express = require('express');
var router = express.Router();
var Account = require('../model/account'); 
var Transaction = require('../model/transaction');
var authRouter = require('./auth'); 

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('API Index');
});

// Testing --
router.post('/dummy', (req, res) => {
  console.log("Dummy");
  console.log("RB:", req.body);
  let acc = req.body.account;
  if(acc){
    var account = new Account(req.body.data);
    account.save()
      .then( response => {
        res.send(response);
      })
      .catch( error => {
        console.log("E:", error);
        res.send("Not Ok");
      });
  }
  else{
    var trans = new Transaction(req.body.data);
    trans.save()
      .then( response => {
        res.send(response);
      })
      .catch( error => {
        console.log("E2:", error);
        res.send("Not Ok");
      });
  }
  // res.send("ok");
});

/*
  // TODO:
  1. Account creation - SignUp/Login/Logout
  2. Account details - all parameters
  3. Transaction - Payments 
*/

router.use('/auth', authRouter);

router.use('/', (req, res, next) => {
  console.log("Authorize");
  // Authorize here
  next();
});

router.use('/account', (req, res, next) => {
  console.log("Account details");
  res.send("Account details");
});

router.use('/payment', (req, res, next) => {
  console.log("Payment");
  res.send("Payment");
});

module.exports = router;
