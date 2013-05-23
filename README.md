simple-open-weather
===================

It's a jQuery plugin to show weather using OpenWeatherMap json api.


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
{{temperature}}: temperature in Celsius degrees
{{place}}: name of the city or station id and coordinates
{{humidity}}: humidity %
{{cloudiness}}: cloudiness %
{{sky}}: human readable weather report (for example "few clouds")

```js
$(document).ready(function() {
	$("#weather1").simpleopenweather({template: '<span>Temp: {{temperature}} ºC </span>', error: '<p>error</p>', noweather: '<p> there isn't any weather station arround</p>'});
});
```
TODO
----
- Add ability to change iconset

License
-------
Plugin created by Christian Córdoba licensed under CC BY-SA. Data from www.openweathermap.org api.