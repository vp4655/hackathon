'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    passport = require('passport'),
    User = mongoose.model('User'),
    jwt = require('jsonwebtoken'),
    config = require('../../../config/config')

function reportNoFolderError(res){
    console.log('No folder sent!');
    res.status(500).send({
        message: 'Internal server error.',
        hasError: true
    })
}

exports.list = function(req, res) {
    res.json({it: 'works'});
};

exports.create = function(req, res) {
    var folder = req.body.folder;

    if(folder){
        
    }
    else {
        reportNoFolderError(res);
    }

};

exports.delete = function(req, res){
    var folder = req.query.folder;

    if(folder){
        
    }
    else{
        reportNoFolderError(res);
    }
};