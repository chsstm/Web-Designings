function Char(x,y,speed,first){
	this.pos = createVector(x,y);
	this.char = '';
	this.speed = speed;
	this.switchInterval = round(random(5,10));
	this.first = first;

	this.setChar = function(){
		if(frameCount % this.switchInterval == 0){
			this.char = String.fromCharCode(0x30A0 + round(random(0,96)));
		}
	}

	this.show = function(){
		this.update();
		if(this.first){
			fill(200,255,200);
		}else{
			fill(0,255,70);			
		}
		textAlign(CENTER,CENTER);
		text(this.char,this.pos.x,this.pos.y);
	}

	this.update = function(){
		this.setChar();
		this.pos.y = this.pos.y>=height? 0 : this.pos.y+=this.speed;
	}
}