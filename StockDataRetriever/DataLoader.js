var YQL = require('yql');
var fs = require('fs');


var interest_list = ["600611.SS"];
var startdate = "2015-1-15";
var enddate = "2015-3-15";
var filename = 'historical';
var filename_date = 'historical_date';
var query_historical = new YQL('select * from yahoo.finance.historicaldata where symbol in ("' + interest_list.join() + '") and startDate = "' + startdate + '" and endDate = "' + enddate + '"');
var file_data = "Date,Open,High,Low,Close,Volume\n";
/*
if (!fs.existsSync(filename_date)) {
    startdate = "2014-10-15";
    enddate = "2015-10-15";
    var date = new Date(startdate);
    console.log(JSON.stringify(date));
    fs.appendFile('historical_date', file_data, function (err) {
    });
}
*/
if (!fs.existsSync(filename)) {
    fs.appendFile('historical', file_data, function (err) {
    });
}
file_data = "";
query_historical.exec(function (err, data) {
    var list = data.query.results.quote;
    if (data.query.count == 1)
    {
        file_data += list.Date + ",";
        file_data += list.Open + ",";
        file_data += list.High + ",";
        file_data += list.Low + ",";
        file_data += list.Close + ",";
        file_data += list.Volume + "\n";
    }
    else if (data.query.count >= 1)
    {
        for (var i = 0; i < list.length; i++) {
            var iter = list[i];
            file_data += iter.Date + ",";
            file_data += iter.Open + ",";
            file_data += iter.High + ",";
            file_data += iter.Low + ",";
            file_data += iter.Close + ",";
            file_data += iter.Volume + "\n";
        }
    }
    fs.appendFile('historical', file_data, function (err) {
    });
});