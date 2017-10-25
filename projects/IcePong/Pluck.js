function Pluck(x,y){
	this.x=x;
	this.y=y;
	this.thick=20
	this.height=150;

	this.show = function(){
		stroke(255);
		strokeWeight(1);
		fill(255,0,0);
		rectMode(CENTER);
		rect(this.x,constrain(this.y,10+topBorder+this.height/2,bottomBorder-this.height/2-10),this.thick,this.height);
	}

	this.update = function(){
		if(ball.y<cPluck.y){
			cPluck.y-=.8*abs(ball.yv);
		}else if(ball.y>cPluck.y){
			cPluck.y+=.8*abs(ball.yv);
		}
	}

	this.reset = function(){
		this.x=x;
		this.y=y;
	}
}