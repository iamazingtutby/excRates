
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
        alert("XML!!!");
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
    
    (function($){
        $(xml).find('Currency').each(function(){
            var id_user = $(this).find('Record').attr('Date'); // получаем значение атрибута id_user

        });

        console.log(html);
    })(jQuery);


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
