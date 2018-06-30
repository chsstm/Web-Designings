function Ball(){
	this.r = 10;
	this.xv = random(-4,4);
	this.yv = 5;
	this.pos = createVector(width/2,height/2);

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
		}else if(this.pos.y+1.5*this.r>=paddle.pos.y-paddle.height/2){
			if(this.pos.x > paddle.pos.x-paddle.width/2 && this.pos.x < paddle.pos.x+paddle.width/2){
				var diff = this.pos.x-paddle.pos.x;
				angleMode(DEGREES);
				var angle = map(diff,-paddle.width/2,paddle.width/2,-135,-45);
				this.yv = 5*sin(angle);
				this.xv = 5*cos(angle);
			}else{
				location.reload();
			}
		}
		this.pos.x += this.xv;
		this.pos.y += this.yv;
	}
}