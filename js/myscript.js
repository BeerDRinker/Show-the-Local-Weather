/* Coded by Paliy Rostyslav. e-mail: paliy1984@gmail.com. skype: ros.coprandos */


window.onload = function () {



    var googleGeoApi = 'https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyDRi9xZ7uZqeyvcJCOPKdDVwdhl3st365g';
    var url = "https://api.darksky.net/forecast";
    var watherApiID = "/dd8a39fda931c81a68639fe827003345";
    var units = "?units=si";

    /*Getting geolocation*/

    $.post(googleGeoApi, function (data) {

        url = url + watherApiID + "/" + data.location.lat + "," + data.location.lng + units;

        /*Getting wether*/

        $.ajax({
            url,
            dataType: "jsonp",
            success: function (data) {

                var temp = Math.round(data.currently.temperature);
                var country = data.timezone;
                var description = data.currently.summary;
                var icon = data.currently.icon;
                var windSpeed = data.currently.windSpeed;
                var windDegree = data.currently.windBearing;


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




                if (icon == "clear-day" || icon == "clear-night") {

                    $('body').css('background-image', 'url(./img/clear.jpg)')

                    $('#icon img').attr('src', './img/clear-day.png');

                } else if (icon == "cloudy" || icon == "partly-cloudy-day") {

                    $('body').css('background-image', 'url(./img/cloudy.jpg)')

                    $('#icon img').attr('src', './img/partly-cloudy-day.png');

                } else if (icon == "rain" || icon == "sleet") {

                    $('body').css('background-image', 'url(./img/rain.jpg)')

                    $('#icon img').attr('src', './img/rain.png');

                } else if (icon == "thunderstorm") {

                    $('body').css('background-image', 'url(./img/thunderstorm.jpg)')

                    $('#icon img').attr('src', './img/thunderstorm.png');

                } else if (icon == "snow") {

                    $('body').css('background-image', 'url(./img/winter.jpg)')

                    $('#icon img').attr('src', './img/snow.png');

                } else if ((icon == "fog")) {

                    $('body').css('background-image', 'url(./img/mist.jpg)')

                    $('#icon img').attr('src', './img/fog.png');
                }



                if (temp > 30) {

                    $('body').css('background-image', 'url(../img/hot.jpg)')
                }


                if (temp < 0) {

                    $('body').css('background-image', 'url(../img/winter.jpg)')
                }


                $('#location').html(country);


                $('#temp').html(temp + " &ordm;С");


                $('#wind').html(windSpeed + "km/h" + " " + windNames);



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

            }
        });
    });
}
