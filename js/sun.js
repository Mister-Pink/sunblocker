var coords = {
    lat: [],
    lng: [],
    addressStr: [],
}


function initMap() {
    var geocoder = new google.maps.Geocoder(); // Greates a Geocoder object to convert user input to lat and lng
    $('#location-form-2').on('submit', function (event) {                        
        //adress can be zip code or any for of place name
        var address = $("#search-2").val().trim();
        geocodeAddress(geocoder,address); // Uses geocoder, map objects to do coordinate conversion                       
        event.preventDefault();
    })
    $('#location-form').on('submit', function (event) {  
        var address = $("#search").val().trim();                      
        geocodeAddress(geocoder,address); // Uses geocoder, map objects to do coordinate conversion                       
        event.preventDefault();
    })
};

// retreiving user input and set up of Geocoder
function geocodeAddress(geocoder,address) {    
    geocoder.geocode({
        'address': address
    }, function (results, status) {
        if (status === 'OK') {
            // get lat and Lng and assign them to coords object
            coords.lat = results[0].geometry.location.lat();
            coords.lng = results[0].geometry.location.lng();
            coords.addressStr = results[0].formatted_address;            
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
        console.log(response)
        var results = response;
        var uv = response.currently.uvIndex;
        var uv_today = response.daily.data[0].uvIndex;
        var uv_todayTime = moment(response.daily.data[0].uvIndexTime,'X').format('h:mm a');
        var uv_tomorrow = response.daily.data[1].uvIndex;
        var uv_tomorrowTime = moment(response.daily.data[1].uvIndexTime,'X').format('h:mm a');
        var uv_dayAfter = response.daily.data[2].uvIndex;
        var uv_dayAfterTime = moment(response.daily.data[2].uvIndexTime,'X').format('h:mm a');

        $("#uvIndex").text(uv);
        $("#location").text(coords.addressStr);
        $("#location-2").text(coords.addressStr);
        //set forecast UV
        $("#day1uv").text(uv_today);
        $("#day2uv").text(uv_tomorrow);
        $("#day3uv").text(uv_dayAfter);
        $("#day1uvTime").text("at " + uv_todayTime);
        $("#day2uvTime").text("at " + uv_tomorrowTime);
        $("#day3uvTime").text("at " + uv_dayAfterTime);
    })
}

function setGoalTime() {
    var goalTime = moment().add(2, 'hours').format("h:mm:ss a");
    console.log("goal time: " + goalTime);
    localStorage.setItem("goalTime", JSON.stringify(goalTime)); 
}


function clearGoalTime() {
    var storageCheck = JSON.parse(localStorage.getItem("goalTime"));
    if (!Array.isArray(storageCheck)) {
        storageCheck = null;
    }
}

function setSunTimer() {
    $(".btn").on("click", function(event) {
        event.preventDefault();
        clearGoalTime();
        var setInitialTime = moment();
        console.log("initial time: " + setInitialTime);
        setGoalTime();
        runTimer();
    })
}
setSunTimer();

var intervalId;

function runTimer() {
    clearInterval(intervalId);
    intervalId = setInterval(checkTime, 5000);
    //5 * 60 * 1000  
}

function endTimer() {
    clearInterval(intervalId);
}

function checkTime() {
    var currentTime = moment().format("h:mm:ss a");
    console.log("Grabbing current: " + currentTime);
    var checkGoalTime = JSON.parse(localStorage.getItem("goalTime"));
    console.log("Check goal time: " + checkGoalTime);


    if (currentTime >= checkGoalTime) {
        endTimer();
    }

}


var clock;

$(document).ready(function () {
    clock = $(".clock").FlipClock({
        clockFace: "TwelveHourClock"
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

