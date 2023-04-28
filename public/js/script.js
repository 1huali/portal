/**
the Portal
Wawa Li
prototype 1
*/
"use strict";
$(document).ready(function(){

    // localStorage.removeItem("arrivalTimestamp");


    let thoughtsArray=[];
    let generateNewCard=true;
    let arrivalTimestamp=[];
    let d = new Date();
let startTime = d.getTime();
// temporary:
setTimeout(() => {
    document.getElementById("userOptionDiv").style="display:block";
    document.getElementById("multiplayerDataZone").style="display:block";

}, "2500");

let flareIcon = L.icon({
    iconUrl: 'public/assets/images/flare.png',

    iconSize:     [38, 95]// size of the icon
    // iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    // popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

               //FRACTAL MAP SETTING ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀ 
// http://aparshin.github.io/leaflet-fractal/#julia_1.1184848480.273636364i/1/5/15

let geocoder = new google.maps.Geocoder();

//default zoom : 10
let mainMap = L.map('mainMap', {minZoom:1});
let coordinateMarker = L.marker({icon: flareIcon});
let geolocationCity="unknown";
let geolocationCountry="unknown";
let geoOn=false;

let numWorkers = 3;
let marker =null;
let coords = null;

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

let lc=L.control.layers(layers,{},{position:"bottomright",collapsed:false}).addTo(mainMap);
mainMap.setView([0, -90], 1).addHash({lc:lc}).addControl(new PaletteControl(layers, {position: "bottomright"}));
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
           let newThought = new Thought(
            response[i]._id,
            appendToSaveList,
            response[i].thought,
            response[i].date,
            mainMap,
            parseFloat(response[i].lat),
            parseFloat(response[i].lng),
            i,
            response[i].city,
            response[i].country);
            // newThought.xPos =  parseInt(response[i].xPos);
            // newThought.yPos =  parseInt(response[i].yPos);

            thoughtsArray.push(newThought);
           }

           //checks the thoughts that are according to the savedId array list and puts them back to true:
           let savedIds= JSON.parse(localStorage.savedIds)
           for (let i=0;i<thoughtsArray.length;i++){
            if (savedIds.includes(thoughtsArray[i].thoughtId)){
                thoughtsArray[i].saved=true;
            }
           }
           
           //calls the function:
           for (let i=0 ; i< thoughtsArray.length;i++){
        //    thoughtsArray[i].display();
          thoughtsArray[i].reprint();
         
            //thoughtsArray[i].hover();
            // console.log(thoughtsArray[i].saved);
           }

           //reprint on the map functions:
mainMap.on('zoomend', function() {

    for (let i=0;i< thoughtsArray.length; i++){
        //reprint at every zoom : 
        thoughtsArray[i].reprint();
        thoughtsArray[i].grow();
    }
    
    checkTimeArrival();
    zoomObj();
    if(marker!==null){
    marker.addTo(mainMap); // add the marker to the map
}


});

           //reprint on the map functions:
mainMap.on('moveend', function() {

    for (let i=0;i< thoughtsArray.length; i++){
        //reprint at every zoom : 
        thoughtsArray[i].reprint();
        thoughtsArray[i].grow();

    }
    
    checkTimeArrival();
    zoomObj();
    if(marker!==null){
    marker.addTo(mainMap); // add the marker to the map
}


});


           //VARIABLES SETUP ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀ 
    let totalSoloBox = document.getElementById("totalSolo");
    let totalGlobalBox = document.getElementById("totalGlobal");
    let totalGlobalCount= 0;
    let totalLocalCount= 0;
    // totalSoloBox.innerHTML=totalLocalCount;
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
    if (thoughtsArray.length>0){
        currentThought = thoughtsArray[thoughtsArray.length-1].thought;
        currentThoughtHTML.innerHTML= currentThought;    
    };

    //Button to display thought fieldbox:
    let addThoughtButton= document.getElementById("addThought-button");
    let clickEnabled=false;
    let inputBoxOpen=false;

    addThoughtButton.addEventListener("click", function(){
        //enables marker on map : 
        if (inputBoxOpen===false){
        inputBoxOpen=true;
        clickEnabled =true;
        document.getElementById("instruction-modal").style="display:block";
        // document.getElementById("input-modal").style="display:block";
        }
    })


// localStorage.setItem("arrivalTimestamp",timeArrival);

function checkTimeArrival(){
    let timer = 30000; //30 seconds for test

if (localStorage.arrivalTimestamp){
    //check if it exists already. if it does, you need to get it and parse it:
    arrivalTimestamp = JSON.parse(localStorage.getItem("arrivalTimestamp"));
    let timePast = parseInt(startTime)-parseInt(arrivalTimestamp[0]);

    if (timePast>timer){
        console.log("daily timer restarted");
        generateNewCard=true;
        arrivalTimestamp[0]=startTime;
        localStorage.setItem("arrivalTimestamp", JSON.stringify(arrivalTimestamp));
        
    } else {
        console.log("daily card already opened");
        dailyThoughtBox.style= "display : none";
        generateNewCard = false;

    }
} else {
    //first timer, stores the timestamp at arrival:
    dailyThoughtBox.style= "display : block";
    console.log("there is no timer stored");
    generateNewCard = true;
    arrivalTimestamp.push(startTime);
    localStorage.setItem("arrivalTimestamp", JSON.stringify(arrivalTimestamp));
}
}

if (generateNewCard===true){
    dailyThoughtBox.addEventListener("click", function(){
        dailyThoughtBox.style= "display : none";
        sound.play();
    })
    } else if (generateNewCard === false){
        dailyThoughtBox.style= "display : none";
    }

//about/infos placeholders : 
    let infoButton = document.getElementById("info-button");
    let infoBox = document.getElementById("infos-modal");
    infoBox.style="display:none"
    infoButton.addEventListener("click", function(){
        infoBox.style= "display : block";
    });
    infoBox.addEventListener("click", function(){
        infoBox.style= "display:none";
    });
//favorite placeholders : 
    let savedListButton = document.getElementById("savedList-button");

    let savedListBox = document.getElementById("savedList-modal");
    savedListBox.style="display:none";

    savedListButton.addEventListener("click", function(){
        for (let i=0;i<thoughtsArray.length;i++){
        }
        savedListBox.style= "display : block";
    });
    document.getElementById("savedElements").addEventListener("click", function(){
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

 let inputModal= document.getElementById("input-modal");
 inputModal.style="display:none"

mainMap.on('click', function (e){
    if (submitOff === false && clickEnabled === true){
        onMapClick(e);
    } else if (submitOff === true){
        inputModal.style="display:none";
        console.log("come back tmr");
    }
} );

// appendSavedList(); //where to put it cos it doesnt update

let numPplOnline=0;
  let numPplOnlineBox= document.getElementById("numOnlineRn");

           //SOCKET SETTING ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀ 
//set up the client socket to connect to the socket.io server
let io_socket = io();
// let clientSocket = io_socket.connect('http://localhost:5000'); //no need cos its connected automatically
let clientSocket = io_socket.connect();

//emit a connect message on client side at success: 
let socketId =-1;
 clientSocket.on('connect', function(data) {
      console.log("socket connected");
      // put code here that should only execute once the client is connected
      clientSocket.emit('join', 'msg:: client joined');

      // handler for receiving client id/callback function:
      clientSocket.on("joinedClientId", function(data){
        socketId = data;
        console.log("myId : "+socketId);
        // runClientInConnect(); //AJOUTÉ
    
      });

      
      //prints the num of people online rn:
      clientSocket.on("numClients", function(data){
        numPplOnline = data;
        numPplOnlineBox.innerHTML= numPplOnline;

      })
  });

  //global thoughtcount :
  document.getElementById("totalGlobal").innerHTML = thoughtsArray.length;


           //FUNCTIONS ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀ 

//The onMapClick function adds a marker to the map at the location where the user double-clicked and opens a modal for the user to input their thoughts.
//The submitButton event listener waits for the user to submit their thought and then creates a new Thought object with the input values. 
//The function then saves the Thought object to the thoughtsArray and submits the thought to the database by calling the passingTheVars function. 
//Finally, it sets a timer for 10 seconds to prevent the user from submitting another thought before that time has elapsed.
function onMapClick(e){

    marker = coordinateMarker.setLatLng(e.latlng) // set the coordinates of the marker to the coordinates of the mouse when it was double clicked
    marker.addTo(mainMap); // add the marker to the map
    coords = e.latlng;
    document.getElementById("instruction-modal").style="display:none";
    document.getElementById("input-modal").style="display:block";

}

 //user can submit one thought per day:
 submitButton.addEventListener("click", function(){
      
    submitOff=true;
    //One submission per day:
    // console.log(coords);
                let thought = inputThought.value;
                newThought = new Thought("",appendToSaveList, thought, date, mainMap, coords.lat, coords.lng ,thoughtsArray.length,geolocationCity,geolocationCountry);
                newThought.reprint();
                localStorage.setItem("timestampKey",newThought.date);
                thoughtsArray.push(newThought);
                console.log(localStorage.getItem("timestampKey"));

                //submitting values to db : 
                passingTheVars(newThought);
                sound.play();
               
                
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
    
//}


//The function passingTheVars makes an AJAX GET request to the server with the new thought's properties such as the thought itself, the date, the position (x,y), if it's saved or not, the latitude, longitude, city and country. 
//If the response is successful, the function removes the marker, sets clickEnabled and inputBoxOpen to false, and assigns the returned thought ID to newThought.thoughtId.
function passingTheVars(newThought){
    //ajax GET() request : 
$.get(
 "/thoughtSubmit", //the url page where the response is coming from
 {thought : newThought.thought, date : newThought.date, xPos : newThought.xPos, yPos: newThought.yPos, saved : newThought.saved, lat : newThought.n_latLng.lat, lng : newThought.n_latLng.lng, city : newThought.city, country:newThought.country},

 // if we get a response from the server .... 
 function(response) {
    //removes the marker at thought submission:
    clickEnabled=false;
    inputBoxOpen=false;
    mainMap.removeLayer(marker);
    marker = null;
    newThought.thoughtId=response._id;
 }); //get

}

//The zoomObj function increases the font size of elements with the class "thoughtEl" based on the current zoom level of a map. 
//The savedListButton event listener triggers the appendToSaveList function when the button is clicked, which appends saved thoughts to the modal.
function zoomObj(){
let fontSize= 2;
let zoomSize= mainMap.getZoom();

let zoomOp = fontSize + (zoomSize*2);

 let x= document.getElementsByClassName("thoughtEl");

 for (let i=0; i<x.length; i++){
    x[i].style.fontSize = zoomOp+"px";
 }
}


    savedListButton.addEventListener("click", function(){
        appendToSaveList();
    });


//appendToSaveList() defines two functions and an event listener.
//The appendToSaveList() function is used to append saved thoughts to a modal window. 
//It first checks if there are any saved thoughts in local storage, then retrieves and parses them. 
//Next, it creates a p element for each thought, adds the class saved-prop, and appends it to the savedElements div.

//The usePosition(position) function is a callback function used to retrieve the user's geolocation. 
//It uses the geolocation object to get the user's latitude and longitude. 
//It then creates a new google.maps.Geocoder() object and calls its geocode() method to retrieve the user's city and country. 
//If successful, the geolocationCity and geolocationCountry variables are set. It then updates the locationDataBox div and calls the filterByLocation() function.

//Finally, an event listener is set up to handle clearing the saved thoughts list. 
//It removes the thoughts and savedIds keys from local storage and sets the saved property of each thought in the thoughtsArray to false.
    function appendToSaveList(){
        if(localStorage.thoughts){
        console.log(localStorage.getItem("thoughts"));
        document.getElementById("savedElements").innerHTML="";

        let savedContainer= document.getElementById("savedList-modal");
        //needto parse 
        let savedThoughtsArray = JSON.parse(localStorage.getItem("thoughts"));
        

        for (let i=0;i<savedThoughtsArray.length;i++){
        let dataHTMLElement= document.createElement("p");
        dataHTMLElement.classList.add("saved-prop");
        document.getElementById("savedElements").appendChild(dataHTMLElement);
        //!! STORE GELOCATION
        // dataHTMLElement.innerHTML=savedThoughtsArray[i];
        console.log(savedThoughtsArray);
        dataHTMLElement.innerHTML= savedThoughtsArray[i];
    }
    }

    }

//Clear local storage and saved list : 
document.getElementById("clearList-button").addEventListener("click", function(){
    //removes from local storage:
    localStorage.removeItem("thoughts");
    localStorage.removeItem("savedIds");
    //the saved property of the "thoughts" are false:
    for (let i=0;i<thoughtsArray.length;i++){
        thoughtsArray[i].saved=false;
        console.log(thoughtsArray[i].saved);
        //??doesnt update to false?
        //?? doesn't erase at clearance
    }
});

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

let geoLocationDetected=false;
document.getElementById("authorizeLocation").addEventListener("click",() =>{

    if (geoLocationDetected===false){

    if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(usePosition);
          geoOn = true;
          document.getElementById("authorizeLocation").value = "Off"
    }      else {
        console.log( "Geolocation is not supported by this browser.");
    }
    geoLocationDetected=true;
} else {
      if (geoOn === true){
        document.getElementById("authorizeLocation").value = "Off"
        geoOn = false;
    } else {
        document.getElementById("authorizeLocation").value = "On"
        geoOn = true;
    }
      }
  });

 // THE CALLBACK FUNCTION for geolocation position:
 //This is a callback function for geolocation position. 
 //It takes the latitude and longitude values and creates a geocoder object to convert these coordinates into an address. 
 //It extracts the city and country information from the address and assigns them to geolocationCity and geolocationCountry variables respectively. 
 //It then updates the locationDataBox element on the HTML page with the city and country information, 
 //and calls the filterByLocation() function to filter the thoughtsArray based on the location information.
    function usePosition(position) {
    // console.log(position);
    let geocoder = new google.maps.Geocoder();
    let latlng = {
        lat: parseFloat(position.coords.latitude),
        lng: parseFloat(position.coords.longitude),
      };
    
 
    // let paraLat = document.createElement("p");
    // paraLat.textContent = "Latitude: " + position.coords.latitude;
 
    // let paraLong = document.createElement("p");
    // paraLong.textContent = "Longitude: " + position.coords.longitude;
 
    // // console.log(position.coords);
    // document.getElementById("coords").appendChild(paraLat);
    // document.getElementById("coords").appendChild(paraLong);

    geocoder
.geocode({ location: latlng })
.then((response) => {
// geolocationResponse = response.results[0].plus_code.compound_code;
for (let i=0; i<response.results[0].address_components.length;i++) {

    if (response.results[0].address_components[i].types[0] === "locality"){
        geolocationCity = response.results[0].address_components[i].long_name;
    }
    if (response.results[0].address_components[i].types[0] === "country"){
        geolocationCountry = response.results[0].address_components[i].long_name;
        break;
    }
}

locationDataBox.innerHTML = geolocationCity+ " , "+ geolocationCountry+".";
filterByLocation();
});
 
}//function usePosition

//The function filterByLocation() logs the current location (city and country) and iterates through an array called thoughtsArray. 
//For each element in the array, it checks if the city and country properties match the current location. If they match, it sets a 
//boolean property called locationFilter to true for that element and underlines the corresponding HTML element's text. Finally, 
//it logs the length of locationFilter for that element.
function filterByLocation(){
    console.log("all are from "+ geolocationCity+", "+ geolocationCountry+". ");

    for (let i=0;i< thoughtsArray.length;i++){
        if (thoughtsArray[i].city === geolocationCity && thoughtsArray[i].country === geolocationCountry){
            thoughtsArray[i].locationFilter=true;
            document.getElementById(thoughtsArray[i].thoughtHoverEl.id).style. textDecoration = "underline";
            (console.log(thoughtsArray[i].locationFilter.length));
        }
    }
}

}); //get
}); //end windowOnLoad
