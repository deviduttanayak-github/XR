var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var transaction = new Schema({
    tid : {
        type : String,
        require : true
    },
    amount : {
        type : Number 
    },
    creditOn : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Account' 
    },
    debitOn : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Account'
    },
}, {
    timestamps : true
});

var Transaction = mongoose.model('Transaction', transaction);
module.exports = Transaction;