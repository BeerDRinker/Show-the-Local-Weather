/* Coded by Paliy Rostyslav. e-mail: paliy1984@gmail.com. skype: ros.coprandos */


window.onload = function () {

    /*Getting geolocation*/

    var googleGeoApi = 'https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyDRi9xZ7uZqeyvcJCOPKdDVwdhl3st365g';
    var url = "http://api.openweathermap.org/data/2.5/weather?";
    var watherApiID = "&APPID=0d0fa60e450b741988e81637500167e7";
    var units = "&units=metric";

    $.post(googleGeoApi, function (data) {

        url = url + "lat=" + data.location.lat + "&lon=" + data.location.lng + watherApiID + units;

        $.getJSON(url, function (json) {

            var temp = Math.round(json.main.temp);
            var country = json.sys.country;
            var city = json.name;
            var description = json.weather[0].description;
            var icon = "http://openweathermap.org/img/w/" + json.weather[0].icon + ".png";
            var windSpeed = json.wind.speed;
            var windDegree = json.wind.deg;


            /*Setting wind direction*/


            var windNames;

            if (windDegree >= 330 && windDegree <= 29) {

                windNames = "North";

            } else if (windDegree >= 30 && windDegree <= 59) {

                windNames = "Northeast";

            } else if (windDegree >= 60 && windDegree <= 119) {

                windNames = "East";

            } else if (windDegree >= 120 && windDegree <= 149) {

                windNames = "Southeast";

            } else if (windDegree >= 150 && windDegree <= 209) {

                windNames = "South";

            } else if (windDegree >= 210 && windDegree <= 239) {

                windNames = "Southwest";

            } else if (windDegree >= 240 && windDegree <= 299) {

                windNames = "West";

            } else windNames = "Northwest";


            /* Setting BG image */


            if (description == "clear sky" || description == "few clouds") {

                $('body').css('background-image', 'url(../img/clear.jpg)')

            } else if (description == "scattered clouds" || description == "broken clouds") {

                $('body').css('background-image', 'url(../img/cloudy.jpg)')

            } else if (description == "shower rain" || description == "rain") {

                $('body').css('background-image', 'url(../img/rain.jpg)')

            } else if (description == "thunderstorm") {

                $('body').css('background-image', 'url(../img/thunderstorm.jpg)')

            } else if (description == "snow") {

                $('body').css('background-image', 'url(../img/winter.jpg)')

            } else

                $('body').css('background-image', 'url(../img/mist.jpg)')


            /*Setting BG image if Realy Hot*/

            if (temp > 30) {

                $('body').css('background-image', 'url(../img/hot.jpg)')
            }

            /*Setting BG image if negative temp*/

            if (temp < 0) {

                $('body').css('background-image', 'url(../img/winter.jpg)')
            }


            /*Applaying data to the page*/


            $('#icon img').attr('src', icon);

            $('#location').html(country + " " + city);


            $('#temp').html(temp + " &ordm;С");


            $('#wind').html(windSpeed + "km/h" + " " + windNames);


            /*Metric - Imperial conversion*/

            var celsium = true;

            $('#button').click(function () {

                if (celsium) {

                    var farng = Math.round((temp * 1.8) + 32) + " &ordm;F";

                    $('#temp').html(farng);

                    $('#wind').html(Math.round((windSpeed * 1.6)) + "m/h" + " " + windNames);

                    celsium = false;

                } else {

                    $('#temp').html(temp + " &ordm;С");

                    $('#wind').html(windSpeed + "km/h" + " " + windNames);

                    celsium = true;

                }
            });
        });
    });
}
