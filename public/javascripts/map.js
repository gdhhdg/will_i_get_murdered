/**
 * Created by gunnerhatmaker on 7/17/18.
 */
$(document).ready(function() {
    var map;
    function initMap() {
        var myLatLng = {lat: -25.363, lng: 131.044};

        // Create a map object and specify the DOM element
        // for display.
        var map = new google.maps.Map(document.getElementById('map'), {
            center: myLatLng,
            zoom: 4
        });

};
initMap();
});