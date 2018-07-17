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

webScrape = function(city, state){
    x('https://www.city-data.com/crime/crime-' + city + '-' + state + '.html', '#crimeTab tbody tr', {
        CrimeName: ['td b'],
        t:['td:last-child small']
    }).write('./flare.json');
};

getCityNames = function (req, res, next) {

    x('http://www.city-data.com/city/'+ req.query.state +'.html', '#cityTAB tbody .rB',[{
        cityName: [' td  a'],//,
        cityURL:[' td  a']

    }])( function (err, res) {
        if(err){ console.log("error");
        }
        else {
            console.log("get city data: ", req.method, req.path);
            cityCrawl = res;
            console.log(cityCrawl);
        }
    });
        next();
};

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Will You Get Murdered?',
      states: states.states,
      cities: cityCrawl.cityName,
      currentState: undefined
    });
});

module.exports = router;
