class Thought {

    constructor(thought,date,map,lat,lng,arrayNumber,icon){
        this.thought= thought;
        this.date= new Date();

        this.map= map;
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

    }

    saved(){
//if saved, goes in the favorite array (local storage)
    }

}