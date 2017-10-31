function Brick(pos,wth,ht,color){
	this.pos = pos;
	this.width = wth;
	this.height = ht;
	this.color = color;

	this.show = function(){
		rectMode(CORNER);
		fill(this.color);
		noStroke();
		rect(this.pos.x,this.pos.y,this.width,this.height);
	}

	this.hits = function(ball){
		if(ball.pos.x+ball.r>this.pos.x && ball.pos.x-ball.r<this.pos.x+this.width){
			if(ball.pos.y+ball.r>this.pos.y && ball.pos.y-ball.r<this.pos.y+this.height){
				return true;
			}
		}
	}
}