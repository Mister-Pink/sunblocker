var coords = {
  lat: [],
  lng: []
};
function initMap() {
  var init_zoom = 13; // higher zoom pans map closer too POI
  var chill = { lat: 35.913, lng: -79.056 }; // Default Lcoation Chapel Hill, NC
  var map = new google.maps.Map($("#map1")[0], {
    // Creates a map object
    zoom: init_zoom,
    center: chill
  });
  var marker = new google.maps.Marker({
    // Creates a marker on map object "map"
    position: chill,
    map: map
  });
  var geocoder = new google.maps.Geocoder(); // Greates a Geocoder object to convert user input to lat and lng
  $("#submitBTN").on("click", function() {
    geocodeAddress(geocoder, map); // Uses geocoder, map objects to do coordinate conversion
  });
}
function geocodeAddress(geocoder, resultsMap) {
  // retreiving user input and set up of Geocoder
  var address = $("#locName").val();
  geocoder.geocode({ address: address }, function(results, status) {
    //adress can be zip code or any for of place name
    if (status === "OK") {
      resultsMap.setCenter(results[0].geometry.location);
      coords.lat = results[0].geometry.location.lat(); // get lat and Lng and assign them to coords object
      coords.lng = results[0].geometry.location.lng();
      var marker = new google.maps.Marker({
        map: resultsMap,
        position: results[0].geometry.location
      });
    } else {
      console.log(
        "Geocode was not successful for the following reason: " + status
      );
    }
  });
}

$("#sideGo").click(function(event) {
  event.preventDefault();
  var loc = $("#new_location").val();
  console.log(loc);
});

$("#navGo").click(function(event) {
  event.preventDefault();
  var loc = $("#search").val();
  console.log(loc);
});

$("#search").keyup(function(event) {
  event.preventDefault();
  if (event.keyCode === 13) {
    document.getElementById("navGo").click();
    console.log("nav");
  }
});

$("#new_location").keyup(function(event) {
  event.preventDefault();
  if (event.keyCode === 13) {
    document.getElementById("sideGo").click();
    console.log("side");
  }
});

var clock;

$(document).ready(function() {
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
  var day2 = weekday[date.getDay()+1];
  var day3 = weekday[date.getDay()+2];
  $("#day1").text(day1);
  $("#day2").text(day2);
  $("#day3").text(day3);
});
