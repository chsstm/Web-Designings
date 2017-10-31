var paddle;
var ball;
var playing = false;
var bricks = [];
var bWidth = 100;
var bHeight = 25;
var gap = 5;

function setup(){
	createCanvas(windowWidth,windowHeight);
	paddle = new Paddle();
	ball = new Ball();
	for(var i=0; i<floor(width/(bWidth+gap)); i++){
		for(var j=0; j<5; j++){	
			var padding = (width-(bWidth+gap)*floor(width/(bWidth+gap)))/2;
			var pos = createVector(i*bWidth+(i+1)*gap+padding,j*bHeight+(j+1)*gap+padding);
			bricks.push(new Brick(pos,bWidth,bHeight,color(random(100,200),random(100,200),random(100,200))));
		}
	}
}

function draw(){
	background(100);
	if(playing){
		ball.update();
		paddle.update(5);		
	}
	for(var i=bricks.length-1; i>=0; i--){
		bricks[i].show();
		if(bricks[i].hits(ball)){
			bricks.splice(i,1);
			ball.yv = -ball.yv;
		}
	}
	if(bricks.length==0){
		textAlign(CENTER,CENTER);
		textSize(50);
		fill(255,0,0);
		text("You win!",width/2,height/2);
		playing=false;
	}

	paddle.show();
	ball.show();
}

function keyPressed(){
	if(!playing){
		playing = true;
	}else{
		if(keyCode === LEFT_ARROW){
			paddle.movingLeft = true;
		}else if(keyCode === RIGHT_ARROW){
			paddle.movingRight = true;
		}
	}
}

function keyReleased(){	
	paddle.movingLeft = false;
	paddle.movingRight = false;
}
