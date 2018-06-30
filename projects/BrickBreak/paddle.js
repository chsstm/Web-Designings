function Paddle(){
	this.width = 160;
	this.height = 20;
	this.movingLeft = false;
	this.movingRight = false;
	this.pos = createVector(width/2,height-20);


	this.show = function(){
		stroke(255);
		fill(255);
		rectMode(CENTER);
		rect(constrain(this.pos.x,this.width/2,width-this.width/2),this.pos.y,this.width,this.height);
	}

	this.update = function(step){
		if(this.movingLeft){
			if(this.pos.x > this.width/2){
				this.pos.x -= step;				
			}
		}else if(this.movingRight){
			if(this.pos.x+this.width/2 < width){
				this.pos.x  += step;				
			}
		}
	}
}