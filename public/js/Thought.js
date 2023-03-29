class Thought {

    constructor(thought,date,map,lat,lng,arrayNumber,icon){
        this.thought= thought;
        this.date= new Date();

        this.map= map;
        //to access the map to have the element div on top of the map
        this.mapLayerArray= Object.keys(this.map._layers);
       // console.log(this.map);
        //creates a div, sets an ID : 
        this.thoughtEl= L.DomUtil.create("div","thoughtEl",this.map._layers[this.mapLayerArray[0]]._container);
        this.thoughtEl.setAttribute("id","thought"+this.arrayNumber);

        //physical positions:
        this.n_latLng = new L.latLng(lat,lng);
        //metaphysical positions:
        this.point = this.map.latLngToLayerPoint(this.n_latLng);
        this.xPos = this.point.x;
        this.yPos = this.point.y;
        // this.sound="";
        this.icon=icon;
        this.saved=false;
        this.arrayNumber=arrayNumber;
        //about the growth :
        this.stateArray= [" . "," j "," i "," i꧂","꧁i꧂","꧁✿꧂"];
        this.stateIndex = 0;
        this.currentText = "NULL";
        this.growingInterval;
        //starts growing as soon as it is made:
        this.growingInterval = setInterval(() => {
            this.grow();
        }, 1000);

        // hover:
        this.thoughtHoverEl = L.DomUtil.create("div","thoughtHoverEl",this.map._layers[this.mapLayerArray[0]]._container);
        //position of the hover over its obj:
        this.thoughtHoverEl.style.top = `${this.yPos-150}px`; 
        this.thoughtHoverEl.style.left = `${this.xPos-150}px`; 
        favorite:
        this.saveButton = L.DomUtil.create("button","favoriteButton${this.thoughtEl.id}",this.map._layers[this.mapLayerArray[0]]._container);
        console.log(this.saveButton);
      
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
    }

    display(){
//display randomly new flowers where the pin is at
      //position of the center of the flower canvas :
      this.thoughtEl.style.left = `${this.xPos-50}px`;
      this.thoughtEl.style.top = `${this.yPos-50}px`; 

    //ends the drawing when the growth is completed (so that it doesn't oveerwrites itself)
    if(this.currentState >=this.stateArray.length){
      this.growthCompleted=true;
    }

    }
//call reprint:
reprint(){
//if saved, goes in the favorite array (local storage)
this.thoughtEl= L.DomUtil.create("div","thoughtEl",this.map._layers[this.mapLayerArray[0]]._container);
this.thoughtEl.setAttribute("id","thought"+this.arrayNumber);
this.xPos = this.point.x;
this.yPos = this.point.y;
        // hover:
        this.thoughtHoverEl = L.DomUtil.create("div","thoughtHoverEl",this.map._layers[this.mapLayerArray[0]]._container);
        //position of the hover over its obj:
        this.thoughtHoverEl.style.top = `${this.yPos-70}px`; 
        this.thoughtHoverEl.style.left = `${this.xPos-70}px`; 

        this.hover();

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
          // this.thoughtHoverEl.innerHTML = this.thought + " __" + `<input id="favoriteButton${this.thoughtEl.id}" class="hoverButtons" type="button" value=" ♥ Save "> <br>`;
                    this.thoughtHoverEl.innerHTML = this.thought + " __" + `<input id="favoriteButton${this.thoughtEl.id}" class="hoverButtons" type="button" value=" ♥ Save "> <br>`;

          console.log(this.thoughtEl.id)

          let favButtonArray = document.getElementsByClassName("hoverButtons");
          console.log(favButtonArray);
    //if favorite button clicked; turn off
    for (let i=0; i<favButtonArray.length;i++){
      favButtonArray[i].addEventListener('click', function(){
            // this.saveFavorite();
            this.saved=true;
            console.log(this.saved);

        });
    }


    }

    saveFavorite(){
    //   document.getElementsByClassName("hoverButtons").addEventListener("click", function(){
        // console.log("SAVED BIHSOGHOURGH");
    // });
      this.saved=true;
                  console.log(this.saved);

    }
}
