
//xhr.send();

//console.log(xhr.responseText);
(function($){

function loadData() {

    var url_yahoo = "http://query.yahooapis.com/v1/public/yql?q=select * from xml where url=";
    var url_nbrb = "'" + encodeURIComponent("http://www.nbrb.by/Services/XmlExRatesDyn.aspx?curId=145&fromDate=1/10/2016&toDate=1/20/2016") + "'&format=json";
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
            console.log(xhr.responseText);
            showRates(rates);

        }

    };
    xhr.send();

}

function showRates(rates) {

    rates.query.results.Currency.Record.forEach(function(dataRate) {
        $('#list').append('<li>Detal: ' + dataRate.Date + ' and:' + dataRate.Rate + '</li>');
    });
}


    $(document).ready(function(){
        loadData();
    });

})(jQuery);