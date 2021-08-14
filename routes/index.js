var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
var Account = require('../model/account'); 
var Transaction = require('../model/transaction');
var Monitor = require('../model/monitor');
var authRouter = require('./auth'); 
var accountRouter = require('./accountRoutes');
var paymentRoutes = require('./payment');
var publicRoutes = require('./public');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('API Index');
});

// Testing --
// router.post('/dummy', (req, res) => {
//   console.log("Dummy");
//   console.log("RB:", req.body);
//   let acc = req.body.account;
//   if(acc){
//     var account = new Account(req.body.data);
//     account.save()
//       .then( response => {
//         res.send(response);
//       })
//       .catch( error => {
//         console.log("E:", error);
//         res.send("Not Ok");
//       });
//   }
//   else{
//     var trans = new Transaction(req.body.data);
//     trans.save()
//       .then( response => {
//         res.send(response);
//       })
//       .catch( error => {
//         console.log("E2:", error);
//         res.send("Not Ok");
//       });
//   }
//   // res.send("ok");
// });

// utils -----------------------------------------------
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
// utils ----------------------------------------------- end --

// Monitor requests ----------
var count = 0;
setInterval(() => {
  if(count > 0){
    let rc = count; count = 0;
    // console.log("Rc:", rc);
    Monitor.findByIdAndUpdate({ _id : "6117c22745422c3508ee83b8" }, { '$inc' : { "requests" : rc}}, (err, res) => {
      if(err){
        count += rc;
      }
    })
  }
}, 5000);
router.use('/', (req, res, next) => {
  count += 1;
  next();
});
// Monitor requests ---------- end --

// public -------------- APIs
router.use('/public', publicRoutes);
// public -------------- APIs -- end --

/*
  // TODO:
  1. Account creation - SignUp/Login/Logout
  2. Account details - all parameters
  3. Transaction - Payments 
*/

router.use('/auth', authRouter);

// check for account 
router.use('/', (req, res, next) => {
  console.log("Authorize", req.body);
  console.log("Cookie", req.cookies);
  let token = req.cookies.jwt;
  if(token){
    let uid = parseId(token);
    if(uid){
      Account.findById(uid)
        .then( r => {
          next();
        })
        .catch( e => {
          res.statusCode = 404;
          res.send(msgwd(0, "Not Authorized"));    
        });
    }
    else{
      res.statusCode = 404;
      res.send(msgwd(0, "Not Authorized"));
    }
  }
  else{
    res.statusCode = 404;
    res.send(msgwd(0, "Not Authorized"));
  }
});

router.use('/account', accountRouter);

router.use('/payment', paymentRoutes);

module.exports = router;
