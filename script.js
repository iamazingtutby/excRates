// ������ � ������ ��������� XML-����
function getAttributes(node)
{
    var ret = new Object();
    if(node.attributes)
        for(var i=0; i<node.attributes.length; i++)
        {
            var attr = node.attributes[i];
            ret[attr.name] = attr.value;
        }
    return ret;
}

//��������� XML-��������
function getXMLDocument(url)
{
    var xml;
    if(window.XMLHttpRequest)
    {
        xml=new window.XMLHttpRequest();
        xml.open("GET", url, false);
        xml.send("");
        return xml.responseXML;
    }
    else
    if(window.ActiveXObject)
    {
        xml=new ActiveXObject("Microsoft.XMLDOM");
        xml.async=false;
        xml.load(url);
        return xml;
    }
    else
    {
        alert("�������� XML �� �������������� ���������");
        return null;
    }
}

// ������ XML-���������
function parseGismeteoXML(url, template)
{
    var output="";
    // �������� ��������� XML-��������
    var xml=null;
    try
    {
        xml=getXMLDocument(url);
        if(!xml) return "<font color='red'>��� ������</font>";
    }
    catch(e)
    {
        return "<font color='red'>"+e.message+"</font>";
    }
    // ������ ������ ������� XML-��������� - TOWN
    var towns=xml.getElementsByTagName("Currency");
    var town=null;
    if(towns)
        for(var i1=0; i1<towns.length; i1++)
        {
            town=towns[i1];
            //var tw_attr = getAttributes(town);
            // ������ ������ ������� XML-��������� - FORECAST
            var forecasts=town.getElementsByTagName("Record");
            var forecast=null;
            var t_forecasts="";
            if(forecasts)
                for(var i2=0; i2<forecasts.length; i2++)
                {
                    forecast=forecasts[i2];
                    var fc_attr = getAttributes(forecast);

                    var params=forecast.childNodes;
                    if(params)
                        for(var i3=0; i3<params.length; i3++)
                        {
                            param=params[i3];
                            var tmp=getAttributes(param);
                            switch(param.nodeName)
                            {
                                case "Rate":
                                    var t_temperature=template.temperature;
                                    break;
                            }
                        }
                    var t_forecast=template.t_forecast.replace(/\{forecast\}/g,t_forecast).replace(/\{temperature\}/g,t_temperature);
                    t_forecasts+=t_forecast;
                }
            var t_forecast_town=template.t_template.replace(/\{forecasts\}/g, t_forecasts);
            output+=t_forecast_town;


            console.log(output);
        }
    return output;

}

// ������������ �������� gismeteo
function drawGismeteoInformer(url, div, template)
{
    var div=document.getElementById(div);
    if(!div) return;
    var output=parseGismeteoXML(url, template);
    div.innerHTML=output;
}
//
//$(document).ready(function() {
//        ajaxGetXML();
//
//});
//
//function ajaxGetXML(){
//    $.ajax({
//        type: "POST", // метод передачи данных
//        url: "test.xml", // путь к xml файлу
//        dataType: "xml", // тип данных
//        // если получили данные из файла
//        success: function(data) {
//            var html = "";
//            // перебираем все теги person
//            $(data).find('person').each(function(){
//                var id_user = $(this).find('role').attr('id_user'); // получаем значение атрибута id_user
//                var first_name = $(this).find('first_name').html(); // получаем значение тега first_name
//                var last_name = $(this).find('last_name').html(); // получаем значение тега last_name
//                var role = $(this).find('role').html(); // получаем значение тега role
//                html += "<label>ID: "+id_user+"</label><br/>";
//                html += "<label>Пользователь: "+first_name+" "+last_name+"</label><br/>";
//                html += "<label>Права: "+role+"</label>";
//                html += "<hr/>";
//            });
//            $('#forecast').html(html); // выводим данные
//        },
//        // если произошла ошибка при получении файла
//        error: function(){
//            alert('ERROR');
//        }
//
//    });
//}
