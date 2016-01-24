
(function($){

    var today = tempus().format('%m/%d/%Y');
    var today_five = tempus().calc({month: -5}).format('%m/%d/%Y');

    function loadData() {

    var url_yahoo = "http://query.yahooapis.com/v1/public/yql?q=select * from xml where url=";
    var url_nbrb = "'" + encodeURIComponent("http://www.nbrb.by/Services/XmlExRatesDyn.aspx?curId=145&fromDate=" + today_five + "&toDate=" + today) + "'&format=json";
    var query = url_yahoo + url_nbrb;
    var xhr = new XMLHttpRequest();
    xhr.open('GET', query);

    xhr.onreadystatechange = function() {
        if (xhr.readyState != 4) return;

        if (xhr.status != 200) {
            // обработать ошибку
            alert(xhr.status + ': ' + xhr.statusText);
        } else {
            try {
                var rates = JSON.parse(xhr.responseText);
            } catch (e) {
                alert("Некорректный ответ " + e.message);
            }

            showRates(rates);

        }

    };
    xhr.send();

}

function showRates(rates) {

    //rates.query.results.Currency.Record.forEach(function(dataRate) {
    //    $('#list').append('<li>Detal: ' + dataRate.Date + ' and:' + dataRate.Rate + '</li>');
    //});


    //console.log(rates.query.results.Currency.Record);
    AmCharts.makeChart("chartdiv", {
        type: "serial",
        dataProvider : rates.query.results.Currency.Record,
        categoryField: "Date",
        //rotate: true,

        categoryAxis: {
            gridPosition: "start",
            axisColor: "#DADADA",
            labelRotation : 90
        },
        valueAxes: [{
            axisAlpha: 0.5
        }],
        graphs: [{
            type: "line",
            //title: "Income",
            valueField: "Rate",
            bullet : "round",
            bulletBorderColor : "#FFFFFF",
            bulletBorderThickness : 2,
            bulletBorderAlpha : 1,
            lineColor : "#5fb503",
            lineAlpha: 0,
            fillColors: "#ADD981",
            fillAlphas: 0.8,
            negativeLineColor : "#efcc26",
            hideBulletsCount : 500, // !!!
            balloonText: "[[value]]"
        }]
    });

}



    $(document).ready(function(){
        loadData();

    });


})(jQuery);