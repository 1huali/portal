/**
the Portal
Wawa Li
prototype 1
*/
"use strict";
$(document).ready(function(){

    let thoughtsArray=[];
    let savedArray=[];

    let totalSoloBox = document.getElementById("totalSolo");
    let totalGlobalBox = document.getElementById("totalGlobal");
    let totalGlobalCount= 0;
    let totalLocalCount= 0;
    totalSoloBox.innerHTML=totalLocalCount;
    totalGlobalBox.innerHTML=totalGlobalCount;

    let submitButton= document.getElementById("submitButton");
    let submitOff=false;

    let newThought="";
    let date = new Date();
    let inputThought = document.getElementById("userInput");
    let locationDataBox = document.getElementById('locationData');
    let icon = document.getElementById("icon");

    //user gets a single thought:
    let dailyThoughtBox = document.getElementById("thought-modal");
    dailyThoughtBox.addEventListener("click", function(){
        console.log("thought clicked");
        dailyThoughtBox.style= "display : none";
    })

           //MAP SETTING ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀ 
       // We create a leaflet map, and in setView, we determine coordinates and zoom level
       let mainMap = L.map('mainMap').setView([45.50884, -73.58781], 19);
       let coordinateMarker = L.marker();
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

mainMap.on('click', onMapClick);

function onMapClick(e){
    console.log("clicked on map");

    coordinateMarker
    .setLatLng(e.latlng) // set the coordinates of the marker to the coordinates of the mouse when it was double clicked
    .addTo(mainMap); // add the marker to the map
    locationDataBox.value = e.latlng;
    onSubmit(e);

    document.getElementById("input-modal").style="display:block";
    // thoughtsArray.push(new Thought(inputThought,lat,lng,sound,) ),

}


function onSubmit(e){
 //user can submit one thought per day:
 submitButton.addEventListener("click", function(){
    //One submission per day:
            if (submitOff === false){
                let thought = inputThought.value;
                newThought = new Thought(thought, date, mainMap, e.latlng.lat, e.latlng.lng ,thoughtsArray.length, icon.value);
                thoughtsArray.push(newThought);

                // console.log(newThought);
                console.log(thoughtsArray);
                inputThought.value = "";
    
                //24 hours timer
                submitOff=true;
                // setTimeout(() => {
                //     submitOff=false;
                //     console.log("24 hours passed");
                //   }, "86400000");
                //temporary 2 second timer :
                    setTimeout(() => {
                    submitOff=false;
                    console.log(submitOff);
                  }, "2000");
            } else if (submitOff === true){
                console.log("come back tmr");
            }
    
        });
    
}


}); //end windowOnLoad
