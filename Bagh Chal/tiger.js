function Tiger(x,y,x1,y1){	
	this.pos=createVector(x1,y1);
	this.currentPos=createVector(x,y);
	this.r=20;
	this.active=false;
	this.speed=15;

	this.update = function(){
		if(this.pos.x!=this.currentPos.x){
			if(this.currentPos.x>this.pos.x){
				this.currentPos.x-=this.speed;
			}else{
				this.currentPos.x+=this.speed;
			}
		}
		if(this.pos.y!=this.currentPos.y){
			if(this.currentPos.y>this.pos.y){
				this.currentPos.y-=this.speed;
			}else{
				this.currentPos.y+=this.speed;
			}
		}
	}

	this.show = function(){
		if(this.active){
			noTint();
		}else{
			tint(200);		
		}
		imageMode(CENTER);
		image(tigerImg,this.currentPos.x,this.currentPos.y,30,30);
		// ellipse(this.currentPos.x,this.currentPos.y,2*this.r,2*this.r);
		// noStroke();
		// fill(255);
		// textSize(16);
		// textStyle(BOLD);
		// textAlign(CENTER,CENTER);
		// text("बाघ",this.currentPos.x,this.currentPos.y);
	}

	this.above = function(mx,my){
		if(mx>this.pos.x-this.r && mx<this.pos.x+this.r && my>this.pos.y-this.r && my<this.pos.y+this.r){
			return true;
		}else{
			return false;
		}
	}

	this.move = function(pos){
		this.pos=pos;
	}
}