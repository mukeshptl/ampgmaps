<!doctype html>
<html ⚡>
  <head>
    <meta charset="utf-8">
    <script async src="https://cdn.ampproject.org/v0.js"></script>
    <link rel="canonical" href="https://theampbook.com/ch9/iframe-directions.html" />
    <title>The AMP Book News Daily</title>
    <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1,maximum-scale=1,user-scalable=no">
    <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
      <script async custom-element="amp-iframe" src="https://cdn.ampproject.org/v0/amp-iframe-0.1.js"></script>
      <script async custom-element="amp-bind" src="https://cdn.ampproject.org/v0/amp-bind-0.1.js"></script>    
    <style amp-custom>
      html {overflow:hidden;}
      body {
        height:100%;
        overflow-y:scroll;
        width:100%;
        margin: 0 auto;
        text-align: center;
        font-family: Arial;
      }
      .fullsize {position:fixed;width:100%;height:calc(100% - 100px);top:100px;}
      .header {
        position:fixed;
        height: 100px;
        width: 100%;
        background-color: rgba(255,255,255,0.85);;
        z-index:9999;
        box-shadow: 0px 2px 6px rgba(0,0,0,.3);
      }
      h1 {
        font-size:1.2rem;
        color: #253b48;  
        margin: 10px 0 0 0;
      }

      button, input{
        width:140px;
        line-height: 30px;
        vertical-align: middle;
        color: white;
        font-weight: bold;
        font-size: 14px;
        background: none;
        border: 2px solid #333;
        color: #253b48;      
        margin:0.5rem 0.1rem 1.5rem;   
        padding:0;
      }

      input {
        padding: 0 5px;
        box-sizing: content-box;
        -webkit-appearance: none;
        border-radius:0;
      }

      input[type="submit"] {
        color:#fff;
        background-color: #253b48;
      }
    </style>
  </head>
 
  <body>

    <amp-state id="props">
      <script type="application/json">
      {
        "input":   "planet+earth"
      }
      </script>
    </amp-state>

    <div class="header">
      <h1>Where do you want to go?</h1>
      <input type="text" name="q" placeholder="e.g. Dublin" on="change:AMP.setState({props: {input: (event.value==''?'planet earth':event.value)}})">
      <input type="submit" value="SEARCH">
    </div>
     <amp-iframe class="fullsize" layout="fill"
                sandbox="allow-scripts allow-same-origin"
                allowfullscreen
                src="test.html"
                [src]="'test.html?q='+props.input"
                alllow="geolocation"
      >
      
      <amp-img layout="fill" src="img/placeholder.png" placeholder></amp-img>

    </amp-iframe>

  </body>
</html>