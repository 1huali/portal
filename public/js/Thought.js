class Thought {

    constructor(thought,date,map,lat,lng,arrayNumber,icon){
        this.thought= thought;
        this.date= new Date();

        this.map= map;
        //creates a div, sets an ID : 
        // this.thoughtEl= L.DomUtil.create("div","thoughtEl",this.map._layers[this.mapLayerArray[1]]._container);
        // this.thoughtEl.setAttribute("id","thought"+this.arrayNumber);

        //metaphysical positions:
        this.xPos;
        this.yPos;
        //physical positions:
        this.n_latLng = new L.latLng(lat,lng);
        // this.sound="";
        this.icon=icon;
        this.saved=false;
        this.arrayNumber=""
        //about the growth :
    //   this.currentText= "seed";
    //   this.state= ["seed", "sprout", "bud", "flower"];

    }

    display(){
//display randomly new flowers where the pin is at
      //position of the center of the flower canvas :
      this.thoughtEl.style.left = `${this.xPos-50}px`;
      this.thoughtEl.style.top = `${this.yPos-50}px`; 

    //ends the drawing when the growth is completed (so that it doesn't oveerwrites itself)
    if(this.currentState >=this.state.length){
      this.growthCompleted=true;
    }

    }

    saved(){
//if saved, goes in the favorite array (local storage)
    }

}