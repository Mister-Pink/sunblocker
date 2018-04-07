var coords = {
    lat: [],
    lng: [],
}
function initMap() {
    var init_zoom = 13 // higher zoom pans map closer too POI
    var chill = { lat: 35.913, lng: -79.056 }; // Default Lcoation Chapel Hill, NC
    var map = new google.maps.Map($("#map1")[0], { // Creates a map object
        zoom: init_zoom, 
        center: chill
    });
    var marker = new google.maps.Marker({ // Creates a marker on map object "map"
        position: chill,
        map: map
    });
    var geocoder = new google.maps.Geocoder();  // Greates a Geocoder object to convert user input to lat and lng
    $('#submitBTN').on('click', function () { 
        geocodeAddress(geocoder, map); // Uses geocoder, map objects to do coordinate conversion
    })
};
function geocodeAddress(geocoder, resultsMap) { // retreiving user input and set up of Geocoder
    var address = $("#locName").val();
    geocoder.geocode({ 'address': address }, function (results, status) { //adress can be zip code or any for of place name
        if (status === 'OK') {
            resultsMap.setCenter(results[0].geometry.location);
            coords.lat = results[0].geometry.location.lat(); // get lat and Lng and assign them to coords object
            coords.lng = results[0].geometry.location.lng();
            var marker = new google.maps.Marker({
                map: resultsMap,
                position: results[0].geometry.location
            });
        } else {
            console.log('Geocode was not successful for the following reason: ' + status);
        }
    });
}        