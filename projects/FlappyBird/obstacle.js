function Obstacle(x){
	this.x = x;
	this.h = random((height/2)-150,(height/2)+50);
	this.gap = 120;
	this.vel = 1;
	this.width=20;

	this.show = function(){
		rectMode(CORNER);
		fill(255);
		rect(this.x,0,this.width,this.h);
		rectMode(CORNERS)
		rect(this.x,this.h+this.gap,this.x+this.width,height);
	}

	this.update = function(){
		this.x -= this.vel;
	}

	this.isGone = function(){
		if(this.x < -this.width){
			return true;
		}
	}

	this.crosses = function(bird){
		if(this.x==bird.x-bird.size){
			if(bird.y>0 && bird.y<height){				
				return true;
			}
		}
	}

	this.hit = function(bird){
		if(bird.y>0 && bird.y-bird.size/2<this.h) {
			if(Math.abs(this.x-bird.x)<=bird.size/2){
				return true;
			}
		}
		else if(bird.y+bird.size/2>this.h+this.gap){
			if(Math.abs(this.x-bird.x)<=bird.size/2){
				return true;
			}
		}
	}
}