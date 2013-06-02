$(function() {	

var canvas;
var ctx;
var i = 0;
var x = [30,115,200,285,370];
var y = [40,40,40,40,40];
var WIDTH = 400;
var HEIGHT = 500;
var dragok = false;

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
 }
}

function mouseDown(e){
 if ( test(e) ){
  x[i] = e.pageX - canvas.offsetLeft;
  y[i] = e.pageY - canvas.offsetTop;
  dragok = true;
  canvas.onmousemove = mouseMove;
 }
}

function touchUp(){
 dragok = false;
 canvas.onmousemove = null;
}

function touchMove(e){
  if (!e)
   e = event;
  e.preventDefault();

 if (dragok){
  x[i] = e.pageX - canvas.offsetLeft;
  y[i] = e.pageY - canvas.offsetTop;
 }
}

function touchDown(e){
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
 	console.log(e.pageX);
 	console.log(e.pageY);
     i = iter;
   console.log(i);
   console.log(x[iter]);
   result = true;
 }
 else {
 	//console.log(e.pageX);
 	//console.log(e.pageY); 
 	console.log(x[iter]);	  
 }

}

return result;

}

function mouseUp(){
 dragok = false;
}

init();

});