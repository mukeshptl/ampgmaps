require.config({
 baseUrl : "/js",
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