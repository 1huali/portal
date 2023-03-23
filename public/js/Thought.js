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
        this.thoughtHoverEl.style.top = `${this.posY-150}px`; 

        this.thoughtEl.addEventListener("click", function(){
            let thoughtHoverElClass = document.querySelectorAll(".thoughtHoverEl");
            for (let i=0; i < thoughtHoverElClass.length; i++){
              if (thoughtHoverElClass[i].style.display === "block"); {
                thoughtHoverElClass[i].style.display = "none";
              }
              self.thoughtHoverEl.style= "display: block;"
    
              if (opened === true){
                setTimeout(() => {
                  self.thoughtHoverEl.style.display= "none"
                }, "5000");
          }
            }
        });
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

    favorited(){
//if saved, goes in the favorite array (local storage)
this.thoughtEl= L.DomUtil.create("div","thoughtEl",this.map._layers[this.mapLayerArray[0]]._container);
this.thoughtEl.setAttribute("id","thought"+this.arrayNumber);
this.xPos = this.point.x;
this.yPos = this.point.y;
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
        console.log("hvered")
        // function dhm (ms) {
        //     let days = Math.floor(ms / (24*60*60*1000));
        //     let daysms = ms % (24*60*60*1000);
        //     let hours = Math.floor(daysms / (60*60*1000));
        //     let hoursms = ms % (60*60*1000);
        //     let minutes = Math.floor(hoursms / (60*1000));
        //     let minutesms = ms % (60*1000);
        //     let sec = Math.floor(minutesms / 1000);
    
        //     if (days < 0){
        //       return hours + " hrs " + minutes + " mins ";
        //     } else if (hours < 0){
        //       return minutes + " mins " + sec + " sec ";
        //     } else if (minutes < 0){
        //       return sec + " sec "
        //     } else {
        //       //not showing properly TO FIX
        //     return days + " days " + hours + " hrs " + minutes + " mins ";
        //   }
        //   }

        //   let currentAge= dhm(this.currentAge);
          // console.log(currentAge);
    
        //print to div :
        //   this.hoverEl.innerHTML = 
        //   this.thought + 
        //   "<br>" + 
        //   currentAge +  
        //   "<br>" + 
        //   '<input id="favoriteButton" class="buttons" type="button" value="♥"> <br>';
    
        //   document.getElementById("favoriteButton").addEventListener('click', function(){
        //   console.log("favorited!!!!");
        // });

    }
}
