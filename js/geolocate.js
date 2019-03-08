define([
	"underscore",
	"promise"
], function(
	_
) {
	var options = {
		enableHighAccuracy: true,
		timeout: 5000,
		maximumAge: 0
	};
	var attempt = 1;
	var MAX_ATTEMPTS = 2;
	var TTL = 60; // cache position for 60 seconds

	function savePosition(position) {
		if(!window.sessionStorage || !window.sessionStorage.setItem) {
			return false;
		}
		if(!position || !position.coords && position.coords.latitude && position.coords.longitude) {
			return false;
		}
		try {
			window.sessionStorage.setItem("_nwGeoPos", JSON.stringify(_.extend({}, position)));
		} catch(ex) {
			return false;
		}
		return true;
	}
	function loadPosition() {
		var pos;
		if(!window.sessionStorage || !window.sessionStorage.getItem) {
			return null;
		}
		try {
			pos = JSON.parse(window.sessionStorage.getItem("_nwGeoPos"));
			if(pos && pos.timestamp && Date.now() - pos.timestamp > TTL*1000) {
				window.sessionStorage.removeItem("_nwGeoPos");
				return null;
			}
		} catch(ex) {
			return null
		}
		if(pos && pos.coords && pos.coords.latitude && pos.coords.longitude)
			return pos;
		else
			return null;
	}
	
	function geoLocate(params) {
		var p, oldPos;
		_.extend(options, params);
		p = new Promise(function(fulfill, reject) {
			var onSuccess = function(resp) {
				if(resp && resp.coords && resp.coords.latitude && resp.coords.longitude) {
					savePosition(resp);
					fulfill(resp);
				} else {
					reject("Unrecognized or incomplete geocode format.");
				}
			};
			var onFailure = function(err) {
				console.log("Geolocation attempt #" + attempt + " failed: ", err);
				++attempt;
				if(attempt>1)
					options.enableHighAccuracy = false;
				if(attempt<=MAX_ATTEMPTS) {
					var p2 = geoLocate();
					p2.then(fulfill, reject);
				} else {
					reject(err);
				}
			};
			if(!navigator.geolocation || typeof(navigator.geolocation.getCurrentPosition)!=="function") {
				reject("Browser doesn't support Geolocation API");
				return;
			}
			oldPos = loadPosition();
			if(oldPos)
				fulfill(oldPos);
			else {
				navigator.geolocation.getCurrentPosition(onSuccess, onFailure, options);
				// This setTimeout is used to resolve an infinite wait condition 
				// which arises in some browsers when user chooses to ignore the
				// geolocation request prompt
				//
				// https://bugzilla.mozilla.org/show_bug.cgi?id=675533
				setTimeout(function() {
					if(!loadPosition())
						reject("Unable to find user position.");
				}, options.timeout);
			}
		});
		return p;
	};

	return geoLocate;
});