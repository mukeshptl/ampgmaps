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
      var NWAppData = {
        listingId : "5892832569065472",
        brandId : "5282118718455808",
        brandName : "Michelin",
        storeType : "",
        latitude : "21.299494",
        longitude : "70.237366",
        city : "Keshod",
        primaryColor : "#0E56A8",
        section : "MAP",
        hoop : "[{&quot;day&quot;=&quot;Monday&quot;, &quot;time&quot;=&quot;[8:00am-8:15pm]&quot;}, {&quot;day&quot;=&quot;Tuesday&quot;, &quot;time&quot;=&quot;[8:00am-8:15pm]&quot;}, {&quot;day&quot;=&quot;Wednesday&quot;, &quot;time&quot;=&quot;[8:00am-8:15pm]&quot;}, {&quot;day&quot;=&quot;Thursday&quot;, &quot;time&quot;=&quot;[8:00am-8:15pm]&quot;}, {&quot;day&quot;=&quot;Friday&quot;, &quot;time&quot;=&quot;[8:00am-8:15pm]&quot;}, {&quot;day&quot;=&quot;Saturday&quot;, &quot;time&quot;=&quot;[8:00am-8:15pm]&quot;}, {&quot;day&quot;=&quot;Sunday&quot;, &quot;time&quot;=&quot;[]&quot;}]",
        baseUrl : "http://localhost:8888"
    }
    </script>
    <script src="js/require.js"></script>
    <script src="js/require-config.js"></script>
    <script src="//maps.googleapis.com/maps/api/js?key=AIzaSyAmZl1v0HeChOciXnl3Il7RTf-lYjgTtSs&sensor=false&libraries=places"></script>
    <!-- <script async defer
            src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAmZl1v0HeChOciXnl3Il7RTf-lYjgTtSs">
    </script> -->
    <script src="js/script.js"></script>
  </body>
</html>