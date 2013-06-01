$(function() {	

var canvas;
var ctx;
var x = 50;
var y = 50;
var WIDTH = 400;
var HEIGHT = 500;
var dragok = false;
var radius = 15;

function arc(x,y,w,h) {
 ctx.beginPath();
 ctx.arc(x,y,30,0,2*Math.PI);
 ctx.closePath();
 ctx.fill();
}

function rect(x,y,w,h) {
 ctx.beginPath();
 ctx.rect(x,y,w,h);
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

 return setInterval(draw, 10);
}

function draw() {
 clear();
 ctx.fillStyle = "#FAF7F8";
 //rect(0,0,WIDTH,HEIGHT);
 ctx.fillStyle = "#FF0000";

 if (img == null){
	var img = new Image();
 	img.src = 'images/ia-logo/ia-logo-back-copy.png'
  ctx.drawImage(img,0,90,400,400);
}

 arc(x-15,y-15,20)
}

function mouseMove(e){
 if (dragok){
  x = e.pageX - canvas.offsetLeft;
  y = e.pageY - canvas.offsetTop;
 }
}

function mouseDown(e){
 if ( test(e) ){
  x = e.pageX - canvas.offsetLeft;
  y = e.pageY - canvas.offsetTop;
  dragok = true;
 }
}

function mouseUp(){
 dragok = false;
}

function touchUp(){
 dragok = false;
}

function touchMove(e){
  if (!e)
   e = event;
  e.preventDefault();

 if (dragok){
  x = e.pageX - canvas.offsetLeft;
  y = e.pageY - canvas.offsetTop;
 }
}

function touchDown(e){
 if ( test(e) ){
  x = e.pageX + canvas.offsetLeft;
  y = e.pageY + canvas.offsetTop;
  dragok = true;
 }
}

function test(e){
	if(
		e.pageX < x + radius + canvas.offsetLeft 
		&& e.pageX > x - radius + canvas.offsetLeft 

    && 

    e.pageY < y + radius + canvas.offsetTop 
 		&& e.pageY > y - radius + canvas.offsetTop
 		) 
	{
		return true
	}
	else 
	{
		return false
	}
}

init();

});
