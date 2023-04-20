class DraggableBox {
    constructor (divContainer){
      // Activates the parent function:
      this.dragElement(divContainer);
    } //end construtor


 dragElement(elmnt) {
  let locked =false;
  let pos1 =0 ; let pos2 = 0; let pos3 = 0 ; let pos4 = 0;
  console.log(elmnt);

      // if a mydivehader is present, make it the handle :
  if (document.getElementsByClassName(elmnt.getAttribute("ref-class") + "header")) {
    document.getElementsByClassName(elmnt.getAttribute("ref-class") + "header")[0].addEventListener("mousedown",dragMouseDown)
  
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.addEventListener("mousedown",dragMouseDown);
   
  }
 
  elmnt.addEventListener("mouseup",closeDragElement);



   function dragMouseDown() {
    if (boxIsDragging===false){
      console.log("here")
      boxIsDragging=true;
    //mouse is down = true: 
    locked = true;
    document.addEventListener("mousemove",elementDrag);
    // protective meaure that unsets the default setting of an event ; customizing an event's behaviour : 
    event.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = event.clientX;
     pos4 = event.clientY;
    //document.onmouseup = closeDragElement();
    // call a function whenever the cursor moves:
   // document.onmousemove = elementDrag();
  }
}

   function elementDrag() {
    if(locked ===true){
    event.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - event.clientX;
    pos2 = pos4 - event.clientY;
    pos3 = event.clientX;
     pos4 = event.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }
  }

   function closeDragElement() {
    if(locked ===true){
      locked =false;
      boxIsDragging= false;
    }
    // stop moving when mouse button is released:
   // document.onmouseup = null;
    //document.onmousemove = null;

  }
  }//end dragElement();
}//end of class
