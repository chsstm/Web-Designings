function Ball(posx,posy){
	this.x=posx;
	this.y=posy;
	this.xv=0;
	this.yv=0;
	this.r=25;

	this.show = function(){
		noStroke();
		fill(0);
		ellipse(this.x,this.y,2*this.r,2*this.r);
	}

	this.update = function(){
		this.x+=this.xv;
		this.y+=this.yv;
	}

	this.reset = function(){
		this.x=posx;
		this.y=posy;
		this.xv=0;
		this.yv=0;
	}
}