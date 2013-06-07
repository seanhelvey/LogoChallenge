
function main(){
  var canvasLogo = new CanvasLogo();
  canvasLogo.init();
  setInterval(function(){canvasLogo.drawAll()},10);
}

var CanvasLogo = function(){
  var canvas;
  var ctx;
  var i = 0;
  var x = [30,115,200,285,370];
  var y = [40,40,40,40,40];

  var WIDTH = 400;
  var HEIGHT = 500;
  var dragok = false;

  var DOTS = ["Blue","Red","Green","Black1","Black2"]
  var COLORS = ["#007fff","#FF0000","#9cb426","#1b1224","#1b1224"];

  var BUFFER = 15;
  var RANGE_ARRAY;
  var liveArray = [true,true,true,true,true];

  var end_x=0;
  var end_y=0;

  var isIOS = ((/iphone|ipad/gi).test(navigator.appVersion));  

  var thisRef = this;

  this.init = function(){
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    this.setEndSpotsForDevice(); 

    if (isIOS) {
      canvas.addEventListener("touchstart", this.mouseTouchStart, false);
      canvas.addEventListener("touchmove", this.mouseTouchMove, false); 
      canvas.addEventListener("touchend", this.mouseTouchEnd, false);      

      var c = $("#canvas_container").detach();
      $("#wrapper").height(560);
      c.appendTo("#new_canvas_container");

    } else {
      canvas.addEventListener("mousedown", this.mouseTouchStart, false);
      canvas.addEventListener("mousemove", this.mouseTouchMove, false); 
      canvas.addEventListener("mouseup", this.mouseTouchEnd, false);      
    }      
  }   

  this.setEndSpotsForDevice = function(){ 
    if(isIOS){
      RANGE_ARRAY = [[500,740],[620,745],[415,925],[350,830],[600,890]];
    } else {
      RANGE_ARRAY = [[210,157],[332,173],[123,347],[60,253],[305,317]];  
    }
  }  

  this.drawAll = function(){
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    ctx.fillStyle = "#FFFFFF";     

    if (img == null){
      var img = new Image();
      img.src = 'images/ia-logo/ia-logo-back-copy.png'
      ctx.drawImage(img,0,100,400,400);
    }   

    for (var idx = 0; idx < COLORS.length; idx++){
      ctx.fillStyle = COLORS[idx];
      this.arc(x[idx], y[idx]);        
    }
  }    

  this.arc = function(x,y){
    ctx.beginPath();
    ctx.arc(x,y, 30, 0, Math.PI*2, true);
    ctx.closePath();
    ctx.fill();
  }         

  this.mouseTouchStart = function(e){
    var coords = thisRef.deviceCoords(e, false);
    var xRHS = coords[0];
    var yRHS = coords[1];

    if (thisRef.isOnShape(e) && thisRef.isLive(e)){
      x[i] = xRHS;      
      y[i] = yRHS;
      dragok = true;
    }
  }

  this.mouseTouchMove = function(e){  
    var coords = thisRef.deviceCoords(e, false);
    var xRHS = coords[0];
    var yRHS = coords[1];

    if (!e)
      e = event;
    e.preventDefault();

    if (dragok){
      x[i] = xRHS;
      y[i] = yRHS;
    }
    
    end_x = e.pageX;
    end_y = e.pageY; 
  }

  this.mouseTouchEnd = function(e){    
    dragok = false;
    thisRef.checkIfDead(e);
  }

  this.deviceCoords = function(e, last){
    if (isIOS) {
      if (last) {
        //touchend loses coordinates!! this is a workaround.
        xVar = end_x;
        yVar = end_y;
      } else {
        //pageX, pageY is the mouse position relative to the left edge of the document.
        //offsetLeft and offsetTop eturn the number of pixels that the upper left corner 
        //of the current element is offset to the left within the offsetParent node.
        //remember, we removed the element from the containing div for iOS in the setup method.
        xVar = e.pageX - canvas.offsetLeft;
        yVar = e.pageY - canvas.offsetTop;      
      }
    } else {
      //offset() retrieves the current position relative to the document.
      xVar = e.offsetX;
      yVar = e.offsetY;    
    }    
    return [xVar, yVar];
  } 

  this.isOnShape = function(e){    
    var coords = thisRef.deviceCoords(e, false);
    var xVar = coords[0];
    var yVar = coords[1];

    var result = false;
    for(var iter = 0; iter < COLORS.length; iter++){
      if (xVar < x[iter] + BUFFER && 
        xVar > x[iter] - BUFFER && 
        yVar < y[iter] + BUFFER &&
        yVar > y[iter] - BUFFER ){
        i = iter;
        result = true;
      } 
    }    

    return result;

  }

  this.isLive = function(e){
    if(DOTS[i] === "Blue"){
      return liveArray[i];
    } else if (DOTS[i] === "Red"){
      return liveArray[i];
    } else if (DOTS[i] === "Green"){
      return liveArray[i];
    } else if (DOTS[i] === "Black1"){
      return liveArray[i];
    } else if (DOTS[i] === "Black2"){
      return liveArray[i];
    }
  } 

  this.checkIfDead = function(e){  
    var coords = thisRef.deviceCoords(e, true);
    var xVar = coords[0];
    var yVar = coords[1];

    if(DOTS[i] === "Blue"){
      if(thisRef.inEndRange(xVar, yVar, RANGE_ARRAY[0])){
        liveArray[i] = false;       
      }
    } else if (DOTS[i] === "Red"){
        if(thisRef.inEndRange(xVar, yVar, RANGE_ARRAY[1])){
          liveArray[i] = false;          
        } 
    } else if (DOTS[i] === "Green"){
        if(thisRef.inEndRange(xVar, yVar, RANGE_ARRAY[2])){
          liveArray[i] = false;    
        } 
    } else if (DOTS[i] === "Black1"){
        if(thisRef.inEndRange(xVar, yVar, RANGE_ARRAY[3])){
          liveArray[i] = false;    
        } 
    } else if (DOTS[i] === "Black2"){
        if(thisRef.inEndRange(xVar, yVar, RANGE_ARRAY[4])){
          liveArray[i] = false;     
        }
    }
  }  

  this.inEndRange = function(x, y, colorMinMax){ 
    if (x > colorMinMax[0] - BUFFER && x < colorMinMax[0] + BUFFER
    && y > colorMinMax[1] - BUFFER && y < colorMinMax[1] + BUFFER){
      return true;
    } else {
      return false;
    }
  }   

} 

$(main);