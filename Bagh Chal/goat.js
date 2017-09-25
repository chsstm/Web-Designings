function Goat(x,y){
	this.currentPos=createVector(x,y);
	this.pos=createVector(x,y);
	this.r=18;
	this.active=false;
	this.dead=false;
	this.speed=10;

	this.update = function(){
		if(this.dead){
			if(this.r>0){
				this.r--;
			}
		}
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
		fill(100,100,200);
		if(this.active){
			strokeWeight(4);
			stroke(0,200,0);
		}else{
			noStroke();			
		}
		ellipse(this.currentPos.x,this.currentPos.y,2*this.r,2*this.r);
		noStroke();
		fill(255);
		textSize(12);
		textStyle(BOLD);
		textAlign(CENTER,CENTER);
		if(!this.dead){
			text("बाख्रा",this.currentPos.x,this.currentPos.y);
		}
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