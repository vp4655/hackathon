'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var JobSchema = new Schema({
    job_name: {
        type: String,
        required: true
    },
     updated: {
        type: Date
    },
    created: {
        type: Date,
        default: Date.now
    }
});

mongoose.model('Job', JobSchema);