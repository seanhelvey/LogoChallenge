$(function() {	

var canvas;
var ctx;
var i = 0;
var x = [30,115,200,285,370];
var y = [40,40,40,40,40];
var WIDTH = 400;
var HEIGHT = 500;
var dragok = false;

var BBLUE_CUR = [360,400,600,640];
var BBLUE = [540,580,720,760];
//var IBLUE = [480,520,720,760];

var BRED_CUR = [440,480,600,640];
var BRED = [660,700,735,775];
//var IRED = [480,520,720,760];

var BGREEN_CUR = [530,570,600,640];
var BGREEN = [450,490,905,945];
//var IGREEN = [480,520,720,760];

var BBLACK1_CUR = [615,655,600,640];
var BBLACK1 = [390,430,815,855];
//var IGREEN = [480,520,720,760];

var BBLACK2_CUR = [700,740,600,640];
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

function rect(x,y,w,h) {
 ctx.beginPath();
 ctx.rect(x,y,w,h);
 ctx.closePath();
 ctx.fill();
}

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

 return setInterval(hokeyPokey, 10);
}

function hokeyPokey(){
	draw1();
	draw2();
	draw3();
  draw4();
  draw5();  
}

function draw1() {
 //if(blue_live){  
  clear();
  ctx.fillStyle = "#FFFFFF";
  rect(0,0,WIDTH,HEIGHT);
  ctx.fillStyle = "#007fff";

  if (img == null){
	 var img = new Image();
 	 img.src = 'images/ia-logo/ia-logo-back-copy.png'
   ctx.drawImage(img,0,100,400,400);
  }

  arc(x[0], y[0]);
 //}
}

function draw2() {

 //clear();

 ctx.fillStyle = "#FFFFFF";
 //rect(0,0,WIDTH,HEIGHT);
 ctx.fillStyle = "#FF0000";

/*
 if (img == null){
	var img = new Image();
 	img.src = 'images/ia-logo/ia-logo-back-copy.png'
  ctx.drawImage(img,0,100,400,400);
}*/

 arc(x[1], y[1]);
}

function draw3() {
 //clear();
 ctx.fillStyle = "#FFFFFF";
 //rect(0,0,WIDTH,HEIGHT);
 ctx.fillStyle = "#9cb426";

/*
 if (img == null){
	var img = new Image();
 	img.src = 'images/ia-logo/ia-logo-back-copy.png'
  ctx.drawImage(img,0,100,400,400);
}*/

 arc(x[2], y[2]);
}

function draw4() {
 //clear();
 ctx.fillStyle = "#FFFFFF";
 //rect(0,0,WIDTH,HEIGHT);
 ctx.fillStyle = "#1b1224";

/*
 if (img == null){
  var img = new Image();
  img.src = 'images/ia-logo/ia-logo-back-copy.png'
  ctx.drawImage(img,0,100,400,400);
}*/

 arc(x[3], y[3]);
}

function draw5() {
 //clear();
 ctx.fillStyle = "#FFFFFF";
 //rect(0,0,WIDTH,HEIGHT);
 ctx.fillStyle = "#1b1224";

/*
 if (img == null){
  var img = new Image();
  img.src = 'images/ia-logo/ia-logo-back-copy.png'
  ctx.drawImage(img,0,100,400,400);
}*/

 arc(x[4], y[4]);
}

function mouseMove(e){
 if (dragok){
  x[i] = e.pageX - canvas.offsetLeft;
  y[i] = e.pageY - canvas.offsetTop;
  setDotB(e);
 }
}

function mouseDown(e){
  setDotB(e);
  $("#debugx").text("mousedown");  
 //if ( test(e) && blue_live){
  if ( test(e) && isLive(e) ){
  x[i] = e.pageX - canvas.offsetLeft;
  y[i] = e.pageY - canvas.offsetTop;
  dragok = true;
  canvas.onmousemove = mouseMove;
 }
}

function mouseUp(e){
 dragok = false;
 console.log(e.pageX); 
 console.log(e.pageY); 
 check(e);
}

function touchUp(e){
 dragok = false;
 canvas.onmousemove = null;
 iCheck();

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

function touchDown(e){
  $("#debugx").text("touchdown");
 if ( test(e) ){
  x[i] = e.pageX - canvas.offsetLeft;
  y[i] = e.pageY - canvas.offsetTop;
  dragok = true;
 }
}

function test(e){
var result = false;
for(var iter = 0; iter < 5; iter++){
 if (e.pageX < x[iter] + 15 + canvas.offsetLeft && 
 		 e.pageX > x[iter] - 15 + canvas.offsetLeft && 
 		 e.pageY < y[iter] + 15 + canvas.offsetTop &&
 		 e.pageY > y[iter] - 15 + canvas.offsetTop){
 	//console.log(e.pageX);
 	//console.log(e.pageY);
     i = iter;
   //console.log(i);
   //console.log(x[iter]);
   result = true;
 }
 else {
 	//console.log(e.pageX);
 	//console.log(e.pageY); 
 	//console.log(x[iter]);	  
 }

}

return result;

}

function check(e){  
  if(end_dot === "blue"){
    if(e.pageX > BBLUE[0] && e.pageX < BBLUE[1]
      && e.pageY > BBLUE[2] && e.pageY < BBLUE[3]){
      console.log("yes");
      blue_live = false;
      BBLUE_CUR[0] = 0;
      BBLUE_CUR[1] = 0;
      BBLUE_CUR[2] = 0;
      BBLUE_CUR[3] = 0;       
    }
  } else if (end_dot === "red"){
    if(e.pageX > BRED[0] && e.pageX < BRED[1]
      && e.pageY > BRED[2] && e.pageY < BRED[3]){
      console.log("yes");
      red_live = false;
      BRED_CUR[0] = 0;
      BRED_CUR[1] = 0;
      BRED_CUR[2] = 0;
      BRED_CUR[3] = 0;            
    } 
  }else if (end_dot === "green"){
    if(e.pageX > BGREEN[0] && e.pageX < BGREEN[1]
      && e.pageY > BGREEN[2] && e.pageY < BGREEN[3]){
      console.log("yes");
      green_live = false;
      BGREEN_CUR[0] = 0;
      BGREEN_CUR[1] = 0;
      BGREEN_CUR[2] = 0;
      BGREEN_CUR[3] = 0;      
    } 
  }else if (end_dot === "black1"){
    if(e.pageX > BBLACK1[0] && e.pageX < BBLACK1[1]
      && e.pageY > BBLACK1[2] && e.pageY < BBLACK1[3]){
      console.log("yes");
      black1_live = false;
      BBLACK1_CUR[0] = 0;
      BBLACK1_CUR[1] = 0;
      BBLACK1_CUR[2] = 0;
      BBLACK1_CUR[3] = 0;       
    } 
  }else if (end_dot === "black2"){
    if(e.pageX > BBLACK2[0] && e.pageX < BBLACK2[1]
      && e.pageY > BBLACK2[2] && e.pageY < BBLACK2[3]){
      console.log("yes");
      black2_live = false;
      BBLACK2_CUR[0] = 0;
      BBLACK2_CUR[1] = 0;
      BBLACK2_CUR[2] = 0;
      BBLACK2_CUR[3] = 0;       
    }
  }
}

function iCheck(){   
  if(end_x > IBLUE[0] && end_x < IBLUE[1]
    && end_y > IBLUE[2] && end_y < IBLUE[3]){
    blue_live = false;
  }
}

function setDotB(e){
    if(e.pageX > BBLUE_CUR[0] && e.pageX < BBLUE_CUR[1]
    && e.pageY > BBLUE_CUR[2] && e.pageY < BBLUE_CUR[3]){
      end_dot = "blue";
      console.log("blue");
      BBLUE_CUR[0] = e.pageX - 30;
      BBLUE_CUR[1] = e.pageX + 30;
      BBLUE_CUR[2] = e.pageY - 30;
      BBLUE_CUR[3] = e.pageY + 30;
      console.log(BBLUE_CUR);
  } else if (e.pageX > BRED_CUR[0] && e.pageX < BRED_CUR[1]
    && e.pageY > BRED_CUR[2] && e.pageY < BRED_CUR[3]){
      end_dot = "red";
      console.log("red");      
      BRED_CUR[0] = e.pageX - 30;
      BRED_CUR[1] = e.pageX + 30;
      BRED_CUR[2] = e.pageY - 30;
      BRED_CUR[3] = e.pageY + 30;  
      console.log(BRED_CUR);    
  }else if (e.pageX > BGREEN_CUR[0] && e.pageX < BGREEN_CUR[1]
    && e.pageY > BGREEN_CUR[2] && e.pageY < BGREEN_CUR[3]){
      end_dot = "green";
      console.log("green");      
      BGREEN_CUR[0] = e.pageX - 30;
      BGREEN_CUR[1] = e.pageX + 30;
      BGREEN_CUR[2] = e.pageY - 30;
      BGREEN_CUR[3] = e.pageY + 30;  
      console.log(BGREEN_CUR);    
  }else if (e.pageX > BBLACK1_CUR[0] && e.pageX < BBLACK1_CUR[1]
    && e.pageY > BBLACK1_CUR[2] && e.pageY < BBLACK1_CUR[3]){
      end_dot = "black1";
      console.log("black1");      
      BBLACK1_CUR[0] = e.pageX - 30;
      BBLACK1_CUR[1] = e.pageX + 30;
      BBLACK1_CUR[2] = e.pageY - 30;
      BBLACK1_CUR[3] = e.pageY + 30;  
      console.log(BBLACK1_CUR);    
  }else if (e.pageX > BBLACK2_CUR[0] && e.pageX < BBLACK2_CUR[1]
    && e.pageY > BBLACK2_CUR[2] && e.pageY < BBLACK2_CUR[3]){
      end_dot = "black2";
      console.log("black2");      
      BBLACK2_CUR[0] = e.pageX - 30;
      BBLACK2_CUR[1] = e.pageX + 30;
      BBLACK2_CUR[2] = e.pageY - 30;
      BBLACK2_CUR[3] = e.pageY + 30;  
      console.log(BBLACK2_CUR);    
  }
}

 $("#debugx").text(end_x);
 $("#debugy").text(end_y);

function isLive(e){
  check(e);
  if(end_dot === "blue"){
    return blue_live;
  } else if (end_dot === "red"){
    return red_live;
  } else if (end_dot === "green"){
    return green_live;
  } else if (end_dot === "black1"){
    return black1_live;
  } else if (end_dot === "black2"){
    return black2_live;
  }
}

function removeListeners(element){
  var old_element = document.getElementById(element);
  var new_element = old_element.cloneNode(true);
  old_element.parentNode.replaceChild(new_element, old_element);  
}

init();

});