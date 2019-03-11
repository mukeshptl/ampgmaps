<!DOCTYPE html>
<html>
  <head>
    <title>Geolocation</title>
    <meta name="viewport" content="initial-scale=1.0, user-scalable=no">
    <meta charset="utf-8">
    <style>
      .brand-color-bg {
       background-color: #DA2A1B !important;
      }
      .brand-color-text {
       color: #DA2A1B !important;
      }
      .campaignViewDetail {
       color: #DA2A1B !important;
      }
      .brand-color-border,
      .theme-border.brand-color-border {
       border-color: #DA2A1B !important;
      }
      a.brand-color {
       color: #DA2A1B !important;
      }
      a.brand-color-hover:hover {
       color: #DA2A1B !important;
      }
      
      .theme-hover-brand-color:hover {
       color: #DA2A1B !important;
      }
      
      .theme-hover-bg-brand-color:hover {
       background-color: #DA2A1B !important;
      }
      .theme-hover-bg,	
      .card-hover-bg:hover,
      .item-wrapper:hover,
      .header-link-bottom-lst:hover,
      .item-hover-bg:hover,
      .article-row:hover {
       background-color: #ffffd4;
      }
      
      
      
      
      .theme-border, hr {
       border-color: #c7c7c8 !important;
      }
      .theme-content-bg {
       background-color: #ffffff !important;
      }
      .theme-page-bg {
       background-color: #f2f2f2 !important;
      }
      .theme-heading-text {
       color : #000000 !important;
      }
      .theme-brand-bg-text {
       color : #ffffff !important;
      }
      .theme-body-text {
       color : #444444 !important;
      }
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
        font-size: 16px;
        background: #fff;
      }
      .poweredByGoogle {
          position: relative;
          font-size: 1em;
          display: block;
          background: #fff;
      }
      #getdir-form {
          margin-top: 15px;
      }
      a {
        text-decoration: none;
        color: #606060;
      }
      #getdir-form {
          margin-top: 15px;
      }
      .form-group {
          position: relative;
          margin-bottom: 15px;
      }
      label {
          display: inline-block;
          margin-bottom: 5px;
          font-weight: 700;
      }
      #startingPoint{
          padding-right: 35px;
      }
      #startingPoint, #endPoint {
        text-transform: uppercase;
        font-family: "Novecento Wide",Helvetica,Arial,sans-serif;
      }
      
      .form-control[disabled], .form-control[readonly], fieldset[disabled] .form-control {
          cursor: not-allowed;
          background-color: #eee;
          opacity: 1;
      }
      input[type="text"], input[type="password"], textarea, .form-control, select {
          border-radius: 0;
      }
      .form-control {
          display: block;
          width: 100%;
          height: 34px;
          padding: 6px 12px;
          font-size: 14px;
          line-height: 1.428571429;
          color: #555;
          background-color: #fff;
          background-image: none;
          border: 1px solid #ccc;
          border-radius: 4px;
          -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
          box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
          -webkit-transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
          transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
      }
      .edit-address {
          display: none;
          border: none;
          outline: none;
          position: absolute;
          right: 1px;
          bottom: 1px;
          height: 32px;
          width: 30px;
      }
      .btn-default {
          color: #333;
          background-color: #fff;
          border-color: #ccc;
      }
      .btn {
          display: inline-block;
          margin-bottom: 0;
          font-weight: 400;
          text-align: center;
          vertical-align: middle;
          cursor: pointer;
          background-image: none;
          border: 1px solid transparent;
          white-space: nowrap;
          padding: 6px 12px;
          font-size: 14px;
          line-height: 1.428571429;
          border-radius: 4px;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          -o-user-select: none;
          user-select: none;
      }
      #getdir-timedist {
          border-top: solid 1px #ccc;
          margin-top: 20px;
          padding: 10px;
          display: none;
      }
      #getdir-result {
          padding-top: 10px;
          margin-top: 10px;
          margin-bottom: 10px;
      }
      ol.directions {
          padding-left: 25px;
          margin-top: 0;
          margin-bottom: 10px;
      }
      ol.directions > li {
          margin-bottom: 20px;
      }
      b, strong {
          font-weight: 700;
      }
      ol.directions > li > div {
          color: #808080;
          padding: 4px 0;
      }
      #getdir-timedist {
          border-top: solid 1px #ccc;
          margin-top: 20px;
          padding: 10px;
          display: none;
      }
          </style>
          <link rel="stylesheet" type="text/css"  href="https://fonts.googleapis.com/css?family=Open+Sans:400,600,400italic,700,800">
          <link rel="stylesheet" type="text/css"  href="https://fonts.googleapis.com/css?family=Nunito:400,700">
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css">
          <link rel="stylesheet" type="text/css"  href="https://www.niftywindow.com/clientWeb/css/compiled/window.css">
        </head>
        <body>
          <div id="map" style="height: 350px; width: auto"></div>
          <div class="poweredByGoogle">
      			<span>Powered by</span>
      			<a href='http://www.google.com' target='_blank'> Google</a>
      			<div id="#getdir-form">
      			  <div class="form-group">
      			    <label for="startingPoint">Get directions</label>
      			    <input id="startingPoint" class="form-control ph-font" type="text" placeholder="From">
      			    <button class="edit-address theme-content-bg theme-body-text" type="button">
        			   <i class="fa fa-pencil" title="Clear and edit"></i>
        			  </button>
      			  </div>
      			  <div class="form-group">
      			    <input id="endPoint" class="form-control" readonly='readonly' type="text" placeholder="To">
              </div>
              <button id="btnGetDir" class="btn btn-default">Get Directions</button> 
              <span>&nbsp;</span>
              <a id="btnGMaps" class="btn btn-default" data-href="http://maps.google.com/maps" target="_blank">View on Google Maps</a>
      			</div>
      			<div id="getdir-timedist" class="brand-color-bg theme-brand-bg-text"></div>
      			<div id="getdir-result">
              <p class="alert bg-warning" style="display:none"></p>
            </div>
          </div>
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