function Ball(){
	this.r = 10;
	this.xv = random(-4,4);
	this.yv = 4;
	this.pos = createVector(random(width/2-100,width/2+100),height/2);

	this.show = function(){
		fill(255,0,0);
		stroke(255,0,0);
		strokeWeight(2);
		ellipseMode(CENTER);
		ellipse(this.pos.x,this.pos.y,this.r*2, this.r*2);
	}

	this.update = function(){
		if(this.pos.x < this.r || this.pos.x+this.r > width){
			this.xv = -this.xv;
		}else if(this.pos.y < this.r ){
			this.yv = -this.yv;
		}else if(this.pos.y+this.r>paddle.pos.y-paddle.height/2){
			if(this.pos.x > paddle.pos.x-paddle.width/2 && this.pos.x < paddle.pos.x+paddle.width/2){
				this.yv = -this.yv;
			}else{
				location.reload();
			}
		}
		this.pos.x += this.xv;
		this.pos.y += this.yv;
	}

	this.hits = function(brick){
		if(dist(ball.pos.x,ball.pos.y,brick.pos.x,brick.pos.y) < brick.size/2+this.r){
			return true;
		}
		return false;
	}
}