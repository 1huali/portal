class Thought {

    constructor(appendToSaveList,thought,date,map,lat,lng,arrayNumber,city,country){
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
        //creates a div, sets an ID : 
       //this.thoughtEl= L.DomUtil.create("div","thoughtEl",this.map._layers[this.mapLayerArray[0]]._container);
        this.arrayNumber=arrayNumber;
       

        //physical positions:
        this.n_latLng = new L.latLng(lat,lng);
        //metaphysical positions:
       
        // this.sound="";
        // this.icon=icon;
        this.saved=false;
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

       // this.point = this.map.latLngToLayerPoint(this.n_latLng);
       // this.xPos = this.point.x;
       // this.yPos = this.point.y;

        // hover:
        // this.thoughtHoverEl = L.DomUtil.create("div","thoughtHoverEl",this.map._layers[this.mapLayerArray[0]]._container);
        
        // //position of the hover over its obj:
        // this.thoughtHoverEl.style.top = `${this.yPos-150}px`; 
        // this.thoughtHoverEl.style.left = `${this.xPos-150}px`; 

      
        // this.favButton = `<input id="favoriteButton${this.thoughtEl.id}" class="buttons" type="button" value=" ♥ Save "> <br>`
        this.favButtonArray=[];
//transfered to script :
    //     this.thoughtEl.addEventListener("click", function(){
    //         let thoughtHoverElClass = document.querySelectorAll(".thoughtHoverEl");

    //         for (let i=0; i < thoughtHoverElClass.length; i++){
    //           if (thoughtHoverElClass[i].style.display === "block"); {
    //             thoughtHoverElClass[i].style.display = "none";
    //             opened=false;
    //           }
    //           self.thoughtHoverEl.style= "display: block;"
    //           opened=true;
    // //?? cant stay opened at click
    //           if (opened === true){
    //             setTimeout(() => {
    //               self.thoughtHoverEl.style.display= "none"
    //               opened=false;
    //             }, "5000");
    //       }
    //         }
    //     });
    // this.hover();
    }

reprint(){
//if saved, goes in the favorite array (local storage)

this.thoughtEl= L.DomUtil.create("div","thoughtEl",this.map._layers[this.mapLayerArray[0]]._container);
this.thoughtEl.setAttribute("id","thought"+this.arrayNumber);



this.point = this.map.latLngToLayerPoint(this.n_latLng);
this.xPos = this.point.x;
this.yPos = this.point.y;

this.thoughtEl.style.left = `${this.xPos}px`;
this.thoughtEl.style.top = `${this.yPos}px`;
        // hover:
        this.thoughtHoverEl = L.DomUtil.create("div","thoughtHoverEl",this.map._layers[this.mapLayerArray[0]]._container);
        //position of the hover over its obj:
        this.thoughtHoverEl.style.top = `${this.yPos-20}px`; 
        this.thoughtHoverEl.style.left = `${this.xPos-20}px`; 


        this.hover();

        if(this.currentState >=this.stateArray.length){
            this.growthCompleted=true;
          }

    }

    grow(){
        this.currentText= this.stateArray[this.stateIndex];
    this.thoughtEl.innerHTML = this.currentText;
    this.stateIndex++;
    if (this.stateIndex > 5){
    clearInterval(this.growingInterval);
    this.stateIndex = 5;
    }
    }

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
                    // document.getElementById("thoughtHoverEl").style="color:white";

                    let self=this;
          div.addEventListener("click", function(){
            //saves thought to favorite by checking thru the db :
            //changes color of the button to white :
            this.style="color:white";
            this.innerHTML="[★]";

            // document.getElementById("thoughtHoverEl").style = "color:white";
            console.log("clcincncnc");

            self.saved = true;
            // console.log(self.saved);
            self.saveFavorite(self);
          });
         // console.log(document.getElementById(`favoriteButton${this.thoughtEl.id}`));



    }

    saveFavorite(self){
        //write to local storage
        localStorage.setItem("savedKey",self.thought);
        console.log(localStorage.getItem("savedKey"));

        // }
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
        console.log(localStorage.getItem("thoughts"));

        self.appendToSaveList();

        

        //update the saved to the db with an ajax GET() request : 
    // $.get(
    //     "/thoughtUpdate", //the url page where the response is coming from
    //     {thought : this.thought, date : this.date, icon: this.icon, xPos : this.xPos, yPos: this.yPos, saved : this.saved, lat : this.n_latLng.lat, lng : this.n_latLng.lng},
    //    // if we get a response from the server .... 
    //     function(response) {
    //        console.log('page content: ' + response);
    //     }); //get
    }


    age(){
              //age of the tree. With the age variable, we can give it an evolution tracking time stamp to assign its visual representation.
    //   let date = new Date();
    //   this.currentAge = date.getTime() - this.timeStamp;
    }

} //end
