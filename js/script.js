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
	var getParams = function (url) {
		var params = {};
		var parser = document.createElement('a');
		parser.href = url;
		var query = parser.search.substring(1);
		var vars = query.split('&');
		for (var i = 0; i < vars.length; i++) {
			var pair = vars[i].split('=');
			params[pair[0]] = decodeURIComponent(pair[1]);
		}
		return params;
	};
	var NWAppData = getParams(window.location.href.replace(/#/g, '%23'));
	

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
	}
	function onGeoLocateFailure(err) {
		
	}
	function prefillAddress(address, lat, lon) {
		$address.val(address);
		$address.attr("readonly", "readonly").attr("title", "My Location");
		$address.parent().find(".edit-address").show();
	}
	function clearAddress(ev) {
		$address.val("");
		$address.removeAttr("readonly").focus();
		// console.log(document.documentElement.scrollHeight);
		// window.parent.postMessage({
        //     sentinel: 'amp',
        //     type: 'embed-size',
        //     height: document.documentElement.scrollHeight,
        //     width: 'auto'
        // }, '*');
	}
	var autocomplete;
	$(function() {
		console.log("iFrame URL: " + window.location.href);
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
			$("#getdir-result").empty();
			window.parent.postMessage({
				sentinel: 'amp',
				type: 'embed-size',
				// height: document.documentElement.scrollHeight,
				height: 620,
				width: 'auto'
			}, '*');
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
						console.log($("#getdir-result").height() + 620);
						// window.parent.document.$('#map-canvas').height($("#getdir-result").height() + 620);
						window.parent.postMessage({
							sentinel: 'amp',
							type: 'embed-size',
							// height: document.documentElement.scrollHeight,
							height: $("#getdir-result").height() + 620,
							width: 'auto'
						}, '*');
						if(NWAppData.pubIsSNM === "true") {
							$('.brand-color-bg').css('background-color', '#404062 !important');
							$('.brand-color-text, .campaignViewDetail, a.brand-color, a.brand-color-hover:hover, .theme-hover-brand-color:hover, .theme-hover-bg-brand-color:hover').css('color', '#404062 !important');
							$('.brand-color-border, .theme-border.brand-color-border').css('border-color', '#404062 !important');
							$('.theme-hover-bg, .card-hover-bg:hover, .item-wrapper:hover, .header-link-bottom-lst:hover, .item-hover-bg:hover, .article-row:hover').css('background-color', '#ffffd4');
							$('.theme-border, hr').css('border-color', '#c7c7c8 !important');
							$('.theme-content-bg, .theme-page-bg').css('background-color', '#ffffff !important');
							$('.theme-heading-text').css('color' , '#000000 !important');
							$('.theme-brand-bg-text').css('color', '#ffffff !important');
							$('.theme-body-text').css('color', '#444444 !important');
							$('.theme-hover-bg,	.card-hover-bg:hover, .item-wrapper:hover, .header-link-bottom-lst:hover, .item-hover-bg:hover, .article-row:hover').css('background-color', '#ffffd4 !important');
							$('html, body').css('font-family', '"Open Sans", Helvetica, Arial, sans-serif, sans');
							$('.menu-bar ul.nav-menu, .nap-inner h1').css('font-family', 'Nunito, "Times New Roman", serif');
						} else {
							$('.brand-color-bg').css('background-color', NWAppData.brandColor + ' !important');
							$('.brand-color-text, .theme-content-bg h1.brand-color-text, .page .brand-color-text, .campaignViewDetail, a.brand-color, a.brand-color-hover::hover, .theme-hover-brand-color::hover').css('color', NWAppData.brandColor);
							$('.brand-color-border, .theme-border.brand-color-border').css('border-color', NWAppData.brandColor + ' !important');
							$('.brand-color-bg, .theme-hover-bg-brand-color,hover').css('background-color', NWAppData.brandColor + ' !important');
							$('.brand-color-text, .campaignViewDetail, a.brand-color, a.brand-color-hover:hover, .theme-hover-brand-color:hover').css('color', NWAppData.brandColor + ' !important');
							$('.brand-color-border, .theme-border.brand-color-border').css('border-color', NWAppData.brandColor + ' !important');
							$('.theme-hover-bg,	.card-hover-bg:hover, .item-wrapper:hover, .header-link-bottom-lst:hover, .item-hover-bg:hover, .article-row:hover').css('background-color', '#ffffd4');
							$('.theme-border, hr').css('border-color', NWAppData.borderColor +' !important');
							$('.theme-content-bg ').css('background-color', NWAppData.contentBgColor + '!important');
							$('.theme-page-bg').css('background-color', NWAppData.pageBgColor + ' !important');
							$('.theme-heading-text').css('color', NWAppData.headingTextColor + ' !important');
							if(NWAppData.textOnBrandColor && NWAppData.textOnBrandColor.replace(/ /g, '').length >0)
								$('.theme-brand-bg-text').css('color', NWAppData.textOnBrandColor + ' !important');
							else
								$('.theme-brand-bg-text').css('color', '#fff !important');
							$('.theme-body-text').css('color', NWAppData.bodyTextColor + ' !important');
							if(NWAppData.hoverBgColor && NWAppData.hoverBgColor.replace(/ /g, '').length >0) {
								$('.theme-hover-bg,	.card-hover-bg:hover, .item-wrapper:hover, .header-link-bottom-lst:hover, .item-hover-bg:hover, .article-row:hover').css('background-color', NWAppData.hoverBgColor + '!important');
							}
							if(NWAppData.primaryFontName && NWAppData.primaryFontName.replace(/ /g, '').length >0) {
								$('html, body').css('font-family ', NWAppData.primaryFontName + ', "Open Sans", Arial, sans-serif, sans');
							}
							if(NWAppData.secondaryFontName && NWAppData.secondaryFontName.replace(/ /g, '').length >0) {
								$('.menu-bar ul.nav-menu, .nap-inner h1 ').css('font-family ', NWAppData.secondaryFontName + ', Nunito, "Times New Roman", serif');
							}
						}
					} else {
						$("#getdir-result").hide();
					}
				} catch(ex) {
					console.log("Unable to read steps");
				}
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
			} catch(ex) {
				console.log(ex);
			}
			
		}
		// ------------------------------------
		// Auto populate from-address
		// ------------------------------------
		geoLocate().then(onGeoLocateSuccess, onGeoLocateFailure);
		$(".edit-address").on("click", clearAddress);
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
		});
	});
	geoLocate(); // call and cache the user location
});