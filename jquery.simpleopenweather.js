(function( $ ){
	$.fn.simpleopenweather = function(options){
		var defaults = {template: '<div class="simpleopenweather-place"> {{place}}: {{sky}} </div><div><span class="simpleopenweather-temperature">Temp: {{temperature}} ºC</span><span class="simpleopenweather-humidity"> Humidity: {{humidity}}%</span></div><span class="simpleopenweather-cloudiness">Cloudiness: {{cloudiness}}% </span>',
						noweather: '<p>no weather report was found for that place!</p>',
						error: '<p>something went wrong!</p>'}
		var settings = $.extend(defaults, options);

		return this.each(function() {
			var item = $(this);
			var openweathermap_url = "http://openweathermap.org/data/2.1/";

			if(item.attr("data-simpleopenweather-city")){
				openweathermap_url += "find/name?q=" + item.attr("data-simpleopenweather-city");
			} else if(item.attr("data-simpleopenweather-coord")){
				latlon = item.attr("data-simpleopenweather-coord").split(',');
				openweathermap_url += "find/city?lat="+latlon[0]+"&lon="+latlon[1]+"&cnt=1";
			}

			$.ajax({
				type: "GET",
				dataType: "jsonp",
				url: openweathermap_url,
				success: function(resp){
					weather = resp.list[0];
					if(!weather){
						item.html(settings.noweather);
						return;
					}
					var info = {temp : (weather.main.temp - 273.15).toFixed(2),
								humidity :weather.main.humidity,
								cloudiness: "N/A ",
								sky: weather.weather[0].description,
								place : weather.name};

					if(weather.clouds){
						info.cloudiness = weather.clouds.all;
					}

					item.html(settings.template.replace(/{{place}}/ig, info.place)
											 	.replace(/{{temperature}}/ig, info.temp)
											 	.replace(/{{humidity}}/ig, info.humidity)
											 	.replace(/{{cloudiness}}/ig, info.cloudiness)
											 	.replace(/{{sky}}/ig, info.sky));
				},
				error : function(){
					item.html(settings.error);
				}
			});
		});
	}
})( jQuery );