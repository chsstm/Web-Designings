function Pin(x,y){
	this.pos = createVector(x,y);
	this.topSize = 15;
	this.length = 60;
	this.topPos = createVector(0,this.length);
	this.speed = 5;
	this.angle = 0;

	this.show = ()=> {
		strokeWeight(2);
		stroke(0);
		push();
		translate(this.pos.x,this.pos.y);
		rotate(this.angle);
		line(0,0,this.topPos.x,this.topPos.y);
		fill(0)
		ellipse(this.topPos.x,this.topPos.y,this.topSize,this.topSize);
		pop();
	}

	this.update = ()=> {
		this.pos.y -= this.speed;
	}

	this.collide = (pins) => {
		pins.map((pin)=>{
			if(this.pos.x>pin.topPos.x-pin.topSize/2 && this.pos.x<pin.topPos.x+pin.topSize/2){
				if(this.pos.y>pin.topPos.y-pin.topSize/2 && this.pos.y<pin.topPos.y+pin.topSize/2){
					console.log('collided');
					return true;
				}
			}
		});
		return false;
	}

	this.hit = (target)=> {
		if(this.pos.y <= target.pos.y+target.size/2){
			return true;
		}
		return false;
	}
}