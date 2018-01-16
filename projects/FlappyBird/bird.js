function Bird(){
	this.x = 70;
	this.y = height/2;
	this.size = 40;
	this.vel = 0;
	this.acc = .5;
	this.upForce = -7;

	this.show = function(){
		fill(255);
		noStroke();
		rectMode(CENTER)
		rect(this.x,this.y,this.size,this.size);
	}

	this.update = function(){
		this.vel += this.acc;
		this.y += this.vel;
	}

	this.jump = function(){
		this.vel = this.upForce;
	}

	this.isdead = function(){
		if(this.y>height-this.size/2){
			return true;
		}
	}
}