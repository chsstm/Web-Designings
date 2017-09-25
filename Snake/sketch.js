var head;
var tail;
var body=[];
var left,right,up,bottom;
var gameOver=false;
var scl=20;
var food;
var score=0;
var fr;
var paused=false;

function setup() {
	createCanvas(1240,630).position((windowWidth-width)/2,(windowHeight-height)/2);
	left=20;
	right=1220;
	up=15;
	bottom=615;
	head=new Part(left+floor(random(10,20))*20,up+floor(random(10,20))*20,'head');
	for(var i=0; i<3; i++){
		var part=new Part(head.pos.x-scl*i-20,head.pos.y,'body');
		body.push(part);
	}
	pickLocation();
}

function pickLocation(){
	var x=floor(random(50))*scl+left;
	var y=floor(random(30))*scl+up;
	food=createVector(x,y);

	if(x<left+10 || x>right-10 || y<up+40 || y>bottom-10){
		pickLocation();
	}

	if(x==head.pos.x & y==head.pos.y){
		pickLocation();
	}

	for(var i=0; i<body.length; i++){
		if(body[i].pos.x==x && body[i].pos.y==y){
			pickLocation();
		}
	}
}

function draw() {
	background(0);
	fr=8+score/10;
	frameRate(fr);
	board();

	if(head.strike()){
		gameOver=true;
	}

	for(var i=0; i<body.length; i++){
		body[i].show();
	}

	if(!gameOver && !paused){
		for(var i=body.length-1; i>0; i--){
			body[i].pos.x=body[i-1].pos.x;
			body[i].pos.y=body[i-1].pos.y;
		}

		body[0].pos.x=head.pos.x;
		body[0].pos.y=head.pos.y;
	}

	if(head.eat(food)){
		score++;
		pickLocation();
		var part=new Part(head.pos.x,head.pos.y,'body');
		body.push(part);
	}

	head.show();
	if(!gameOver && !paused){
		head.update();
	}
	
	status();

	//Print food
	ellipseMode(CORNER);
	noStroke();
	fill(0,150,0);
	ellipse(food.x,food.y,20,20);
}

function status(){
	stroke(10);
	strokeWeight(5);
	textSize(24);
	textAlign(CENTER,CENTER);

	if(paused){
		text("Paused!",width/2,height/2);
	}
	if(gameOver){
		text("Game Over!",width/2,height/2);
	}

}

function keyPressed(){
	if(keyCode===ESCAPE){
		paused=!paused;
	}
	if(!gameOver && !paused){
		if(keyCode===UP_ARROW){
			if(head.yspeed!=1){
				head.turn('up');
			}
		}else if(keyCode===DOWN_ARROW){
			if(head.yspeed!=-1){
				head.turn('down');
			}
		}else if(keyCode===LEFT_ARROW){
			if(head.xspeed!=1){
				head.turn('left');
			}
		}else if(keyCode===RIGHT_ARROW){
			if(head.xspeed!=-1){
				head.turn('right');
			}
		}
	}
}

function board(){
	rectMode(CORNER);
	noStroke();
	fill(255);
	rect(left,up,1200,600);
	fill(255);
	textSize(14);
	textStyle(BOLD);
	textAlign(CENTER,CENTER);
	text('Score :',width-400,7);
	text('Best :',width-250,7);
	text(score,width-350,7);
	text(localStorage.best,width-210,7);
	if(score>=localStorage.best){
		localStorage.best=487;
	}
}