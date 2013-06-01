$(function() {	

var canvas;
var ctx;
var x = 75;
var y = 50;
var WIDTH = 400;
var HEIGHT = 500;
var dragok = false;

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
 rect(0,0,WIDTH,HEIGHT);
 ctx.fillStyle = "#444444";
 rect(x - 15, y - 15, 30, 30);
}

function mouseMove(e){
 if (dragok){
  x = e.pageX - canvas.offsetLeft;
  y = e.pageY - canvas.offsetTop;
 }
}

function mouseDown(e){
 if (e.pageX < x + 15 + canvas.offsetLeft && e.pageX > x - 15 +
 canvas.offsetLeft && e.pageY < y + 15 + canvas.offsetTop &&
 e.pageY > y -15 + canvas.offsetTop){
  x = e.pageX - canvas.offsetLeft;
  y = e.pageY - canvas.offsetTop;
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
  x = e.pageX - canvas.offsetLeft;
  y = e.pageY - canvas.offsetTop;
 }
}

function touchDown(e){
 if (e.pageX < x + 15 + canvas.offsetLeft && e.pageX > x - 15 +
 canvas.offsetLeft && e.pageY < y + 15 + canvas.offsetTop &&
 e.pageY > y -15 + canvas.offsetTop){
  x = e.pageX - canvas.offsetLeft;
  y = e.pageY - canvas.offsetTop;
  dragok = true;
 }
}

function mouseUp(){
 dragok = false;
}

init();

});
