'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MeetingSchema = new Schema({
    user_id: {
        type: Number,
        required: true
    },
    company_id: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    user_confirmed: {
        type: Boolean,
        default: false
    },
    company_confirmed: {
        type: Boolean,
        default: false
    }
});

mongoose.model('Meeting', MeetingSchema);