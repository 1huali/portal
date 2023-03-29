/**
the Portal
Wawa Li
prototype 1
*/
"use strict";
$(document).ready(function(){


    let thoughtsArray=[];
    let savedArray=[];


               //MAP SETTING ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀ 
       // We create a leaflet map, and in setView, we determine coordinates and zoom level
//        let mainMap = L.map('mainMap').setView([45.50884, -73.58781], 19);
//        let coordinateMarker = L.marker();
//               mainMap.touchZoom.disable();
//        mainMap.doubleClickZoom.disable();
//        mainMap.scrollWheelZoom.disable();
//        //source : https://mathi330.github.io/cart351/Demo/demo.html
//     L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
//         maxZoom: 9, // you cannot zoom in more than 9, if set to 10, the map turns gray
//         // doubleClickZoom: false, // this is just so when I double click on the map it doesn't zoom in
//         attribution: '&copy; <a href="http://www.openstreetmap.org/copyright" target="blank_">OpenStreetMap</a>' // link to where we got the data for the map
//     }).addTo(mainMap); // add tile layer to map

// //custom tiles : https://leafletjs.com/examples/extending/extending-2-layers.html
// L.TileLayer.Kitten = L.TileLayer.extend({
//     getTileUrl: function(coords) {
//         // let i = Math.ceil( Math.random() * 3 );
//         return "assets/bg_noir.jpg";
//     },
//     getAttribution: function() {
//         return "<a href='https://placekitten.com/attribution.html'>Void</a>"
//     }
// });
// L.tileLayer.kitten = function() {
//     return new L.TileLayer.Kitten();
// }
// L.tileLayer.kitten().addTo(mainMap);

            //FRACTAL MAP SETUP ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀ 
// http://aparshin.github.io/leaflet-fractal/#julia_1.1184848480.273636364i/1/5/15

//default zoom : 10
let mainMap = L.map('mainMap', {minZoom:1});
let coordinateMarker = L.marker();

let numWorkers = 3;

let layers = {
    "julia -1.118484848+0.273636364*i":L.tileLayer.fractalLayer(paletteController, numWorkers,"julia",300,-1.118484848,0.273636364).addTo(mainMap),
    // "multibrot3":L.tileLayer.fractalLayer(paletteController, numWorkers,"multibrot3",300),
    // "burning ship":L.tileLayer.fractalLayer(paletteController, numWorkers,"burningShip"),
    // "tricorn":L.tileLayer.fractalLayer(paletteController, numWorkers,"tricorn"),
    // "julia -0.74543+0.11301*i":L.tileLayer.fractalLayer(paletteController, numWorkers,"julia"),
    // "julia -0.75+0.11*i":L.tileLayer.fractalLayer(paletteController, numWorkers,"julia",500,-0.75,0.11),
    //
    // "julia -0.1+0.651*i":L.tileLayer.fractalLayer(paletteController, numWorkers,"julia",500,-0.1,0.651),
    // "julia -0.4+0.6*i":L.tileLayer.fractalLayer(paletteController, numWorkers,"julia",500,-0.4,0.6),
    // "julia -0.8+0.156*i":L.tileLayer.fractalLayer(paletteController, numWorkers,"julia",500,-0.8,0.156),
    //  "julia -1.118484848+0.273636364*i":L.tileLayer.fractalLayer(paletteController, numWorkers,"julia",300,-1.118484848,0.273636364),
    //
    //  "julia  -0.37+0.6*i":L.tileLayer.fractalLayer(paletteController, numWorkers,"julia",500,-0.37,0.6)
}

let lc=L.control.layers(layers,{},{position:"topleft",collapsed:false}).addTo(mainMap);

mainMap.setView([0, -90], 1).addHash({lc:lc}).addControl(new PaletteControl(layers, {position: "topleft"}));
// mainMap.setZoom(1);

if (L.Browser.mobile) {
    console.log("mobile")
   mainMap.removeControl(map.zoomControl);
}

           //DB RETRIEVE SETTING ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀ 
    //retrieve the varibles back from the db at page load:
    $.get(
        "/thoughts", //the url page where the response is coming from
       // if we get a response from the server .... 
        function(response) {

            // console.log(response);
            //no need to parse the response ; unpack the array of the reponse :
            for(let i = 0; i<response.length; i++){
           thoughtsArray.push(new Thought(response[i].thought,
            response[i].date,
            mainMap,
            response[i].lat,
            response[i].lng,
            i,
            response[i].icon,));
           }
           
           //calls the function:
           for (let i=0 ; i< thoughtsArray.length;i++){
            thoughtsArray[i].display();
            thoughtsArray[i].hover();
            // console.log(thoughtsArray[i].saved);
           }

mainMap.on('zoomend', function() {

    for (let i=0;i< thoughtsArray.length; i++){
        //reprint at every zoom : 
        thoughtsArray[i].reprint();
        thoughtsArray[i].display();
        thoughtsArray[i].grow();
    }
    
    zoomObj();

});


           //VARIABLES SETUP ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀ 
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
    let sound = document.getElementById("chimeSound");

    //user gets a single thought:
    let dailyThoughtBox = document.getElementById("thought-modal");
    let currentThoughtHTML= document.getElementById("currentThought");
    //Queue settings:
    let currentThought="";
    currentThought = thoughtsArray[thoughtsArray.length-1].thought;
    currentThoughtHTML.innerHTML= currentThought;

    let returningVisitor=false;

    if (returningVisitor===false){
    dailyThoughtBox.addEventListener("click", function(){
        dailyThoughtBox.style= "display : none";
        sound.play();
        returningVisitor = true;
        //24 hours until the next thought display:
        //temporary 10 sec
        setTimeout(() => {
            returningVisitor=false;
          }, "10000");
    })
    } else if (returningVisitor === true){
        dailyThoughtBox.style= "display : none";
    }
    console.log("returning visitor= " +returningVisitor);
//about/infos placeholders : 
    let infoButton = document.getElementById("info-button");
    let infoBox = document.getElementById("infos-modal");
    infoButton.addEventListener("click", function(){
        infoBox.style= "display : block";
    });
    infoBox.addEventListener("click", function(){
        infoBox.style= "display:none";
    });
//favorite placeholders : 
    let savedListButton = document.getElementById("savedList-button");
    let savedListBox = document.getElementById("savedList-modal")

    savedListButton.addEventListener("click", function(){
        savedListBox.style= "display : block";
    });
    savedListBox.addEventListener("click", function(){
        savedListBox.style= "display:none";
    });

    //TO DO : set timer in local storage to count 24 hours :
//retourning visitor settings:
// let creationStamp = 
// let now = date.getTime() - this.timeStamp;
// let endStamp = now + 86400000 //24 hours in millisecond
// let timeLeft;
// setInterval(function (){now + 24hrs , return timeLeft} , 86400000)

// function ageTimer(){
//           //calculation of the age of the tree. With the age variable, we can give it an evolution tracking time stamp to assign its visual representation.
//           let date = new Date();
//           let currentTimestamp = date.getTime() - this.timeStamp; //age in minutes

//           timestampDifference = currentTimestamp-date;
//           console.log(timestampDifference);
// }
 // !! 86400000 ms (jour), mais live c'est en minute pour test purposes


mainMap.on('click', function (e){
    if (submitOff === false){
        onMapClick(e);

    } else if (submitOff === true){
        document.getElementById("input-modal").style="display:none";
        console.log("come back tmr");
    }
} );

saveToFavorite(); //where to put it cos it doesnt update

let numPplOnline=0;
  let numPplOnlineBox= document.getElementById("numOnlineRn");

           //SOCKET SETTING ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀ 
//set up the client socket to connect to the socket.io server
let io_socket = io();
let clientSocket = io_socket.connect('http://localhost:4200');

//emit a connect message on client side at success: 
let socketId =-1;
 clientSocket.on('connect', function(data) {
      console.log("socket connected");
      // put code here that should only execute once the client is connected
      clientSocket.emit('join', 'msg:: client joined');
      // handler for receiving client id
      clientSocket.on("joinedClientId", function(data){
        socketId = data;
        console.log("myId : "+socketId);
      });

      clientSocket.on("numClients", function(data){
        numPplOnline = data;
        numPplOnlineBox.innerHTML= numPplOnline;
//
      })
  });

  //global thoughtcount :
  document.getElementById("totalGlobal").innerHTML = thoughtsArray.length;

           //FUNCTIONS ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀ 

function onMapClick(e){
    // console.log("clicked on map");

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
    submitOff=true;
    //One submission per day:
                let thought = inputThought.value;
                newThought = new Thought(thought, date, mainMap, e.latlng.lat, e.latlng.lng ,thoughtsArray.length, icon.value);
                thoughtsArray.push(newThought);
                //submitting values to db : 
                passingTheVars(newThought);
                sound.play();
                newThought.display();
                // console.log(newThought);
                console.log(thoughtsArray);
                inputThought.value = "";
                document.getElementById("input-modal").style="display:none";

                                        //24 hours timer
                // setTimeout(() => {
                //     submitOff=false;
                //     console.log("24 hours passed");
                //   }, "86400000");

                // temporary 10 second timer :
                setTimeout(() => {
                    submitOff=false;
                  }, "10000");
    
        });
    
}


//pass inputs to db  :
function passingTheVars(newThought){
    //ajax GET() request : 
$.get(
 "/thoughtSubmit", //the url page where the response is coming from
 {thought : newThought.thought, date : newThought.date, icon: newThought.icon, xPos : newThought.xPos, yPos: newThought.yPos, saved : newThought.saved, lat : newThought.n_latLng.lat, lng : newThought.n_latLng.lng},
// if we get a response from the server .... 
 function(response) {
    console.log('page content: ' + response);
 }); //get
}

// for (let i=0;i<newThought.favButtonArray.length;i++){
//     console.log("SAVED BIHSOGHOURGH");

// }
// document.getElementsByClassName("hoverButtons").addEventListener("click", function(){
//     console.log("SAVED BIHSOGHOURGH");
//     });

function zoomObj(){
let fontSize= 2;
let zoomSize= mainMap.getZoom();

let zoomOp = fontSize + (zoomSize*2);

 let x= document.getElementsByClassName("thoughtEl");

 for (let i=0; i<x.length; i++){
    x[i].style.fontSize = zoomOp+"px";
 }
}


function saveToFavorite(){
    for (let i=0;i<thoughtsArray.length;i++){
                // if (thoughtsArray[i].saved===true){
            console.log(thoughtsArray[i].saved);
                // }
        }
    }


    
//    //local storage set-up
//    function saveTimestamp (timestamp){
//     // Create a local storage item (key value pair)
//     //The localStorage property is read-only.
//     //username : password and input fields
//     timeValue = timestamp;

//     // check if this key-val alreday exists
//     if (localStorage[userKey] === timeValue) {
//     //   valToStore = password;
//     // appendConsoleMsg("> Ur birthday:" + userValue + "time old");


//     // } else {
//     //     //WRITE to local storage
//     // currentUserIdBox.innerHTML = userValue;
//     // identifyButton.style = "display : none";
//     // document.getElementById("password-container").style = "display : block";
//     // setPasswordButton.style = "display : block";
//     // localStorage.setItem(userKey,userValue);
//     }
//     //!! close dialog
//     };

}); //get
}); //end windowOnLoad
