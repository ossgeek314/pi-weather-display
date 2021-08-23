function GetClock(){
var tday=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
var d=new Date();
var nday=d.getDay(),nmonth=(d.getMonth()+1),ndate=d.getDate(),nyear=d.getFullYear();
if(nmonth<=9) nmonth="0"+nmonth;
if(ndate<=9) ndate="0"+ndate;
var nhour=d.getHours(),nmin=d.getMinutes(),nsec=d.getSeconds();
if(nmin<=9) nmin="0"+nmin;
if(nsec<=9) nsec="0"+nsec;
if(nhour>12) nhour = nhour - 12;

//var clocktext=""+nyear+"-"+nmonth+"-"+ndate+" "+nhour+":"+nmin+":"+nsec+"";
var clocktext="<span id=\"clocktime\" style=\"font-size:4em;\">"+nhour+":"+nmin+"</span><span id=\"clocksec\" style=\"font-size:1.5em;\">"+nsec+"</span><br/><span id=\"clockday\" style=\"font-size:2em;text-align:left;\">"+tday[nday]+"</span><br /><span id=\"clockdate\">"+nyear+"-"+nmonth+"-"+ndate+"</span>";
document.getElementById('clockbox').innerHTML=clocktext;
}
