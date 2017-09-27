var paddle;
var ball;
var wWidth=500;
var wHeight=500;
var playing = false;
var bricks = [];
function setup(){
	createCanvas(wWidth,wHeight).position((windowWidth-wWidth)/2,(windowHeight-wHeight)/2);
	paddle = new Paddle();
	ball = new Ball();
	for(var i=0; i<20; i++){
		var size = 20;
		var pos = createVector(random(50,width-50),random(50,height/2-50));
		if(random()>.2){
			size = 40;
		}else if(random()>.5){
			size = 80;
		}
		bricks.push(new Brick(pos,size));
	}
}

function draw(){
	background(100);
	paddle.show();
	ball.show();
	if(playing){
		ball.update();
		paddle.update(5);		
	}
	for(var i=0; i<bricks.length; i++){
		bricks[i].show();
		if(bricks[i].size<20){
			bricks.splice(i,1);
		}

		if(ball.hits(bricks[i])){
			bricks[i].size /=2;
			ball.yv = -ball.yv;
		}
	}
}

function keyPressed(){
	if(!playing){
		playing = true;
	}
	if(key === 'a' || key === 'A'){
		paddle.movingLeft = true;
	}else if(key === 'd' || key === 'D'){
		paddle.movingRight = true;
	}
}

function keyReleased(){	
	paddle.movingLeft = false;
	paddle.movingRight = false;
}
