function Car(x,y,color,vel,dir){
	this.pos = createVector(x,y);
	this.vel = vel;
	this.size = 50;
	this.sameDir = dir;
	this.color = color;
	this.moveLeft = false;
	this.moveRight = false;
	this.hVel = 3;

	this.show = function(){
		rectMode(CENTER);
		fill(this.color);
		rect(this.pos.x,this.pos.y,this.size,this.size+10);
	}

	this.update = function(){
		if(this.moveRight && this.pos.x+this.size/2<rLimit){
			this.pos.x += this.hVel;
		}else if(this.moveLeft && this.pos.x-this.size/2>lLimit){
			this.pos.x -= this.hVel;
		}
	}

	this.move = function(){
		this.pos.y += this.vel;
	}
}