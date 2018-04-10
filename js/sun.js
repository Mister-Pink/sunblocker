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
    console.log(address);
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
        var results = response;
        var uv = response.currently.uvIndex;
        
        $("#uv").text(uv);
        $("#location").text(coords.addressStr);
        $("#location-2").text(coords.addressStr);

    })
}