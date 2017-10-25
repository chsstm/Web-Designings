function Brick(pos,size){
	this.size =  size;
	this.pos = pos;

	this.show = function(){
		rectMode(CENTER);
		noFill();
		strokeWeight(1);
		stroke(255,0,0);
		ellipse(this.pos.x,this.pos.y,this.size,this.size);
	}
}