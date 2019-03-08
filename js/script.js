require([
	"geoLocate",
	"googleMapWidget",
	"jquery"
], function(
	geoLocate,
	MapWidget
) {
	var $address;
	var mapWidget = new MapWidget();
	var startingPoint;

	function onGeoLocateSuccess(params) {
		var $btnGMaps = $("#btnGMaps");
		mapWidget.geocode({
			latitude : params.coords.latitude,
			longitude : params.coords.longitude,
			onComplete : function(resp) {
				if(resp.length)	resp = resp[0];
				prefillAddress(
					resp.formatted_address,
					params.coords.latitude,
					params.coords.longitude
				);
				$("#btnGetDir").trigger("click");
			}
		});
		startingPoint = new google.maps.LatLng(params.coords.latitude, params.coords.longitude);
		url = $btnGMaps.data("href") +
				"?saddr=" + params.coords.latitude + "," + params.coords.longitude +
				"&daddr=" + NWAppData.latitude + "," + NWAppData.longitude;
		// console.log(url);
		$btnGMaps.attr("href", url);
		console.log(document.body.scrollHeight);
		window.parent.postMessage({
            sentinel: 'amp',
            type: 'embed-size',
            height: document.body.scrollHeight,
            width: 'auto'
        }, '*');
	}
	function onGeoLocateFailure(err) {
		
	}
	function prefillAddress(address, lat, lon) {
		$address.val(address);
		$address.attr("readonly", "readonly").attr("title", "My Location");
		$address.parent().find(".edit-address").show();
		console.log(document.body.scrollHeight);
		window.parent.postMessage({
            sentinel: 'amp',
            type: 'embed-size',
            height: document.body.scrollHeight,
            width: 'auto'
        }, '*');
	}
	function clearAddress(ev) {
		$address.val("");
		$address.removeAttr("readonly").focus();
		console.log(document.body.scrollHeight);
		window.parent.postMessage({
            sentinel: 'amp',
            type: 'embed-size',
            height: document.body.scrollHeight,
            width: 'auto'
        }, '*');
	}
	var autocomplete;
	$(function() {

		//google.maps.event.addDomListener(window, 'load', function() {
		var $input = $address = $("#startingPoint");
		autocomplete = new google.maps.places.Autocomplete($input[0]);
		//});
		
		var directionsService = new google.maps.DirectionsService(),
			directionsDisplay = new google.maps.DirectionsRenderer(),
			map;
		
		function recordUserDirSearch(obj) {
			if(typeof(obj)!=="object")
				return;
			obj.listingId = NWAppData.listingId;
			obj.brandId = NWAppData.brandId;
	
			$.ajax({
				method : "post",
				url : "https://localhost:8888/site/store/directions",
				data : JSON.stringify(obj),
				contentType : "application/json"
			})
			.done(function(resp) {
				//console.log("Saved user search query");
			})
			.error(function(err) {
				console.log(err + ": Failed to save user search query");
			});
		}
		$("#btnGetDir").on("click", function() {
			
			var start = startingPoint || $("#startingPoint").val(),
				end = $("#endPoint").val(),
				request = {
					origin : start,
					destination : new google.maps.LatLng(NWAppData.latitude, NWAppData.longitude),
					travelMode : google.maps.TravelMode.DRIVING
				};
	
			directionsService.route(request, function(result, status) {
				var $status = $("#getdir-result").find(".alert.bg-warning");
				if(status !== google.maps.DirectionsStatus.OK) {
					$status
						.addClass("alert-error")
						.addClass("bg-warning")
						.text("Unable to find directions from the specified location.")
						.show();
					return;
				} else {
					$status.hide();
				}
				// console.log(result);
				
				//show on map
				map = new google.maps.Map($("#map")[0], { zoom : 7 } );
				directionsDisplay.setMap(map);
				directionsDisplay.setDirections(result);
				//display steps
				var steps,
					distance,
					duration,
					startAddress,
					endAddress,
					$stepsList = $("<ol>").addClass("directions");
				try {
					startAddress = result.routes[0].legs[0].start_address
					endAddress = result.routes[0].legs[0].end_address;
					distance = result.routes[0].legs[0].distance.text;
					duration = result.routes[0].legs[0].duration.text;
					steps = result.routes[0].legs[0].steps;

					recordUserDirSearch({
						"locStr" : startAddress,
						"locLat" : result.routes[0].legs[0].start_location.lat(),
						"locLong" : result.routes[0].legs[0].start_location.lng()
					});
					if(startAddress && endAddress && duration && distance) {
						$("#getdir-timedist").empty().append(
							$("<strong>").text("Distance: ")
						).append(
							$("<span>").text(distance)
						).append(
							$("<strong>").text(" Duration: ")
						).append(
							$("<span>").text(duration)
						).show();
					}
					if(steps && steps.length) {
						steps.forEach(function(s) {
							$stepsList.append($("<li>").html(s.instructions));
						});
						$("#getdir-result").empty().append($stepsList);
					} else {
						$("#getdir-result").hide();
					}
				} catch(ex) {
					console.log("Unable to read steps");
				}
				console.log(document.body.scrollHeight);
				window.parent.postMessage({
                    sentinel: 'amp',
                    type: 'embed-size',
                    height: document.body.scrollHeight,
                    width: 'auto'
                }, '*');
			});
		});
		
		//change font for placeholder
		$("#getdir-form").find(".ph-font").addClass("empty");
		$("#getdir-form").on("keydown keyup change", ".ph-font", function(ev) {
			var $t = $(ev.target),
				key= String.fromCharCode(ev.keyCode);
			if(key && /\w+/.test(key))
				$t.removeClass("empty");
			else if($t.val()=="")
				$t.addClass("empty");
		});
		//generate initial map
		if(NWAppData.latitude && NWAppData.longitude) {
			try {
				latitude = parseInt(NWAppData.latitude);
				longitude = parseInt(NWAppData.longitude);
				if(NWAppData.latitude && NWAppData.longitude) {
					mapWidget.showMap({
						"container" : $("#map")[0],
						"latitude" : NWAppData.latitude,
						"longitude" : NWAppData.longitude,
						"zoom" : 15
					});
				}
				console.log(document.body.scrollHeight);
				window.parent.postMessage({
                    sentinel: 'amp',
                    type: 'embed-size',
                    height: document.body.scrollHeight,
                    width: 'auto'
                }, '*');
			} catch(ex) {
				console.log(ex);
			}
			
		}
		// ------------------------------------
		// Auto populate from-address
		// ------------------------------------
		geoLocate().then(onGeoLocateSuccess, onGeoLocateFailure);
		$(".edit-address").on("click", clearAddress);
		console.log(document.body.scrollHeight);
        window.parent.postMessage({
            sentinel: 'amp',
            type: 'embed-size',
            height: document.body.scrollHeight,
            width: 'auto'
        }, '*');
		// ------------------------------------
		// Geocode fromAddress and Open Google Maps
		// ------------------------------------
		google.maps.event.addListener(autocomplete, "place_changed", function() {
			var $btnGMaps = $("#btnGMaps");
			var place = autocomplete.getPlace();
			if(place && place.geometry && place.geometry.location.lat() && place.geometry.location.lng()) {
				startingPoint = place.geometry.location;
				url = $btnGMaps.data("href") +
					"?saddr=" + place.geometry.location.lat() + "," + place.geometry.location.lng() +
					"&daddr=" + NWAppData.latitude + "," + NWAppData.longitude;
				// console.log(url);
				$btnGMaps.attr("href", url);
			} else {
				$btnGMaps.removeAttr("href");
			}
			console.log(document.body.scrollHeight);
			window.parent.postMessage({
                sentinel: 'amp',
                type: 'embed-size',
                height: document.body.scrollHeight,
                width: 'auto'
            }, '*');
		});
	});
	geoLocate(); // call and cache the user location
	console.log(document.body.scrollHeight);
	window.parent.postMessage({
        sentinel: 'amp',
        type: 'embed-size',
        height: document.body.scrollHeight,
        width: 'auto'
    }, '*');
});