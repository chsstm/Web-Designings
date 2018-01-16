function Road(){
	this.leftL = [];
	this.rightL = [];
	this.gap = 20;
	this.lineV = 2;
	this.lineW = 10;
	this.lineH = 50;

	for(var i=0; i<4+(height/(this.lineH+this.gap)); i++){
		this.leftL.push(createVector(30,i*(this.lineH+this.gap)));
		this.rightL.push(createVector(width-this.lineW-30,i*(this.lineH+this.gap)));
	}
[i]
	this.show = function(){
		for(var i=0; i<this.leftL.length; i++){
			fill(251);
			rectMode(CORNER);
			rect(this.leftL[i].x,this.leftL[i].y,this.lineW,this.lineH);
			rect(this.rightL[i].x,this.rightL[i].y,this.lineW,this.lineH);
		}
	}

	this.update = function(){
		this.lineV = playerCar.vel;
		for(var i=0; i<this.leftL.length; i++){
			this.leftL[i].y += this.lineV;
			this.rightL[i].y += this.lineV;
			if(this.leftL[i].y>height){
				this.leftL[i].y -= this.leftL.length*(this.lineH+this.gap) - this.lineH - this.gap;
				this.rightL[i].y -= this.rightL.length*(this.lineH+this.gap) - this.lineH - this.gap;
			}
		}
	}
}