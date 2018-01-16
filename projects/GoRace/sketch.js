var playerCar;
var road;
var score;
var highScore;
var screenWidth = 400;
var oCars = [];
var paused = false;
var started = false;
var dead = false;
var rLimit, lLimit;
var spawnRate = 100;

if(localStorage.grHS){
	highScore = localStorage.grHS;
}else{
	highScore = 0;
}

function setup() {
	createCanvas(screenWidth,windowHeight).position((windowWidth-screenWidth)/2,0);
	score = 0;
	playerCar = new Car(width/2,height-100,color(10,200,10),3,true);
	road = new Road();
	rLimit = width/2+150;
	lLimit = width/2-150;

}

function draw() {
	background(51);
	if(frameCount % spawnRate == 0){
		var c = color(10,random(50,200),random(50,200));
		oCars.push(new Car(random(lLimit+20,rLimit-20),-50,c,3,false));
		spawnRate--;
	}
	if(started && !paused && !dead){
		for(var i=0; i<oCars.length; i++){
			oCars[i].move();
			oCars[i].show();
			if(abs(oCars[i].pos.x-playerCar.pos.x)<=playerCar.size && abs(oCars[i].pos.y-playerCar.pos.y)<=playerCar.size){
				dead = true;
			}
		}
		road.update();
		playerCar.update();
		playerCar.show();
		score++;
		if(score>highScore){
			highScore = score;
			localStorage.grHS = highScore;
		}
	}
	if(started){		
		scoreBoard();		
	}
	status();
	road.show();
}

function scoreBoard(){
	fill(10,200,10);
	textSize(40);
	textStyle(BOLD);
	textAlign(CENTER,CENTER);
	text(score,width/2,100);
	fill(200,10,10);
	text(highScore,width/2,60);
}

function status(){
	textSize(40);
	if(dead){
		fill(200,10,10);
		textStyle(BOLD);
		textAlign(CENTER,CENTER);
		text("You crashed!",width/2,height/2);
	}else if(!started){
		fill(200,10,10);
		textStyle(BOLD);
		textAlign(CENTER,CENTER);
		text("START!",width/2,height/2);	
	}else if(paused){
		fill(200,10,10);
		textStyle(BOLD);
		textAlign(CENTER,CENTER);
		text("PAUSED!",width/2,height/2);		
	}
}

function keyPressed(){
	if(!started){
		started = true;
	}else if(keyCode == ESCAPE){
		paused = !paused;
	}else if(keyCode == RIGHT_ARROW){
		playerCar.moveRight = true;
	}else if(keyCode == LEFT_ARROW){
		playerCar.moveLeft = true;
	}
}

function keyReleased(){
	playerCar.moveLeft = false;
	playerCar.moveRight = false;
}