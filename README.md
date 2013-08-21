simple-open-weather
===================

It's a customizable jQuery plugin to show weather using OpenWeatherMap json api.


Usage
-----
Include jQuery and the plugin.
include an html5 data-* attribute in your div with coordinates or city name

```html
<div id="weather1" class="simpleopenweather" data-simpleopenweather-city="alcoy, alicante"></div>
<div id="weather2" class="simpleopenweather" data-simpleopenweather-coord="38.701052,-0.464172"></div>
```

Let the magic happen

```js
$(document).ready(function() {
	$("#weather1").simpleopenweather();
	$("#weather2").simpleopenweather();
});
```
or group them

```html
<div id="weather1" class="simpleopenweather spain" data-simpleopenweather-city="alcoy, alicante"></div>
<div id="weather2" class="simpleopenweather spain" data-simpleopenweather-city="madrid"></div>
```

Let the magic happen

```js
$(document).ready(function() {
	$(".spain").simpleopenweather();
});
```

Your can also write your own template (error and noweather are also available to override) using placeholders:
{{temperature[.current]}}: temperature (units can be selected, imperial by default)

{{temperature.max}}: maximum temperature (units can be selected, imperial by default)

{{temperature.min}}: minimum temperature (units can be selected, imperial by default)

{{place}}: name of the city or station id and coordinates

{{humidity}}: humidity %

{{cloudiness}}: cloudiness %

{{pressure}}: atmospheric pressure in kPa 

{{wind.speed}}: wind speed in m/s

{{wind.direction}}: wind direction in degrees

{{sky}}: human readable weather report (for example "few clouds")

{{icon}}: icon representing the weather from openweathermap.org (iconset is customizable! check the examples index.html file)

```js
$(document).ready(function() {
	$("#weather1").simpleopenweather({template: '<span>Temp: {{temperature}} ºC </span>', error: '<p>error</p>', noweather: '<p> there is not any weather station arround</p>', units: 'metric', lang: 'en', iconset: './iconset_demo/'});
});
```

For further information check the examples file

TODO
----
- Improve documentation
- Logic to hook right before the placeholder substitution allowing data manipulation (example: change pressure units)

License
-------
Plugin created by Christian Córdoba licensed under CC BY-SA. Data from www.openweathermap.org api.
