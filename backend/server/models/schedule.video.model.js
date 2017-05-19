'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ScheduleVideoSchema = new Schema({
    sender_id: {
        type: Number,
        required: true
    },
    reciever_id: {
        type: Number,
        required: true
    },
    schedule_time: {
        type: Date
    },
    confirmed: {
        type: Boolean
    }
});

mongoose.model('ScheduleVideo', ScheduleVideoSchema);