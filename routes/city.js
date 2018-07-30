const express = require('express');
const router = express.Router();
const states = require('../states');
const http = require('http');
const Xray = require('x-ray');
x = Xray();
let crimeData;
const crimeDic = {
    Murder: "tr.norm2",
    Rape:"tr:nth-child(3)",
    Robbery:"tr:nth-child(5)",
    Assault:"tr:nth-child(7)",
    Burglary:"tr:nth-child(9)",
    Theft:"tr:nth-child(11)",
    Auto_Theft:"tr:nth-child(13)",
    Arson:"tr:nth-child(15)",
};

render = function (req, res, next) {
    res.render('crimeResult', {
        title: "Will You be a victim of "+ req.query.crimes +" in " + crimeData.city +"?",
        crimeData: crimeData,
        crime: req.query.crimes,
        url: req.query.city
    });
    next();
};

function parseCrimePromise(req,res, next){
    x(String(req.query.city), {
        city: 'h1',
        rate: `table.crime tbody ${crimeDic[req.query.crimes]} td:last-child`
    }).then(res => {
        console.log(res);
        crimeData = res;
        next();
    }, error => {console.log("error",error);
        res.send('error getting data');
    })
}

router.get('/', parseCrimePromise, render, function(req, res, next) {
});


module.exports = router;
