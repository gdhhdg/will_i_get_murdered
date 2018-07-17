/**
 * Created by gunnerhatmaker on 7/4/18.
 */
const express = require('express');
const router = express.Router();
const states = require('../states');
const http = require('http');
const Xray = require('x-ray');
x = Xray();
let city;
let cityCrawl={cityName:[],
    url:[]
};

render = function (req, res, next) {
    console.log("state is",req.query.state);
    res.render('index', {
        title: 'Will You Get Murdered in ' + String(req.query.state).replace(/-/g," ") + "?",
        states: states.states,
        cities: cityCrawl,
        currentState: req.query.state
    });
    next();
};

 function getCityNamesPromise(req,res,next) {
         x('http://www.city-data.com/city/' + req.query.state + '.html', '#cityTAB tbody tr.rB ',[{
             cityName: ['td  a'],//,
             cityURL:['td  a@href']
         }]).then(res => {console.log(res);
         cityCrawl = res;
         next();
         }, error => {
             res.send('err');
         });

 }

router.get('/', getCityNamesPromise,render, function(req, res, next) {

});

module.exports = router;
