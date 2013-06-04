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

  var BBLUE = [540,580,720,760];
  //var IBLUE = [480,520,720,760];

  var BRED = [660,700,735,775];
  //var IRED = [480,520,720,760];

  var BGREEN = [450,490,905,945];
  //var IGREEN = [480,520,720,760];

  var BBLACK1 = [390,430,815,855];
  //var IGREEN = [480,520,720,760];

  var BBLACK2 = [635,675,875,915];
  //var IGREEN = [480,520,720,760];

  var blue_live = true;
  var red_live = true;
  var green_live = true;
  var black1_live = true;
  var black2_live = true;

  var end_x=0;
  var end_y=0;
  var end_dot;

  var current_dot;

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

    canvas.addEventListener("mousedown", mouseDown, false);
    canvas.addEventListener("mouseup", mouseUp, false);
    canvas.addEventListener("mousemove", mouseMove, false); 
    canvas.addEventListener("touchstart", touchDown, false);
    canvas.addEventListener("touchend", touchUp, false);
    canvas.addEventListener("touchmove", touchMove, false);

    return setInterval(drawAll, 10);
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
    if ( isOnShape(e) && isLive(e) ){
      x[i] = e.pageX - canvas.offsetLeft;
      y[i] = e.pageY - canvas.offsetTop;
      dragok = true;
      canvas.onmousemove = mouseMove;
   }
  }

  function mouseMove(e){
    if (dragok){
      x[i] = e.pageX - canvas.offsetLeft;
      y[i] = e.pageY - canvas.offsetTop;
    }
  }

  function mouseUp(e){
    dragok = false;
    console.log(e.pageX); 
    console.log(e.pageY); 
    checkIfDead(e);
  }

  function touchDown(e){
    $("#debugx").text("touchdown");
    if ( isOnShape(e) ){
      x[i] = e.pageX - canvas.offsetLeft;
      y[i] = e.pageY - canvas.offsetTop;
      dragok = true;
    } 
  }

  function touchMove(e){
    if (!e)
      e = event;
    e.preventDefault();

    if (dragok && blue_live){
      x[i] = e.pageX - canvas.offsetLeft;
      y[i] = e.pageY - canvas.offsetTop;
    }
    
    end_x = e.pageX;
    end_y = e.pageY;
    end_dot = SetDotI();

     //$("#debugx").text(e.pageX);
     //$("#debugy").text(e.pageY);  
  }

  function touchUp(e){
    dragok = false;
    canvas.onmousemove = null;
    iCheck(); 
  }

  function isOnShape(e){
    var result = false;
    for(var iter = 0; iter < 5; iter++){
      if (e.pageX < x[iter] + 15 + canvas.offsetLeft && 
     		e.pageX > x[iter] - 15 + canvas.offsetLeft && 
     		e.pageY < y[iter] + 15 + canvas.offsetTop &&
     		e.pageY > y[iter] - 15 + canvas.offsetTop){
     	  //console.log(e.pageX);
     	  //console.log(e.pageY);
        i = iter;
        console.log(i);
        //console.log(x[iter]);
        result = true;
      }
    }

  return result;

  }

  function checkIfDead(e){  
    if(DOTS[i] === "Blue"){
      if(e.pageX > BBLUE[0] && e.pageX < BBLUE[1]
      && e.pageY > BBLUE[2] && e.pageY < BBLUE[3]){
        console.log("yes");
        blue_live = false;     
      }
    } else if (DOTS[i] === "Red"){
        if(e.pageX > BRED[0] && e.pageX < BRED[1]
        && e.pageY > BRED[2] && e.pageY < BRED[3]){
          console.log("yes");
          red_live = false;          
        } 
    } else if (DOTS[i] === "Green"){
        if(e.pageX > BGREEN[0] && e.pageX < BGREEN[1]
        && e.pageY > BGREEN[2] && e.pageY < BGREEN[3]){
          console.log("yes");
          green_live = false;    
        } 
    } else if (DOTS[i] === "Black1"){
        if(e.pageX > BBLACK1[0] && e.pageX < BBLACK1[1]
        && e.pageY > BBLACK1[2] && e.pageY < BBLACK1[3]){
          console.log("yes");
          black1_live = false;    
        } 
    } else if (DOTS[i] === "Black2"){
        if(e.pageX > BBLACK2[0] && e.pageX < BBLACK2[1]
        && e.pageY > BBLACK2[2] && e.pageY < BBLACK2[3]){
          console.log("yes");
          black2_live = false;     
        }
    }
  }

  function iCheck(){   
    if(end_x > IBLUE[0] && end_x < IBLUE[1]
    && end_y > IBLUE[2] && end_y < IBLUE[3]){
      blue_live = false;
    }
  }

  $("#debugx").text(end_x);
  $("#debugy").text(end_y);

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