function Obstacle(x,y,health,vel){
	this.pos = createVector(x+sidePadding,y);
	this.size = gridSize - 10;
	this.health = health;
	this.vel = vel;

	this.show = function(){
		fill(0);
		rectMode(CENTER,CENTER);
		rect(this.pos.x,this.pos.y,this.size,this.size);
		fill(255);
		textSize(14);
		textAlign(CENTER,CENTER);
		text(this.health,this.pos.x,this.pos.y);
	}

	this.update = function(){
		this.pos.y += this.vel;
	}

	this.getHit = function(bullet){
		if(bullet.pos.x>= this.pos.x-this.size/2 && bullet.pos.x<=this.pos.x+this.size/2){
			if(abs(bullet.pos.y-this.pos.y)<this.size/2){
				this.health -= 5;
				return true;
			}
		}
	}
}