var player;
var bullets = [];
var obstacles = [];
var screenWidth = 400;
var gridSize;
var shoot = false;
var sidePadding = 25;
var started = false;
var dead = false;
var paused = false;
var score = 0;

function setup() {
	createCanvas(screenWidth,windowHeight).position((windowWidth-screenWidth)/2,0);
	gridSize = (screenWidth-2*sidePadding)/5;
	player = new Player();
}

function draw() {
	background(200);
	if(started && !paused){		
		if(frameCount % 200 == 0){
			var vel = 2;
			for(var i=0; i<5; i++){
				var h = floor(random(20,100));
				obstacles.push(new Obstacle(((i+1)*gridSize)-(gridSize/2),-20,h,vel));
			}
		}
		for(var i=obstacles.length-1; i>=0; i--){
			obstacles[i].update();
			obstacles[i].show();
			if((obstacles[i].pos.y > height+gridSize) || obstacles[i].health<=0){
				obstacles.splice(i,1);
			}
			if(player.hitObstacle(obstacles[i])){
				dead = true;
				noLoop();
			}
			for(var j=bullets.length-1; j>=0; j--){
				if(obstacles[i].getHit(bullets[j])){
					score += 5;
					bullets.splice(j,1);
				}
			}
		}
		for(var i=bullets.length-1; i>=0; i--){
			bullets[i].update();
			bullets[i].show();
			if(bullets[i].pos.y < -2*bullets[i].size){
				bullets.splice(i,1);
			}
		}		
		player.update();
	}
	player.show();

	if(shoot && frameCount % 5 ==0){
		bullets.push(new Bullet(player.x,player.y));
	}
	status();
	scoreBoard();
}

function status(){
	noStroke();
	fill(200,10,10);
	textSize(60);
	textAlign(CENTER,CENTER);
	if(!started){
		text("Click to start!",width/2,height/2);
	}else if(paused){
		text("PAUSED!",width/2,height/2);
	}else if(dead){
		text("DEAD!",width/2,height/2);
	}
}

function scoreBoard(){	
	stroke(0);
	strokeWeight(4);
	fill(10,200,10);
	textSize(40);
	textAlign(CENTER,CENTER);
	text(score,width/2,100);
}

function mousePressed(){
	if(!started){
		started = true;
	}else if(started){
		shoot = true;
	}
}

function mouseReleased(){
	if(shoot){
		shoot = false;
	}
}

function keyPressed(){
	if(keyCode == ESCAPE && started){
		paused = !paused;
	}
}