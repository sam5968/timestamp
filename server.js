var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var staticAssets = __dirname + '/public';
var indexHTML = __dirname + '/views/index.html';

app.get('/', function(req, res) {
    res.sendFile(indexHTML);
});

app.use(express.static(staticAssets));


app.get('/:param', function(req, res) {

    
    var obj = {
        "unix": null,
        "natural": null
    }

    
    var params = req.params.param;
    
    var regexOnlyNumbers = /^[0-9]{1,}$/g;
    var regexNaturalDate = /([A-Z]{1}[a-z]{2,})|([a-z]{3,})/g;

    var monthsShort = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var monthsLong = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]; 
    

    if (regexNaturalDate .test(params)) {
        var dateUnix = Date.parse(params) / 1000;
        var dateNatural = new Date(params).toDateString().split(' ').slice(1);
      
        for (let month in monthsShort) {
            if (dateNatural[0] == monthsShort[month]) {
                dateNatural[0] =   monthsLong[month];
            }
        }
        if (dateNatural.length >= 2) {

            obj['unix'] = dateUnix;
            obj['natural'] = `${dateNatural[0]} ${dateNatural[1]}, ${dateNatural[2]}`;
        }
    }

    
    if (regexOnlyNumbers.test(params)) {
      
        var jsTimestamp = (params * 1000);
        var date = new Date(jsTimestamp).toDateString().split(' ').slice(1);
       
        for (let month in monthsShort) {
            if (date[0] == monthsShort[month]) {
                date[0] =   monthsLong[month];
            }
        }

        if (date.length > 1) {

            obj['unix'] = parseInt(params);
            obj['natural'] = `${date[0]} ${date[1]}, ${date[2]}`;
        }
    }

    res.send(JSON.stringify(obj));
});

app.listen(port, function() {
    console.log(`Server is listening on port : ${port}`)
});