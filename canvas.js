$(function() {	

  var canvas;
  var ctx;
  var i = 0;
  var x = [30,115,200,285,370];
  var y = [40,40,40,40,40];

  var xi = [324,408,487,578,657];
  var yi = [620,620,620,620,620];

  var WIDTH = 400;
  var HEIGHT = 500;
  var dragok = false;

  var DOTS = ["Blue","Red","Green","Black1","Black2"]
  var COLORS = ["#007fff","#FF0000","#9cb426","#1b1224","#1b1224"];

  var BUFFER = 20;
  var BBLUE = [210,157];
  var IBLUE = [480,520,710,750];

  var BRED = [332,173];
  var IRED = [600,640,725,765];

  var BGREEN = [123,347];
  var IGREEN = [395,435,905,945];

  var BBLACK1 = [60,253];
  var IBLACK1 = [330,370,810,850];

  var BBLACK2 = [305,317];
  var IBLACK2 = [580,620,870,910];

  var blue_live = true;
  var red_live = true;
  var green_live = true;
  var black1_live = true;
  var black2_live = true;

  var end_x=0;
  var end_y=0;
  var end_dot;

  var current_dot;

  var isIOS = ((/iphone|ipad/gi).test(navigator.appVersion));
  //var isIOS = ((/iphone|ipad/gi).test(navigator.appVersion));


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




    if (isIOS) {
      //$("#debuga").text("IOS"); 
      var c = $("#canvas_container").detach();
      $("#wrapper").height(560);
      c.appendTo("#new_canvas_container");

    canvas.addEventListener("touchstart", touchDown, false);
    canvas.addEventListener("touchend", touchUp, false);
    canvas.addEventListener("touchmove", touchMove, false);      
    }


    else {
      //$("#debugb").text("OSX");        
    canvas.addEventListener("mousedown", mouseDown, false);
    canvas.addEventListener("mouseup", mouseUp, false);
    canvas.addEventListener("mousemove", mouseMove, false); 
    }
    
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
      
      //if(isIOS){
      //  arc(xi[idx], yi[idx]);
      //}
      //else{
        arc(x[idx], y[idx]);        
      //}
    }
  }

  function mouseDown(e){    
      //$("#debuga").text("a " + e.offsetX);
      //$("#debugb").text("b " + e.offsetY);      
      //console.log(e.pageX);
      //console.log(e.pageY); 
      console.log(e.offsetX);
      console.log(e.offsetY);       
      console.log(isOnShape(e));       
      console.log(isLive(e));       
      
    if ( isOnShape(e) && isLive(e) ){
    
    

      //$("#debugx").text(e.offsetX);
      //$("#debugy").text(e.offsetY);

      x[i] = e.offsetX;      
      y[i] = e.offsetY;
      dragok = true;
      canvas.onmousemove = mouseMove;
   }
  }

  function mouseMove(e){  
    if (dragok){
      //console.log(e.offsetX);
      //console.log(e.offsetY);       
      x[i] = e.offsetX;
      y[i] = e.offsetY;
    }
  }

  function mouseUp(e){
    //console.log(e.offsetX);
    //console.log(e.offsetY);     
    dragok = false;
    checkIfDead(e);
  }
  
