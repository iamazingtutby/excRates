// ���������
var months=["������","�������","�����","������","���","����","����","�������","��������","�������","������","�������"];
var weekdays=["�����������","�����������","�������","�����","�������","�������","�������"];
var timeofday = ["�����", "�����", "����", "�������"];


// �������������� ���� ������ � ��������� �������������
function convertMonth(t)
{
    if(t>=1&&t<=12)
        return months[t-1];
    else
        return "";
}

// �������������� ���� ��� ������ � ��������� �������������
function convertWeekday(w)
{
    if(w>=1&&w<=7)
        return weekdays[w-1];
    else
        return "";
}

// �������������� ���� ������� ����� � ��������� �������������
function convertToD(t)
{
    if(t>=0&&t<=3)
        return timeofday[t];
    else
        return "";
}

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
    var towns=xml.getElementsByTagName("TOWN");
    var town=null;
    if(towns)
    for(var i1=0; i1<towns.length; i1++)
    {
        town=towns[i1];
        var tw_attr = getAttributes(town);
        //var t_town=template.town.replace(/\{sname\}/g,unescape(tw_attr['sname'])).replace(/\{latitude\}/g,tw_attr['latitude']).replace(/\{longitude\}/g,tw_attr['longitude']).replace(/\{index\}/g,tw_attr['index']);
        // ������ ������ ������� XML-��������� - FORECAST
        var forecasts=town.getElementsByTagName("FORECAST");
        var forecast=null;
        var t_forecasts="";
        if(forecasts)
        for(var i2=0; i2<forecasts.length; i2++)
        {
            forecast=forecasts[i2];
            var fc_attr = getAttributes(forecast);
            //var fc_date = convertToD(fc_attr['tod']) + " "+ fc_attr['day'] + " " + convertMonth(fc_attr['month']) + " " + fc_attr['year']+ " ����.";
            var t_forecast=template.forecast.replace(/\{weekday\}/g,fc_attr['weekday']).replace(/\{sweekday\}/g,convertWeekday(fc_attr['weekday'])).replace(/\{tod\}/g,fc_attr['tod']).replace(/\{stod\}/g,convertToD(fc_attr['tod'])).replace(/\{day\}/g,fc_attr['day']).replace(/\{smonth\}/g,convertMonth(fc_attr['month'])).replace(/\{month\}/g,fc_attr['month']).replace(/\{year\}/g,fc_attr['year']).replace(/\{hour\}/g,fc_attr['hour']).replace(/\{predict\}/g,fc_attr['predict']);
            // ������ ������ ������� XML-��������� - ���� ��������� ������
            var params=forecast.childNodes;
            var t_heat=t_phenomena=t_pressure=t_temperature=t_wind=t_relwet="";
            if(params)
            for(var i3=0; i3<params.length; i3++)
            {
                param=params[i3];
                var tmp=getAttributes(param);
                switch(param.nodeName)
                {
                    case "TEMPERATURE": // ������ �����������
                        var t_temperature=template.temperature.replace(/\{min\}/g,tmp['min']).replace(/\{max\}/g,tmp['max']);
                        break;
                }
            }
            var t_forecast=template.t_forecast.replace(/\{forecast\}/g,t_forecast).replace(/\{phenomena\}/g, t_phenomena).replace(/\{pressure\}/g,t_pressure).replace(/\{temperature\}/g,t_temperature).replace(/\{wind\}/g,t_wind).replace(/\{relwet\}/g,t_relwet).replace(/\{heat\}/g,t_heat);
            t_forecasts+=t_forecast;
        }
        var t_forecast_town=template.t_template.replace(/\{forecasts\}/g, t_forecasts);
        output+=t_forecast_town;
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

