function PlayScreen(){
	let target;
	let isDead = false;
	let score = 0;
	this.pin;
	this.pins = [];
	this.setup = ()=> {
		target = new Target();
		this.pin = new Pin(width/2,height-150);
	}	

	this.draw = ()=> {
		target.update();
		target.show();
		for(let pin of this.pins){
			pin.show();
			pin.update();

			if(pin.hit(target)){
				score++;
				let angle = (180-target.angle);			
				pin.pos.x = (target.size/2)*sin(angle);
				pin.pos.y = -target.size/2 + (target.size/2)*(1- cos(angle));
				pin.angle = target.angle>180? 180 - target.angle%180 : (180 - target.angle) + 180;
				target.pinnedPins.push(pin);
				let index = this.pins.indexOf(pin);
				this.pins.splice(index,1);
			}
		}
		this.pin.show();
		this.scoreBoard();
		if(isDead){
			noLoop();
		}
	}

	this.scoreBoard = () =>{
		textAlign(CENTER,CENTER);
		fill(200);
		textSize(28);
		text(score,target.pos.x,target.pos.y);
	}
}