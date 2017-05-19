'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ApplicationSchema = new Schema({
    user_id: {
        type: Number,
        required: true
    },
    job_id: {
        type: Number,
        required: true
    },
    apply_time: {
        type: Date
    }
});

ApplicationSchema.pre('save', function(next){
    this.apply_time = new Date();
     next();
});

mongoose.model('Application', ApplicationSchema);