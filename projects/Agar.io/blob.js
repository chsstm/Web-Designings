function Blob(x,y,size,color){
	this.pos = createVector(x,y);
	this.size = size;
	this.color = color;

	this.update = function(){
		var dir = createVector(mouseX-width/2,mouseY-height/2);
		dir.setMag(4);
		this.pos.add(dir);
	}

	this.show = function(){
		fill(this.color);
		stroke(255);
		strokeWeight(1);
		ellipse(this.pos.x,this.pos.y,2*this.size);
	}

	this.hits = function(blob){
		if(dist(this.pos.x,this.pos.y,blob.pos.x,blob.pos.y) <= blob.size+this.size){
			return true;
		}
		return false;
	}
}