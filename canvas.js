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

  var BUFFER = 20;
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

  function arc(x,y) {
    ctx.beginPath();
    ctx.arc(x,y, 30, 0, Math.PI*2, true);
    ctx.closePath();
    ctx.fill();
  }

  function clear() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
  }

  function init() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    setEndSpotsForDevice();    

    if (isIOS) {
      canvas.addEventListener("touchstart", touchDown, false);
      canvas.addEventListener("touchend", touchUp, false);
      canvas.addEventListener("touchmove", touchMove, false); 

      var c = $("#canvas_container").detach();
      $("#wrapper").height(560);
      c.appendTo("#new_canvas_container");

    } else {
      canvas.addEventListener("mousedown", mouseDown, false);
      canvas.addEventListener("mouseup", mouseUp, false);
      canvas.addEventListener("mousemove", mouseMove, false); 
    }
    
    return setInterval(drawAll, 10);
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

  function drawAll(){
    clear();
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

  function mouseDown(e){       
    if (isOnShape(e) && isLive(e)){
      x[i] = e.offsetX;      
      y[i] = e.offsetY;
      dragok = true;
      canvas.onmousemove = mouseMove;
   }
  }

  function mouseMove(e){  
    if (dragok){      
      x[i] = e.offsetX;
      y[i] = e.offsetY;
    }
  }

  function mouseUp(e){    
    dragok = false;
    checkIfDead(e);
  }
  
function touchDown(e){
    if (isOnShape(e) && isLive(e)){
      x[i] = e.pageX - canvas.offsetLeft;
      y[i] = e.pageY - canvas.offsetTop;
      dragok = true;
    } 
  }

  function touchMove(e){
    if (!e)
      e = event;
    e.preventDefault();

    if (dragok && isLive(e)){
      x[i] = e.pageX - canvas.offsetLeft;
      y[i] = e.pageY - canvas.offsetTop;
    }
    
    end_x = e.pageX;
    end_y = e.pageY; 
  }

  function touchUp(e){
    dragok = false;
    checkIfDead(e);
  }

  function isOnShape(e){
    var xVar, yVar;
    var offsetX, offsetY;
    if(isIOS){
      xVar = e.pageX;
      yVar = e.pageY;
      offsetX = canvas.offsetLeft;
      offsetY = canvas.offsetTop;      
    } else {
      xVar = e.offsetX;
      yVar = e.offsetY;
      offsetX = 0;
      offsetY = 0;      
    }

    var result = false;
    for(var iter = 0; iter < 5; iter++){
      if (xVar < x[iter] + 15 + offsetX && 
        xVar > x[iter] - 15 + offsetX && 
        yVar < y[iter] + 15 + offsetY &&
        yVar > y[iter] - 15 + offsetY ){
        i = iter;
        console.log(i);
        result = true;
      } 
    }    

  return result;

  }

  function checkIfDead(e){
    var xVar, yVar;
    if(isIOS){
      xVar = end_x;
      yVar = end_y;
    } else {
      xVar = e.offsetX;
      yVar = e.offsetY;    
    }
    if(DOTS[i] === "Blue"){
      if(inRange(xVar, yVar, BLUE)){
        blue_live = false;       
      }
    } else if (DOTS[i] === "Red"){
        if(inRange(xVar, yVar, RED)){
          red_live = false;          
        } 
    } else if (DOTS[i] === "Green"){
        if(inRange(xVar, yVar, GREEN)){
          green_live = false;    
        } 
    } else if (DOTS[i] === "Black1"){
        if(inRange(xVar, yVar, BLACK1)){
          black1_live = false;    
        } 
    } else if (DOTS[i] === "Black2"){
        if(inRange(xVar, yVar, BLACK2)){
          black2_live = false;     
        }
    }
  }

  function inRange(x, y, colorMinMax){
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