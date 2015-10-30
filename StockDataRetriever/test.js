var YQL = require('yql');
var fs = require('fs');

fs.appendFile('data','test',function(err){
});



var query = new YQL('select * from yahoo.finance.historicaldata where symbol in ("YHOO")');

query.exec(function(err, data) {
	var tmp=data.query.results.quote;
    console.log('The current weather in ' + JSON.stringify(tmp) + ' degrees.');
});