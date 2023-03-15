/**
the Portal
Wawa Li
prototype 1
*/
"use strict";
$(document).ready(function(){

           //MAP SETTING ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀ 
       // We create a leaflet map, and in setView, we determine coordinates and zoom level
       let mainMap = L.map('mainMap').setView([45.50884, -73.58781], 19);
       let coordinateMarker = L.marker();
       
    //    $(".leaflet-control-zoom").css("visibility", "hidden");
       mainMap.touchZoom.disable();
       mainMap.doubleClickZoom.disable();
       mainMap.scrollWheelZoom.disable();

       //source : https://mathi330.github.io/cart351/Demo/demo.html
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 9, // you cannot zoom in more than 9, if set to 10, the map turns gray
        // doubleClickZoom: false, // this is just so when I double click on the map it doesn't zoom in
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright" target="blank_">OpenStreetMap</a>' // link to where we got the data for the map
    }).addTo(mainMap); // add tile layer to map

//custom tiles : https://leafletjs.com/examples/extending/extending-2-layers.html
L.TileLayer.Kitten = L.TileLayer.extend({
    getTileUrl: function(coords) {
        // let i = Math.ceil( Math.random() * 3 );
        return "assets/bg_noir.jpg";
    },
    getAttribution: function() {
        return "<a href='https://placekitten.com/attribution.html'>Void</a>"
    }
});

L.tileLayer.kitten = function() {
    return new L.TileLayer.Kitten();
}

L.tileLayer.kitten().addTo(mainMap);


}); //end windowOnLoad
