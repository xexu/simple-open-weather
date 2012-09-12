(function( $ ){
	$.fn.simpleopenweather = function(options){
		var defaults = {template: '<div class="simpleopenweather-place"> {{place}} {{sky}} </div><div><span class="simpleopenweather-temperature">Temp: {{temperature}} ºC</span><span class="humidity"> Humidity: {{humidity}}%</span></div><span class="cloudiness">Cloudiness: {{cloudiness}}% </span>'}
		var settings = $.extend(defaults, options);

		return this.each(function() {
			var item = $(this);
			var openweathermap_url = "http://openweathermap.org/";

			if(item.attr("data-simpleopenweather-city")){
				openweathermap_url += "data/2.0/find/name?q=" + item.attr("data-simpleopenweather-city");
			} else if(item.attr("data-simpleopenweather-coord")){
				latlon = item.attr("data-simpleopenweather-coord").split(',');
				openweathermap_url += "data/2.0/find/station?lat="+latlon[0]+"&lon="+latlon[1]+"&cnt=1";
			}

			$.ajax({
				type: "GET",
				dataType: "jsonp",
	       		url: openweathermap_url,
	  			success: function(resp){
	  				weather = resp.list[0];
	  				if(!weather){
	  					item.html("<p>no weather report was found for that place!</p>");
	  					return;
	  				}
	  				var info = {temp : (weather.main.temp - 273.15).toFixed(2),
	  							humidity :  weather.main.humidity,
	  							cloudiness: "N/A ",
	  							status: ""};

	  				if(weather.clouds){
	  					info.cloudiness = weather.clouds.all;
	  					if(info.cloudiness < 50){
		  					info.status = "is sunny";
		  				} else{
		  					info.status = "is cloudy";
		  				}
	  				}

	  				if(weather.type == "city"){
	  					info.place = weather.name;
	  				} else {
	  					info.place = "Station #" + weather.id + "(" + weather.coord.lat + "," + weather.coord.lon + ")";
	  				}

					item.html(settings.template.replace(/{{place}}/ig, info.place)
											   .replace(/{{temperature}}/ig, info.temp)
											   .replace(/{{humidity}}/ig, info.humidity)
											   .replace(/{{cloudiness}}/ig, info.cloudiness)
											   .replace(/{{sky}}/ig, info.status));
	  			},
	  			error : function(){
	  				item.html("<p>something went wrong!</p>");
	  			}
	  		});
		});
	}
})( jQuery );