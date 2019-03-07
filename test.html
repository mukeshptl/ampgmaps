<!DOCTYPE html>
<html>
  <head>
    <title>Geolocation</title>
    <meta name="viewport" content="initial-scale=1.0, user-scalable=no">
    <meta charset="utf-8">
    <style>
      /* Always set the map height explicitly to define the size of the div
       * element that contains the map. */
      #map {
        height: 100%;
      }
      /* Optional: Makes the sample page fill the window. */
      html, body {
        height: 100%;
        margin: 0;
        padding: 0;
      }
    </style>
  </head>
  <body>
    <div id="map"></div>
    <script>
        // Try HTML5 geolocation.
        if (navigator.geolocation) {
            console.log("geolocation present");
            
          navigator.geolocation.getCurrentPosition(function(location) {
            console.log("location:" + location.coords.latitude);
            return;
            var pos = {
              lat: location.coords.latitude,
              lng: location.coords.longitude
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent('You are here!');
            infoWindow.open(map);
            map.setCenter(pos);
            map.setZoom(16);

            //Do we have something to geocode?
            var queryParams = window.location.search.substr(1).split('&').reduce(function (q, query) {
              var chunks = query.split('=');
              var key = chunks[0];
              var value = chunks[1];
              return (q[key] = value, q);
            }, {});


            if(queryParams.q) {
              geocoder.geocode( { 'address': queryParams.q}, function(results, status) {
                if (status == 'OK') {
                  destination = results[0].geometry.location; 
                                   
                  calculateAndDisplayRoute(directionsService, directionsDisplay, position, destination);
                } else {
                  console.log('Geocode was not successful for the following reason: ' + status);
                }
              });          
            }


          }, function(err) {
            // handleLocationError(true, infoWindow, map.getCenter());
            console.warn(`ERROR(${err.code}): ${err.message}`);
          });
        }
    </script>
    <script async defer
            src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAmZl1v0HeChOciXnl3Il7RTf-lYjgTtSs">
    </script>
  </body>
</html>