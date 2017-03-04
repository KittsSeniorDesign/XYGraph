
var Robots = [];
var RoboNum = 0;
var Axis;
var canvas = document.getElementById("myCanvas");
canvas.width = 1000;
canvas.height = 1000;
var ticknum = 10;
var wspacing = +canvas.width / +ticknum;
var hspacing = +canvas.height / +ticknum;

function StartGraph(){
Axis = new grid();
myGraphArea.start();
}

var myGraphArea = {
  start : function(){
    this.context = canvas.getContext("2d");
    this.interval = setInterval(UpdateGraph, 20);
  },
  clear : function(){
      this.context.clearRect(0, 0, canvas.width, canvas.height);
  }
}

function grid(){
  this.update = function(){
    this.context = canvas.getContext("2d");
	for(var i = 0; i < +ticknum;i++){ 
	this.context.moveTo(+wspacing * +i,+canvas.height);
    this.context.lineTo(+wspacing * +i,+canvas.height - 4);
    this.context.strokeStyle = "black";
    this.context.stroke();         //create x axis ticks
	}
	for(var i = 0; i < +ticknum;i++){ 
	this.context.moveTo(0,+hspacing * +i);
    this.context.lineTo(4,+hspacing * +i);
    this.context.strokeStyle = "black";
    this.context.stroke();         //create y axis ticks
	}
  }
}

function component(){
  this.RobotId = RoboNum;
  RoboNum ++;
  this.x = wspacing * document.getElementById("x").value;
  this.y = hspacing * -(document.getElementById("y").value);
  this.color = document.getElementById("ccolor").value;
  document.getElementById("x").innerHTML = this.x;
  document.getElementById("y").innerHTML = this.y;
  document.getElementById("ccolor").innerHTML = this.color;
  this.speedX = 0;
  this.speedY = 0;
  this.update = function(){
    currentx = +this.x;
    currenty = +this.y + +canvas.height;
    ctx = myGraphArea.context;
    ctx.beginPath();
    ctx.arc(currentx, currenty, 10, 0, 2*Math.PI);
    ctx.strokeStyle=this.color;
    ctx.fillStyle =this.color;
    ctx.fill();
    ctx.stroke();
  }
  this.newPos = function() {
        this.x = +this.x + +this.speedX;
        this.y = +this.y + +this.speedY;
    }
}

function changeLocation() {
		myGraphArea.clear();
		Axis.update();
		id = document.getElementById("roboid").value;
		Robots[id].x = +wspacing * document.getElementById("cx").value;
		Robots[id].y = +hspacing * -(document.getElementById("cy").value);
		Robots[id].update();
	}

function UpdateGraph(){
  myGraphArea.clear();
  Axis.update();
  for(var i = 0; i < RoboNum; i++){
	Robots[i].newPos();
	Robots[i].update();    
  }
}

function AddRobot(){
	var Robot = new component();
	Robots.push(Robot);
}

function moveup(){
  for(var i= 0;i < RoboNum; i++)
  Robots[i].speedY = +Robots[i].speedY - +hspacing;
}

function movedown(){
  for(var i = 0;i < RoboNum; i++)
  Robots[i].speedY = +Robots[i].speedY + +hspacing;
}

function moveleft(){
	for(var i = 0;i < RoboNum; i++)
  Robots[i].speedX = +Robots[i].speedX - +wspacing;
}

function moveright(){
	for(var i = 0; i < RoboNum; i++)
  Robots[i].speedX = +Robots[i].speedX + +wspacing;
}

function clearmove() {
	for(var i = 0; i < RoboNum; i++){
    Robots[i].speedX = 0;
    Robots[i].speedY = 0;
	}
}
