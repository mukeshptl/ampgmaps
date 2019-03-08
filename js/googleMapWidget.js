define([
	"underscore"
], function(

) {
	return function (infoTplFunc) {
		
		function drawMap(params) {
			var canvasObj = params.canvas,
				address = params.address,
				addressArr = params.addressArr,
				name = params.name,
				namesArr = params.namesArr,
				zoom = params.zoom,
				coords = params.coords,
				onMarkerDrag = params.onMarkerDrag;

			var marker = map = null, i, pos;
			var mapOptions = {
				center: new google.maps.LatLng(coords[0][0], coords[0][1]),
				zoom: zoom,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			};
			var bounds = new google.maps.LatLngBounds();
			var map = new google.maps.Map(canvasObj, mapOptions);
			
			if(address && !addressArr)
				addressArr = [ address ];
			if(name && !namesArr)
				namesArr = [ name ];

			for(i=0; i<coords.length; i++) {
				pos = new google.maps.LatLng(coords[i][0], coords[i][1]);
				bounds.extend(pos);
				marker = new google.maps.Marker({
					position : pos,
					//title : "Drag to change position",
					draggable : false
				});
				marker.setMap(map);			
				//popup on click of marker
				if(addressArr && addressArr.length) {
					(function(m, ad, n) {
						var infoContent = infoTplFunc ? 
								infoTplFunc({
									name : n,
									description : address
								}) : "<div class='map-popup'>" + 
										(n ? "<h4 class='brand-color-text'>" + n + "</h4>" : "") +
										"<p>" + ad + "</p>"
									"</div>";
						var infowindow = new google.maps.InfoWindow({
							content: infoContent
						});
						google.maps.event.addListener(m, 'click', function() {
							infowindow.open(map, m);
						});
					})(marker, addressArr[i], namesArr[i]);
				}
			}
			if(coords.length>1)
				map.fitBounds(bounds);
		}
		
		return {
			showMap : function(params) {
				var resp, lat, lng, address, geocoder, i, zoom, canvasObj,
					coords = params.coords || [];
				if(!params || !params.container)	return;
				
				function onComplete(result, status) {
					if(!result || !result.length)
						return;
					resp = result[0];
					lat = parseFloat(resp.geometry.location.lat());
					lng = parseFloat(resp.geometry.location.lng());
					address = resp.formatted_address;
					
					drawMap({
						canvas : canvasObj,
						address : address,
						zoom : zoom,
						coords : [lat, lng],
						onMarkerDraw : params.onMarkerDrag
					});	
					
					if(params.success && typeof(params.success==="function")) {
						params.success({
							"latitude" : lat,
							"longitude": lng,
							"accuracy" : resp.geometry.location_type,
							"address"  : address
						});
					}
				}
				geocoder = new google.maps.Geocoder();
				zoom = params.zoom || 15;
				canvasObj = params.container;
				if(params.address) {
					address = params.address;
					lat = params.latitude;
					lng = params.longitude;
					
					geocoder.geocode({"address" : address}, onComplete);
				} else if(params.latitude && params.longitude) {
					// single location
					coords.push([params.latitude, params.longitude]);
				}
				if(coords.length) {
					//reverse geocode
					drawMap({
						canvas : canvasObj,
						addressArr : params.addressArr,
						namesArr : params.namesArr,
						zoom : zoom,
						coords : coords,
						onMarkerDraw : params.onMarkerDrag
					});	
				}
			},
			
			geocode : function(params) {
				var geocoder = new google.maps.Geocoder(),
					onComplete = params.onComplete && typeof(params.onComplete)==="function" ? params.onComplete : function() {};
				
				if(params.latitude && params.longitude) {
					//reverse geocode
					var latlng = new google.maps.LatLng(params.latitude, params.longitude);
					geocoder.geocode({'latLng': latlng}, onComplete);
				} else if(params.address) {
					geocoder.geocode({"address" : params.address}, onComplete);
				}
			},
			
			getPosition : function() {
				if(!marker)	return null;
				return {
					"lat" : marker.getPosition().lat(),
					"lng" : marker.getPosition().lng()
				}
			}
		}
	}
});

