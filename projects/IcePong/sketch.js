var rsBtn;
var startBtn;
var lineThickness=10,topBorder=20,bottomBorder,leftBorder=300,rightBorder;
var yPluck,cPluck;
var ball;
var yScore=0,cScore=0;
var isPlaying=false;
var scoreText;

function setup() {
	createCanvas(windowWidth,windowHeight);
	bottomBorder=windowHeight/2+(windowHeight-40)/2;
	rightBorder=windowWidth/2+(windowWidth-40)/2;

	yPluck=new Pluck(leftBorder+20, windowHeight/2);
	cPluck=new Pluck(rightBorder-20, windowHeight/2);

	ball=new Ball((rightBorder+leftBorder)/2,windowHeight/2);

	startBtn = createButton('Start');
	startBtn.position(60,windowHeight/2-60);
	startBtn.size(200,50);
	startBtn.mousePressed(start);
	startBtn.id('startBtn');

	rsBtn = createButton('Restart');
	rsBtn.position(60,windowHeight/2);
	rsBtn.size(200,50);
	rsBtn.mousePressed(restart);

	scoreText = createP();
	scoreText.id('scoreText');
	scoreText.position(leftBorder,topBorder+100);
	scoreText.size((rightBorder-leftBorder)/2,40);
	scoreText.hide();
	
}

function draw() {
	background(200);
	board();
	yPluck.show();
	cPluck.show();
	ball.show();
	ball.update();

	if(isPlaying){
		if(keyIsDown(UP_ARROW)){
			if(yPluck.y>=topBorder+yPluck.height/2){
				yPluck.y-=5;
			}
		}else if(keyIsDown(DOWN_ARROW)){
			if(yPluck.y<=bottomBorder-yPluck.height/2){
				yPluck.y+=5;
			}
		}
	}

	if((ball.y-topBorder)<=ball.r || (bottomBorder-ball.y)<=ball.r){
		ball.yv=-ball.yv;
	}else if((ball.x-yPluck.x)<=(ball.r+yPluck.thick/2)){
		if(ball.y>=yPluck.y-yPluck.height/2-ball.r && ball.y<=yPluck.y+yPluck.height/2+ball.r){
			var diff = ball.y - yPluck.y;
			angleMode(DEGREES);
			var angle = map(diff,-yPluck.height/2,yPluck.height/2,-45,45);
			ball.yv = 7*sin(angle);
			ball.xv = 7*cos(angle);
		}else{
			cScore++;
			scoreText.html('Computer Scored!');
			scoreText.position((leftBorder+rightBorder)/2,topBorder);
			scoreText.show();
			scored();
		}
	}else if(ball.x+ball.r>=cPluck.x-cPluck.thick/2){
		if(ball.y>=cPluck.y-cPluck.height/2-ball.r && ball.y<=cPluck.y+cPluck.height/2+ball.r){
			var diff = ball.y - cPluck.y;
			angleMode(DEGREES);
			var angle = map(diff,-cPluck.height/2,cPluck.height/2,-45,45);
			ball.yv = 7*sin(angle);
			ball.xv = -7*cos(angle);
		}else{
			yScore++;
			scoreText.html('You Scored!');
			scoreText.position(leftBorder,topBorder);
			scoreText.show();
			scored();
		}
	}

	scoreBoard();

	AI();
}

function keyPressed(){
	if(!isPlaying){
		start();
	}
}

function start(){
	ball.xv=7;
	ball.yv=random(-5,5);
	document.getElementById('startBtn').disabled=true;
	isPlaying=true;
	scoreText.hide();
}

function restart(){
	location.reload();
}

function scored(){
	ball.reset();
	cPluck.reset();
	yPluck.reset();
	document.getElementById('startBtn').disabled=false;
	isPlaying=false;
}

function scoreBoard(){
	textAlign(CENTER);
	textSize(30);
	textStyle(BOLD);
	fill(0,0,200);
	var center=(20+leftBorder)/2;
	text("Your Score:",center,topBorder+100);
	text(yScore,center,topBorder+140);
	text("Computer Score:",center,bottomBorder-140);
	text(cScore,center,bottomBorder-100);
}

function AI(){
	cPluck.update();
}

function board(){	
	angleMode(RADIANS);
	strokeWeight(lineThickness);
	stroke(10,10,200);
	fill(255);
	rectMode(CENTER);
	rect(windowWidth/2,windowHeight/2,windowWidth-40,windowHeight-40);
	line(leftBorder,topBorder,leftBorder,bottomBorder);
	line((leftBorder+rightBorder)/2,topBorder,(leftBorder+rightBorder)/2,bottomBorder);
	ellipse((leftBorder+rightBorder)/2,windowHeight/2,200,200);
	noFill();
	arc(leftBorder,windowHeight/2,500,500,-HALF_PI,HALF_PI);
	arc(rightBorder,windowHeight/2,500,500,HALF_PI,-HALF_PI);
	fill(0,0,200);
	ellipse((leftBorder+rightBorder)/2,windowHeight/2,40,40);
	line(leftBorder+150,windowHeight/2-20,leftBorder+150,windowHeight/2+20);
	line(rightBorder-150,windowHeight/2-20,rightBorder-150,windowHeight/2+20);
}