function Bullet(x,y){
	this.pos = createVector(x,y);
	this.vel = 4;
	this.size = 10;

	this.show = function(){
		fill(0);
		ellipse(this.pos.x,this.pos.y,this.size);
	}

	this.update = function(){
		this.pos.y -= this.vel;
	}
}