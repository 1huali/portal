class Thought {

    constructor(thought,date,map,lat,lng,arrayNumber,icon){
        this.thought= thought;
        this.date= new Date();

        this.map= map;
        //to access the map to have the element div on top of the map
        this.mapLayerArray= Object.keys(this.map._layers);
        //creates a div, sets an ID : 
        this.thoughtEl= L.DomUtil.create("div","thoughtEl",this.map._layers[this.mapLayerArray[1]]._container);
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
        this.arrayNumber=""
        //about the growth :
        this.stateArray= [" . "," j "," i "," i꧂","꧁i꧂","꧁✿꧂"];
        this.stateIndex = 0;
        this.currentText = "NULL";
        this.growingInterval;
        //starts growing as soon as it is made:
        this.growingInterval = setInterval(() => {
            this.grow();
        }, 1000);


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

    saved(){
//if saved, goes in the favorite array (local storage)
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
}
