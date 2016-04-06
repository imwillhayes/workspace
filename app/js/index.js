var map = new BMap.Map("allmap");
var point = new BMap.Point(116.331398, 39.897445);

var local = new BMap.LocalSearch(map, {
	renderOptions: {
		map: map,
		panel: "r-result"
	}
});

addCon()

var geolocation = new BMap.Geolocation();
geolocation.getCurrentPosition(function(r) {
	if (this.getStatus() == BMAP_STATUS_SUCCESS) {
		var mk = new BMap.Marker(r.point);
		map.addOverlay(mk);
		map.panTo(r.point);
		src(r)
	} else {
		alert('failed' + this.getStatus());
	}
}, {
	enableHighAccuracy: true
})

map.centerAndZoom(point, 12);


function src(r) {
	var mPoint = new BMap.Point(r.point.lng, r.point.lat);
	local.searchNearby('建行', mPoint, 1000);

}

function addCon() {
	
	var top_left_navigation = new BMap.NavigationControl();
	var top_right_navigation = new BMap.NavigationControl({
		anchor: BMAP_ANCHOR_TOP_RIGHT,
		type: BMAP_NAVIGATION_CONTROL_SMALL
	});

	map.addControl(top_left_navigation);
}