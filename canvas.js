$(function() {	

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
  var BLUE;
  var RED;
  var GREEN;
  var BLACK1;
  var BLACK2;

  var blue_live = true;
  var red_live = true;
  var green_live = true;
  var black1_live = true;
  var black2_live = true;

  var end_x=0;
  var end_y=0;

  var isIOS = ((/iphone|ipad/gi).test(navigator.appVersion));

  function init() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    setEndSpotsForDevice();    

    if (isIOS) {
      canvas.addEventListener("touchstart", mouseTouchStart, false);
      canvas.addEventListener("touchmove", mouseTouchMove, false); 
      canvas.addEventListener("touchend", mouseTouchEnd, false);      

      var c = $("#canvas_container").detach();
      $("#wrapper").height(560);
      c.appendTo("#new_canvas_container");

    } else {
      canvas.addEventListener("mousedown", mouseTouchStart, false);
      canvas.addEventListener("mousemove", mouseTouchMove, false); 
      canvas.addEventListener("mouseup", mouseTouchEnd, false);      
    }
    
    return setInterval(drawAll, 10);
  }

  function arc(x,y) {
    ctx.beginPath();
    ctx.arc(x,y, 30, 0, Math.PI*2, true);
    ctx.closePath();
    ctx.fill();
  }

  function drawAll(){
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    ctx.fillStyle = "#FFFFFF";     

    if (img == null){
      var img = new Image();
      img.src = 'images/ia-logo/ia-logo-back-copy.png'
      ctx.drawImage(img,0,100,400,400);
    }   

    for (var idx = 0; idx < COLORS.length; idx++){
      ctx.fillStyle = COLORS[idx];
      arc(x[idx], y[idx]);        
    }
  }

  function deviceCoords(e, last){
    if (isIOS) {
      if (last) {
        xVar = end_x;
        yVar = end_y;
      } else {
        xVar = e.pageX - canvas.offsetLeft;
        yVar = e.pageY - canvas.offsetTop;      
      }
    } else {
      xVar = e.offsetX;
      yVar = e.offsetY;    
    }    
    return [xVar, yVar];
  }   

  function mouseTouchStart(e){
    var coords = deviceCoords(e, false);
    var xRHS = coords[0];
    var yRHS = coords[1];

    if (isOnShape(e) && isLive(e)){
      x[i] = xRHS;      
      y[i] = yRHS;
      dragok = true;
    }
  }

  function mouseTouchEnd(e){    
    dragok = false;
    checkIfDead(e);
  }

  function mouseTouchMove(e){
    var coords = deviceCoords(e, false);
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

  function isOnShape(e){
    var coords = deviceCoords(e, false);
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

  function setEndSpotsForDevice(){
    if(isIOS){
      BLUE = [500,740];
      RED = [620,745];
      GREEN = [415,925];
      BLACK1 = [350,830];
      BLACK2 = [600,890];
    } else {
      BLUE = [210,157];
      RED = [332,173];
      GREEN = [123,347];
      BLACK1 = [60,253];
      BLACK2 = [305,317];  
    }
  }

  function checkIfDead(e){
    var coords = deviceCoords(e, true);
    var xVar = coords[0];
    var yVar = coords[1];

    if(DOTS[i] === "Blue"){
      if(inEndRange(xVar, yVar, BLUE)){
        blue_live = false;       
      }
    } else if (DOTS[i] === "Red"){
        if(inEndRange(xVar, yVar, RED)){
          red_live = false;          
        } 
    } else if (DOTS[i] === "Green"){
        if(inEndRange(xVar, yVar, GREEN)){
          green_live = false;    
        } 
    } else if (DOTS[i] === "Black1"){
        if(inEndRange(xVar, yVar, BLACK1)){
          black1_live = false;    
        } 
    } else if (DOTS[i] === "Black2"){
        if(inEndRange(xVar, yVar, BLACK2)){
          black2_live = false;     
        }
    }
  }

  function inEndRange(x, y, colorMinMax){
    if (x > colorMinMax[0] - BUFFER && x < colorMinMax[0] + BUFFER
    && y > colorMinMax[1] - BUFFER && y < colorMinMax[1] + BUFFER){
      return true;
    } else {
      return false;
    }
  }

  function isLive(e){
    if(DOTS[i] === "Blue"){
      return blue_live;
    } else if (DOTS[i] === "Red"){
      return red_live;
    } else if (DOTS[i] === "Green"){
      return green_live;
    } else if (DOTS[i] === "Black1"){
      return black1_live;
    } else if (DOTS[i] === "Black2"){
      return black2_live;
    }
  }

  init();

});