function touchDown(e){
    //$("#debuga").text("touchdown");

    if ( isOnShapeI(e) && isLive(e)){
      x[i] = e.pageX - canvas.offsetLeft;
      y[i] = e.pageY - canvas.offsetTop;
      dragok = true;
    } 
  }

  function touchMove(e){

     //$("#debuga").text(e.pageX);
     //$("#debugb").text(e.pageY); 

    if (!e)
      e = event;
    e.preventDefault();

    if (dragok && isLive(e)){
      x[i] = e.pageX - canvas.offsetLeft;
      y[i] = e.pageY - canvas.offsetTop;
    }
    
    end_x = e.pageX;
    end_y = e.pageY;
    //end_dot = SetDotI();

     $("#debuga").text(e.pageX);      
     $("#debugb").text(e.pageX);      
     $("#debugc").text(e.pageY);      
     $("#debugd").text(e.pageY);      

     //$("#debugx").text(e.pageX);
     //$("#debugy").text(e.pageY);  
  }

  function touchUp(e){
    dragok = false;
    //canvas.onmousemove = null;
    checkIfDeadI(e);
  }

  function isOnShape(e){
    var result = false;
    for(var iter = 0; iter < 5; iter++){
      if (e.offsetX < x[iter] + 15 && 
        e.offsetX > x[iter] - 15 && 
        e.offsetY < y[iter] + 15 &&
        e.offsetY > y[iter] - 15 ){
        i = iter;
        console.log(i);

        result = true;
      } 
    }    

  return result;

  }

  function isOnShapeI(e){
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
     $("#debugc").text(i);         
        //console.log(x[iter]);
        result = true;
      }
    }

  return result;

  } 

  function checkIfDead(e){  
    if(DOTS[i] === "Blue"){
      if(e.offsetX > BBLUE[0] - BUFFER && e.offsetX < BBLUE[0] + BUFFER
      && e.offsetY > BBLUE[1] - BUFFER && e.offsetY < BBLUE[1] + BUFFER){
        console.log("yes");
        blue_live = false;       
      }
    } else if (DOTS[i] === "Red"){
        if(e.offsetX > BRED[0] - BUFFER  && e.offsetX < BRED[0] + BUFFER
        && e.offsetY > BRED[1] - BUFFER  && e.offsetY < BRED[1] + BUFFER){
          console.log("yes");
          red_live = false;          
        } 
    } else if (DOTS[i] === "Green"){
        if(e.offsetX > BGREEN[0] - BUFFER  && e.offsetX < BGREEN[0] + BUFFER
        && e.offsetY > BGREEN[1] - BUFFER  && e.offsetY < BGREEN[1] + BUFFER){
          console.log("yes");
          green_live = false;    
        } 
    } else if (DOTS[i] === "Black1"){
        if(e.offsetX > BBLACK1[0] - BUFFER  && e.offsetX < BBLACK1[0] + BUFFER
        && e.offsetY > BBLACK1[1] - BUFFER  && e.offsetY < BBLACK1[1] + BUFFER){
          console.log("yes");
          black1_live = false;    
        } 
    } else if (DOTS[i] === "Black2"){
        if(e.offsetX > BBLACK2[0] - BUFFER  && e.offsetX < BBLACK2[0] + BUFFER
        && e.offsetY > BBLACK2[1] - BUFFER  && e.offsetY < BBLACK2[1] + BUFFER){
          console.log("yes");
          black2_live = false;     
        }
    }
  }

  function checkIfDeadI(e){  
    if(DOTS[i] === "Blue"){
     //$("#debugd").text("blue");      
     //$("#debuga").text((e.pageX > IBLUE[0]));      
     //$("#debugb").text(e.pageX < IBLUE[1]);      
     //$("#debugc").text(e.pageY > IBLUE[2] );      
     //$("#debugd").text(e.pageY < IBLUE[3]);      
     $("#debuga").text(e.pageX);      
     $("#debugb").text(e.pageX);      
     $("#debugc").text(e.pageY);      
     $("#debugd").text(e.pageY);           

      if(end_x > IBLUE[0] && end_x < IBLUE[1]
      && end_y > IBLUE[2] && end_y < IBLUE[3]){
        console.log("yes");
     //$("#debuge").text("yes");       
        blue_live = false;     
      }
    } else if (DOTS[i] === "Red"){
        if(end_x > IRED[0] && end_x < IRED[1]
        && end_y > IRED[2] && end_y < IRED[3]){
          console.log("yes");
          red_live = false;          
        } 
    } else if (DOTS[i] === "Green"){
        if(end_x > IGREEN[0] && end_x < IGREEN[1]
        && end_y > IGREEN[2] && end_y < IGREEN[3]){
          console.log("yes");
          green_live = false;    
        } 
    } else if (DOTS[i] === "Black1"){
        if(end_x > IBLACK1[0] && end_x < IBLACK1[1]
        && end_y > IBLACK1[2] && end_y < IBLACK1[3]){
          console.log("yes");
          black1_live = false;    
        } 
    } else if (DOTS[i] === "Black2"){
        if(end_x > IBLACK2[0] && end_x < IBLACK2[1]
        && end_y > IBLACK2[2] && end_y < IBLACK2[3]){
          console.log("yes");
          black2_live = false;     
        }
    }
  } 

  //$("#debugx").text(end_x);
  //$("#debugy").text(end_y);

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