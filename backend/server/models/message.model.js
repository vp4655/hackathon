'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MessageSchema = new Schema({
    message: {
        type: String,
        required: true
    },
    user_id: {
        type: Number,
        required: true
    },
    comany_id: {
        type: Number,
        required: true
    },
    sent_time: {
        type: Date
    }
});

MessageSchema.pre('save', function(next){
    this.sent_time = new Date();
     next();
});

mongoose.model('Message', MessageSchema);