var weather_config = {
	lat:0.0,
	lon:0.0,
	api_key:"super_secret",
	api_base:"https://api.openweathermap.org/data/",
	api_ver:"2.5"
}


function fetchData (url, method = "GET", data = null) {
	return new Promise(function (resolve, reject) {
		var request = new XMLHttpRequest();
		request.open(method, url, true);
		request.onreadystatechange = function () {
			if (this.readyState === 4) {
				if (this.status === 200) {
					resolve(JSON.parse(this.response));
				} else {
					reject(request);
				}
			}
		};
		request.send();
	});
}

function simpleMoon(year,month,day) {
	var lp = 2551443; 
	var now = new Date(year,month-1,day,20,35,0);						
	var new_moon = new Date(1970, 0, 7, 20, 35, 0);
	var phase = ((now.getTime() - new_moon.getTime())/1000) % lp;
	return Math.floor(phase /(24*3600));
}

function getOpenWeather(){
    var url = weather_config.api_base + weather_config.api_ver + "/weather?lat=" + weather_config.lat + "&lon=" + weather_config.lon + "&appid=" + weather_config.api_key;
    var promisedata = fetchData(url);
    promisedata.then(function(data){
		if (data.hasOwnProperty("main")) {
			var iconstr = "<i class=\"wi wi-owm-" + data.weather[0].icon + "\"></i>";
                        var descstr = data.weather[0].main;
                        if (data.weather.length > 1){
                                iconstr = "<div style=\"position:absolute;margin-left:30px;\">" + iconstr + "</div>";
                                iconstr = iconstr + "<div style=\"width:55%;overflow:hidden;display:inline-block;transform:skewX(-192deg);background:#000;margin-left:96px;border-left:#fff 1px solid;\">";
                                iconstr = iconstr + "<div style=\"transform: skewX(192deg);margin-left: -59px;margin-top: 3px;\"><i class=\"wi wi-owm-" + data.weather[1].icon + "\"></i></div></div>";
                                descstr = descstr + " / " + data.weather[1].main;
                        }
			var sunrise = data.sys.sunrise;
			var sunset = data.sys.sunset;
			dsr = new Date(0);
			dss = new Date(0);
			dsr.setUTCSeconds(sunrise);
			dss.setUTCSeconds(sunset);
			var temp = 9.0/5.0*(data.main.temp - 273.0)+32.0;
			var feels_like = 9.0/5.0*(data.main.feels_like - 273.0)+32.0;
			temp = Math.round(temp);
			feels_like = Math.round(feels_like);
			var humidity = data.main.humidity;

			var nhour=dsr.getHours(),nmin=dsr.getMinutes();
			if(nmin<=0) nmin="0"+nmin;
			var sunrisestr = nhour + ":" + nmin;
			nhour=dss.getHours(),nmin=dss.getMinutes();
			if(nmin<=0) nmin="0"+nmin;
			var sunsetstr = nhour + ":" + nmin;

			var d=new Date();
			var nmonth=(d.getMonth()+1),ndate=d.getDate(),nyear=d.getFullYear();
			var moonphase = simpleMoon(nyear,nmonth,ndate);
			// <i class="wi wi-moon-wax-cres"></i>
			var moonphasestr = "";
			if(moonphase == 0){
				moonphasestr = "<i class=\"wi wi-moon-new-dark\"></i>";
			}	
			if((moonphase >= 1) && (moonphase <= 6)){
				moonphasestr = "<i class=\"wi wi-moon-wax-cres-dark\"></i>";
			}	
			if(moonphase == 7){
				moonphasestr = "<i class=\"wi wi-moon-first-quart-dark\"></i>";
			}
			if((moonphase >= 8) && (moonphase <= 14)){
				moonphasestr = "<i class=\"wi wi-moon-wax-gibb-dark\"></i>";
			}	
			if(moonphase == 15){
				moonphasestr = "<i class=\"wi wi-moon-full-dark\"></i>";
			}	
			if((moonphase >= 16) && (moonphase <= 21)){
				moonphasestr = "<i class=\"wi wi-moon-wan-gibb-dark\"></i>";
			}	
			if(moonphase == 22){
				moonphasestr = "<i class=\"wi wi-moon-third-quart-dark\"></i>";
			}	
			if(moonphase >= 23){
				moonphasestr = "<i class=\"wi wi-moon-wan-cres-dark\"></i>";
			}	
			console.log(nyear + "-" + nmonth + "-" + ndate);
			console.log(moonphase);	
			console.log(moonphasestr);
			document.getElementById('owmicon').innerHTML=iconstr;		
			document.getElementById('owmdesc').innerHTML=descstr;
			document.getElementById('owmtemp').innerHTML="" + temp + "";
			document.getElementById('owmfeels').innerHTML="" + feels_like + "";
			document.getElementById('sunrise').innerHTML=sunrisestr;
			document.getElementById('sunset').innerHTML=sunsetstr;		
			document.getElementById('moonphase').innerHTML=moonphasestr;
		}else{
			console.log("error: unable to read 'current' property from data");
			console.log(data);
		}
	
	
	});
}
