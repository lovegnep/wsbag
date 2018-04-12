const express = require('express');
const router = express.Router();
const Async = require('async');
let canvas = require('../canvas-img/validate');

router.get('/', function(req, res, next){//
        res.send("hello");
});

module.exports = router;
