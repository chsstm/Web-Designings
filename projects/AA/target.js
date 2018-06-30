function Target(){
	this.pos = createVector(width/2,150);
	this.size = 100;
	this.top = createVector(this.pos.x,this.pos.y-this.size/2);
	this.angle = 0;
	this.speed = 2;
	this.pinnedPins = [];
	
	this.show = ()=> {
		fill(0);
		push();
		translate(this.pos.x,this.pos.y);
		angleMode(DEGREES);
		rotate(this.angle);
		ellipse(0,0,this.size,this.size);
		this.pinnedPins.map((pin)=>{
			pin.show();
		}) 
		pop();
	}

	this.update = ()=> {
		this.angle += this.speed;
		this.angle %= 360;
	}
}