(function( $ ){
	$.fn.simpleopenweather = function(options){
		var defaults = {
			template: 	'<div class="simpleopenweather-place"> {{place}}: {{sky}} </div><div><span class="simpleopenweather-temperature">Temp: {{temperature}} ºC</span><span class="simpleopenweather-humidity"> Humidity: {{humidity}}%</span></div><span class="simpleopenweather-cloudiness">Cloudiness: {{cloudiness}}% </span>',
			noweather: 	'<p>no weather report was found for that place!</p>',
			error: 		'<p>something went wrong!</p>',
			latitude	: 0,
			longitude	: 0,
			units		: 'celsius',
			lang		: 'en'
		}
		var settings = $.extend(defaults, options);

		return this.each(function() {
			var item = $(this);
			var openweathermap_url = "http://api.openweathermap.org/data/2.5/weather";

			if(item.attr("data-simpleopenweather-city")){
				openweathermap_url += "?q=" + item.attr("data-simpleopenweather-city");
			} else if(item.attr("data-simpleopenweather-coord")){
				latlon = item.attr("data-simpleopenweather-coord").split(',');
				openweathermap_url += "?lat="+latlon[0]+"&lon="+latlon[1]+"&cnt=1";
			} else if(settings.latitude != 0 && settings.longitude != 0){
				openweathermap_url += "?lat="+settings.latitude+"&lon="+settings.longitude+"&cnt=1";
			}

			if(settings.lang != ''){
				openweathermap_url += "&lang="+settings.lang;
			}
			console.log(openweathermap_url);

			$.ajax({
				type: "GET",
				dataType: "jsonp",
				url: openweathermap_url,
				success: function(weather){
					if(!weather){
						item.html(settings.noweather);
						return;
					}
					temperature = (settings.units == "celsius") ? (weather.main.temp - 273.15) : (weather.main.temp - 241.15);
					var info = {temp : temperature.toFixed(1),
								humidity :weather.main.humidity,
								cloudiness: "N/A ",
								sky: weather.weather[0].description,
								icon: "http://openweathermap.org/img/w/"+weather.weather[0].icon+".png",
								place : weather.name};

					if(weather.clouds){
						info.cloudiness = weather.clouds.all;
					}

					item.html(settings.template.replace(/{{place}}/ig, info.place)
											 	.replace(/{{temperature}}/ig, info.temp)
											 	.replace(/{{humidity}}/ig, info.humidity)
											 	.replace(/{{cloudiness}}/ig, info.cloudiness)
												.replace(/{{icon}}/ig, info.icon)
											 	.replace(/{{sky}}/ig, info.sky));
				},
				error : function(){
					item.html(settings.error);
				}
			});
		});
	}
})( jQuery );