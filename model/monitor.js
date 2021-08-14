var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var monitor = new Schema({
    mid : {
        type : Number,
        unique : true
    },
    requests : {
        type : Number,
        default : 0
    }
});

var Monitor = mongoose.model('Monitor', monitor);

module.exports = Monitor;