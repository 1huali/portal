//The class Thought has a constructor that takes in several parameters to initialize properties related to a thought, 
//including its ID, the element to append it to, its text, location data, and more. The class has a reprint() method 
//that creates a new thought element on a map using Leaflet and positions it based on the thought's latitude and longitude. 
//The grow() method updates the text content of a thought element with the next element in an array and increments a state index. 
//Finally, the class has a saved property to indicate whether the thought has been saved to local storage, and a locationFilter 
//property to indicate whether the thought should be underlined in the hover element.

class Thought {

    constructor(thoughtId,appendToSaveList,thought,date,map,lat,lng,arrayNumber,city,country){
        this.thoughtId=thoughtId;
        this.appendToSaveList = appendToSaveList;
        this.thought= thought;
        this.date= new Date().getTime();
        // let timeStampValue=this.timestamp;
        this.city=city;
        this.country=country;

        this.map= map;
        //to access the map to have the element div on top of the map
        this.mapLayerArray= Object.keys(this.map._layers);
       // console.log(this.map);
        this.arrayNumber=arrayNumber;
       

        //physical positions:
        this.n_latLng = new L.latLng(lat,lng);
        //metaphysical positions:
       
        // this.sound="";
        // this.icon=icon;
        this.saved=false;
        this.locationFilter=false;
        //about the growth :
        // this.stateArray= [" . "," * ","⋆","⍟","★","☆"];
        this.stateArray= ["|","|","|","|","|","|"];
        this.stateIndex = 0;
        this.currentText = "NULL";
        this.growingInterval;
        //starts growing as soon as it is made:
        this.growingInterval = setInterval(() => {
            this.grow();
        }, 1000);

        this.favButtonArray=[];

    }

//The reprint() function redraws the elements on the map. 
//It creates a div element with an ID and sets its position based on the latitude and longitude of the thought. 
//It also creates a hover div element and positions it over the thought div. If locationFilter is set to true, 
//it underlines the text in the hover element. It then calls the hover() function to add a click event to the thought div. 
//Finally, it checks if the growth of the thought is completed and sets a boolean flag accordingly.
reprint(){
//if saved, goes in the favorite array (local storage)
//thought elements div is created in reprint: 
        //creates a div, sets an ID : 
this.thoughtEl= L.DomUtil.create("div","thoughtEl",this.map._layers[this.mapLayerArray[0]]._container);
this.thoughtEl.setAttribute("id","thought"+this.arrayNumber);



this.point = this.map.latLngToLayerPoint(this.n_latLng);
this.xPos = this.point.x;
this.yPos = this.point.y;

this.thoughtEl.style.left = `${this.xPos}px`;
this.thoughtEl.style.top = `${this.yPos}px`;
        // hover:
        this.thoughtHoverEl = L.DomUtil.create("div","thoughtHoverEl",this.map._layers[this.mapLayerArray[0]]._container);
        this.thoughtHoverEl.setAttribute("id","thoughtHoverEl"+this.arrayNumber);
        //position of the hover over its obj:
        this.thoughtHoverEl.style.top = `${this.yPos-20}px`; 
        this.thoughtHoverEl.style.left = `${this.xPos-20}px`; 

        if (this.locationFilter===true){
          this.thoughtHoverEl.style.textDecoration =  "underline";
        }

        this.hover();

        if(this.currentState >=this.stateArray.length){
            this.growthCompleted=true;
          }

    }

    //The grow() function updates the text content of a DIV element (thoughtEl) with the next element in an array (stateArray). 
    //It increments a state index (stateIndex) to track the current state of the array. When the index exceeds 5, the function 
    //clears the growing interval and sets the state index to 5 to prevent the array from growing beyond its bounds.
    grow(){
        this.currentText= this.stateArray[this.stateIndex];
    this.thoughtEl.innerHTML = this.currentText;
    this.stateIndex++;
    if (this.stateIndex > 5){
    clearInterval(this.growingInterval);
    this.stateIndex = 5;
    }
    }

    //The hover() function adds a click event to a DIV and displays a thought and a Save button. 
    //It also creates a new DIV element with an ID and a class name. If the thought is already saved as a favorite, 
    //the Save button displays a star symbol. If not, the button displays an empty star. When the Save button is clicked, 
    //the function saves the thought as a favorite and changes the color and symbol of the Save button accordingly.
    hover(){  

        //print to div :
        //    this.thoughtHoverEl.innerHTML = this.thought + " __" + `<input id="favoriteButton${this.thoughtEl.id}" class="hoverButtons" type="button" value=" ♥ Save "> <br>`;
                    // this.thoughtHoverEl.innerHTML = this.thought + " __" + `<input id="favoriteButton${this.thoughtEl.id}" class="hoverButtons" type="button" value=" ♥ Save "> <br>`;
                    this.thoughtHoverEl.innerHTML = this.thought + " __";
                    let div= document.createElement("div");
                    div.id=`favoriteButton${this.thoughtEl.id}`;
                    div.classList.add("hoverButtons");
                    div.innerHTML="[☆]";
                    this.thoughtHoverEl.appendChild(div);

                    if (this.saved===true){
                        div.style="color:white";
                        div.innerHTML="[★]";
                    } 

                    if (this.saved===false){
                        div.style="color:#00ff6a";
                        div.innerHTML="[☆]";
                    }

                    let self=this;

          div.addEventListener("click", function(){

            if (self.saved===false){            //saves thought to favorite by checking thru the db :
            //changes color of the button to white :
            this.style="color:white";
            this.innerHTML="[★]";
            self.saved = true;
            self.saveFavorite(self);
        }
          });
        }


    //saveFavorite(self) function First, it saves the current thought to the local storage and creates an array of saved thoughts. 
    //If the thought already exists in the array, it does not create a duplicate. The function also creates an array of saved thought 
    //IDs and saves it to the local storage. Finally, the function updates the saved thoughts on the server using an AJAX GET request 
    //(currently commented out).
    saveFavorite(self){

        //write to local storage
        localStorage.setItem("savedKey",self.thought);
        // console.log(localStorage.getItem("savedKey"));

        // }
        //Creation fo a thought array (the saved ones):
//if the thought doesn't exist as "saved" in the db, it will created it
        if (localStorage.thoughts){
            //check if it exists already:
            let thoughts= JSON.parse(localStorage.thoughts);
            thoughts.push(self.thought+". "+self.city+", "+self.country+". ");
            localStorage.setItem("thoughts", JSON.stringify(thoughts));
        }
            //first time storage:
        else {
            let thoughts = [];
            thoughts[0] = self.thought;
        localStorage.setItem("thoughts", JSON.stringify(thoughts));
        } 

        self.appendToSaveList();

        //Creation for a saved array:
        if (localStorage.savedIds){
            let savedIds= JSON.parse(localStorage.savedIds);
            savedIds.push(self.thoughtId);
            localStorage.setItem("savedIds", JSON.stringify(savedIds));
        }// if it's afirst time storage:
        else {
            let savedIds = [];
            savedIds[0] = self.thoughtId;
        localStorage.setItem("savedIds", JSON.stringify(savedIds));
        } 
        //update the saved to the db with an ajax GET() request : 
    // $.get(
    //     "/thoughtUpdate", //the url page where the response is coming from
    //     {thought : this.thought, date : this.date, icon: this.icon, xPos : this.xPos, yPos: this.yPos, saved : this.saved, lat : this.n_latLng.lat, lng : this.n_latLng.lng},
    //    // if we get a response from the server .... 
    //     function(response) {
    //        console.log('page content: ' + response);
    //     }); //get
    }

} //end
