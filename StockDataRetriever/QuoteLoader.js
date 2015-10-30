var YQL = require('yql');
var fs = require('fs');

var interest_list = ["600611.SS", "600650.SS", "600284.SS"];
var filename = 'historical_quote';
var query_historical = new YQL('select * from yahoo.finance.quotes where symbol in ("' + interest_list.join() + '")');
var file_data = "";
var title = "DateTime,Ask,AverageDailyVolume,Bid,BookValue,Change_PercentChange,Change,DividendShare,LastTradeDate,EarningsShare,EPSEstimateCurrentYear,EPSEstimateNextYear,EPSEstimateNextQuarter,DaysLow,DaysHigh,YearLow,YearHigh,MarketCapitalization,EBITDA,ChangeFromYearLow,PercentChangeFromYearLow,ChangeFromYearHigh,PercebtChangeFromYearHigh,LastTradeWithTime,LastTradePriceOnly,DaysRange,FiftydayMovingAverage,TwoHundreddayMovingAverage,ChangeFromTwoHundreddayMovingAverage,PercentChangeFromTwoHundreddayMovingAverage,ChangeFromFiftydayMovingAverage,PercentChangeFromFiftydayMovingAverage,Open,PreviousClose,ChangeinPercent,PriceSales,PriceBook,ExDividendDate,PERatio,DividendPayDate,PEGRatio,PriceEPSEstimateCurrentYear,PriceEPSEstimateNextYear,ShortRatio,LastTradeTime,OneyrTargetPrice,Volume,YearRange,DividendYield,PercentChange"
var titlelist = title.split(",");
setInterval(function () {
    var day = new Date(Date.now()).getDay();
    var hour = new Date(Date.now()).getHours();
    if (day == 6 || day == 5 || hour<17)
    {
        console.log(new Date(Date.now()) + ": resting\n");
    }
    else
    {
        console.log(new Date(Date.now()) + ": requesting data\n");
        query_historical.exec(function (err, data) {
            var list = data.query.results.quote;
            var time = new Date(Date.now());
            if (data.query.count == 1) {
                var file_data = "";
                file_data += Date.now();
                //file_data += time.getUTCFullYear() + "/" + (time.getUTCMonth() + 1) + "/" + time.getUTCDate();
                for (var attr in titlelist) {
                    var check = parseFloat(list[titlelist[attr]]);
                    if (!isNaN(check)) {
                        file_data += check + ",";
                    }
                    else
                        file_data += ",";
                }
                if (file_data.indexOf(",,,,,,,,") == -1) {
                    file_data = file_data.substring(0, file_data.length - 1);
                    file_data += "\n";
                    if (!fs.existsSync(filename + "_" + list.symbol)) {
                        fs.appendFile(filename + "_" + list.symbol, title + "\n" + file_data, function (err) {
                        });
                    }
                    else
                        fs.appendFile(filename + "_" + list.symbol, file_data, function (err) {
                        });
                }
            }
            else if (data.query.count >= 1) {
                for (var i = 0; i < list.length; i++) {
                    var iter = list[i];
                    var file_data = "";
                    file_data += Date.now();
                    //file_data += time.getUTCFullYear() + "/" + (time.getUTCMonth() + 1) + "/" + time.getUTCDate();
                    for (var attr in titlelist) {
                        var check = parseFloat(iter[titlelist[attr]]);
                        if (!isNaN(check)) {
                            file_data += check + ",";
                        }
                        else
                            file_data += ",";
                    }
                    if (file_data.indexOf(",,,,,,,,") == -1) {
                        file_data = file_data.substring(0, file_data.length - 1);
                        file_data += "\n";
                        if (!fs.existsSync(filename + "_" + iter.symbol)) {
                            fs.appendFile(filename + "_" + iter.symbol, title + "\n" + file_data, function (err) {
                            });
                        }
                        else
                            fs.appendFile(filename + "_" + iter.symbol, file_data, function (err) {
                            });
                    }
                }
            }
        });
    }
}, 60 * 1000);
