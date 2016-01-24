
(function($){

    var today = tempus().format('%m/%d/%Y');
    var today_five = tempus().calc({month: -3}).format('%m/%d/%Y');

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
            //alert(xhr.status + ': ' + xhr.statusText);
        } else {
            try {
                var rates = JSON.parse(xhr.responseText);
            } catch (e) {
                //alert("Некорректный ответ " + e.message);
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
    var chart = AmCharts.makeChart("chartdiv", {

        "type": "serial",
        dataProvider : rates.query.results.Currency.Record,
        "theme": "light",
        //"marginRight": 80,
        "marginLeft": 50,
        //"marginBottom": 150,
        "autoMarginOffset": 50,
        //"dataDateFormat": "YYYY-MM-DD",
        "valueAxes": [{
            //"id": "v1",
            "axisAlpha": 0,
            "position": "left",
            "ignoreAxisWidth":true
        }],
        "balloon": {
            "borderThickness": 1,
            "shadowAlpha": 0
        },

        "graphs": [{
            "id": "g1",
            "balloon":{
                "drop":false,
                "adjustBorderColor":false,
                "color":"#ffffff"
            },
            "bullet": "round",
            "bulletBorderAlpha": 1,
            "bulletColor": "#FFFFFF",
            "bulletSize": 5,
            "hideBulletsCount": 10,
            //"lineThickness": 2,
            "title": "red line",
            "useLineColorForBulletBorder": true,
            "valueField": "Rate",
            "balloonText": "<span style='font-size:15px;'>[[value]]</span>"
        }],
        //"chartScrollbar": {
        //    "graph": "g1",
        //    "oppositeAxis":false,
        //    "offset":30,
        //    "scrollbarHeight": 80,
        //    "backgroundAlpha": 0,
        //    "selectedBackgroundAlpha": 0.1,
        //    "selectedBackgroundColor": "#888888",
        //    "graphFillAlpha": 0,
        //    "graphLineAlpha": 0.5,
        //    "selectedGraphFillAlpha": 0,
        //    "selectedGraphLineAlpha": 1,
        //    "autoGridCount":true,
        //    "color":"#AAAAAA"
        //},
        "chartCursor": {
            "pan": true,
            //"valueLineEnabled": true,
            //"valueLineBalloonEnabled": true,
            "cursorAlpha":1,
            "cursorColor":"#258cbb",
            "limitToGraph":"g1",
            "valueLineAlpha":0.2
        },
        //"valueScrollbar":{
        //    "oppositeAxis":false,
        //    "offset":50,
        //    "scrollbarHeight":10
        //},
        "categoryField": "Date",
        "categoryAxis": {
                gridPosition: "start",
                axisColor: "#DADADA",
                //labelRotation : 90,

            "parseDates": true,
            "axisAlpha": 0,
            "gridAlpha": 0,
            "inside": false,
            "tickLength": 0
        }

    });

    chart.addListener("rendered", zoomChart);

    zoomChart();

    function zoomChart() {
        chart.zoomToIndexes(chart.dataProvider.length - 15, chart.dataProvider.length - 1);
    }

}



    $(document).ready(function(){
        loadData();

    });


})(jQuery);