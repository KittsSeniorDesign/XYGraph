var Robot;
var Axis;
var canvas = document.getElementById("myCanvas");

function StartGraph(){
Axis = new grid();
Robot = new component();
myGraphArea.start();
}

var myGraphArea = {
  start : function(){
    canvas.width = 500;
    canvas.height = 500;
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
    this.context.moveTo(250,0);
    this.context.lineTo(250,500);
    this.context.moveTo(0,250);
    this.context.lineTo(500,250);
    this.context.strokeStyle = "black";
    this.context.stroke();         //create axises
  }
}

function component(){
  this.x = document.getElementById("x").value;
  this.y = document.getElementById("y").value;
  this.color = document.getElementById("ccolor").value;
  document.getElementById("x").innerHTML = this.x;
  document.getElementById("y").innerHTML = this.y;
  document.getElementById("ccolor").innerHTML = this.color;
  this.speedX = 0;
  this.speedY = 0;
  this.update =function(){
    currentx = +this.x + +250;
    currenty = +this.y + +250;
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

function UpdateGraph(){
  myGraphArea.clear();
  Axis.update();
  Robot.newPos();
  Robot.update();
}

function moveup(){
  Robot.speedY = +Robot.speedY - +1;
}

function movedown(){
  Robot.speedY = +Robot.speedY + +1;
}

function moveleft(){
  Robot.speedX = +Robot.speedX - +1;
}

function moveright(){
  Robot.speedX = +Robot.speedX + +1;
}

function clearmove() {
    Robot.speedX = 0;
    Robot.speedY = 0;
}
