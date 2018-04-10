var coords = {
    lat: [],
    lng: [],
}


function initMap() {
    var geocoder = new google.maps.Geocoder(); // Greates a Geocoder object to convert user input to lat and lng
    $('#location-form').on('submit', function (event) {
        geocodeAddress(geocoder); // Uses geocoder, map objects to do coordinate conversion
        event.preventDefault();
    })
};

// retreiving user input and set up of Geocoder
function geocodeAddress(geocoder) {
    //adress can be zip code or any for of place name
    var address = $("#search").val();
    geocoder.geocode({
        'address': address
    }, function (results, status) {
        if (status === 'OK') {
            // get lat and Lng and assign them to coords object
            coords.lat = results[0].geometry.location.lat();
            coords.lng = results[0].geometry.location.lng();
            getUVIndex();
        } else {
            console.log('Geocode was not successful for the following reason: ' + status);
        }
    });
};

function getUVIndex() {
    var lat = coords.lat;
    var lng = coords.lng;

    var queryURL = "https://api.darksky.net/forecast/2d26fe15c66c821f0486e0a2e0269d50/" + lat + "," + lng;

    $.ajax({
        url: queryURL,
        method: "GET",
        dataType: "jsonp",
        xhrFields: {
            withCredentials: false
        }
    }).then(function (response) {
        var results = response;
        var uv = response.currently.uvIndex;

        $("#uv").text(uv);

    })
}


var clock;

$(document).ready(function () {
    clock = $(".clock").FlipClock({
        clockFace: "TwentyFourHourClock",
        showSeconds: false
    });
    var weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";
    var date = new Date();
    var day1 = weekday[date.getDay()];
    var day2 = weekday[date.getDay() + 1];
    var day3 = weekday[date.getDay() + 2];
    $("#day1").text(day1);
    $("#day2").text(day2);
    $("#day3").text(day3);
});