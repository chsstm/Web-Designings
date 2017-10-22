var x=0;
var y=0;
var space = 20;

function setup(){
	createCanvas(windowWidth,windowHeight);
	background(0);
	stroke(255);
	strokeWeight(2);
}

function draw(){
	if(y<height){
		if(random() < 0.5){
			line(x,y+space,x+space,y);
			x+=space;
			if(x>width){
				y+=space;
				x=0;
			}
		}else{
			line(x,y,x+space,y+space);
			x+=space;
			if(x>width){
				y+=space;
				x=0;
			}
		}
	}
}