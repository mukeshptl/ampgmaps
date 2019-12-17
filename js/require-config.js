require.config({
 baseUrl : "/js", ///clientWeb/amp/map-iframe
 paths : {
  "underscore" : "underscore",
  "jquery" : "jquery",
  'promise' : 'promise',
 },
 shim : {
  "underscore" : {
   exports : "_"
  },
  "jquery" : {
   exports : "$"
  },
  "bootstrap" : ["jquery"],
  "jquery.validate" : ["jquery"],
  promise : {
   exports : 'Promise'
  }
 }
});