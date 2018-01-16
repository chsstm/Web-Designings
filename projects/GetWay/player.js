function Player(){
	this.size = gridSize-20;
	this.x = width/2;
	this.y = height - 100;

	this.show = function(){
		noStroke(0);
		fill(200,10,10);
		rectMode(CENTER);
		rect(this.x,this.y,this.size,this.size);
	}

	this.update = function(){
		this.x = constrain(mouseX,sidePadding+this.size/2,width-sidePadding-this.size/2);
	}

	this.hitObstacle = function(obstacle){
		if(this.x+this.size/2>=obstacle.pos.x-obstacle.size/2 && this.x-this.size/2<=obstacle.pos.x+obstacle.size/2){
			if(this.y-this.size/2 <= obstacle.pos.y+obstacle.size/2 && this.y+this.size/2 >= obstacle.pos.y-obstacle.size/2){
				return true;
			}
		}
	}
}