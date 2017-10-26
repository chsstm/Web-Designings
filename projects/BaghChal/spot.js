function Spot(i,j){
	this.row=i;
	this.col=j;
	this.pos=createVector(this.col*(bSize/4)+topL,this.row*(bSize/4)+leftL);
	this.r=12;
	this.over=false;
	this.blank=true;

	this.show = function(){
		noStroke();
		if(this.over){
			fill(200);
		}else{
			fill(20);
		}
		ellipse(this.pos.x,this.pos.y,2*this.r,2*this.r);
	}

	this.above = function(mx,my){
		if(this.blank){
			if(mx>this.pos.x-this.r && mx<this.pos.x+this.r && my>this.pos.y-this.r && my<this.pos.y+this.r){
				this.over=true;
				return true;
			}else{
				this.over=false;
				return false;
			}
		}
	}
}