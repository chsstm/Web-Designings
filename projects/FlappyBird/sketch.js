var bird;
var score = 0;
var obstacles=[];
var dead = false;
var screenWidth = 400;

function setup() {
	createCanvas(screenWidth,windowHeight).position((windowWidth-screenWidth)/2,0);
	bird = new Bird();
	obstacles.push(new Obstacle(width+10));
}

function draw() {
	background(51);
	if(frameCount%180==0){
		obstacles.push(new Obstacle(width+10));
	}
	bird.update();
	bird.show();
	for(var i=0; i<obstacles.length; i++){
		obstacles[i].update();
		obstacles[i].show();	
		if(obstacles[i].crosses(bird)){
			score++;
		}else if(obstacles[i].isGone()){
			obstacles.splice(i,1);
		}else if(obstacles[i].hit(bird)){
			dead = true;
			noLoop();
		}
	}
	if(bird.isdead()){
		dead = true;
		noLoop();
	}
	scoreBoard();
}

function scoreBoard(){
	fill(10,200,10);
	textSize(40);
	textStyle(BOLD);
	text(score,width/2,100);
	if(dead){
		fill(200,10,10);
		textStyle(BOLD);
		textAlign(CENTER,CENTER);
		text("You are dead!",width/2,height/2);
	}
}

function keyPressed(){
	if(keyCode == 32){
		bird.jump();
	}
}