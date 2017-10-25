function Part(px,py,t){
	this.pos=createVector(px,py);
	this.xspeed=1;
	this.yspeed=0;
	this.type=t;

	this.show = function(){
		if(this.type=='head'){
			fill(230,0,0);
			noStroke();
			rectMode(CORNER);
			rect(this.pos.x,this.pos.y,20,20,7);	
			fill(255);
			stroke(0);
			strokeWeight(2);
			ellipseMode(CENTER);
			ellipse(this.pos.x+6,this.pos.y+2,4,6);
			ellipse(this.pos.x+14,this.pos.y+2,4,6);
			stroke(0);
			strokeWeight(4);
			line(this.pos.x+7,this.pos.y+13,this.pos.x+13,this.pos.y+13)		
		}else if(this.type=='tail'){

		}else{
			fill(0,0,200);
			noStroke();
			rectMode(CORNER);
			rect(this.pos.x,this.pos.y,20,20,7);
		}
	}

	this.update = function(){
		if(this.type=='head'){
			this.pos.x+=this.xspeed*scl;
			this.pos.y+=this.yspeed*scl;

			for(var i=0; i<body.length; i++){
				if(this.pos.x==body[i].pos.x && this.pos.y==body[i].pos.y){
					gameOver=true;
				}
			}
		}
	}

	this.turn = function(side){
		switch(side){
			case 'up': this.xspeed=0; this.yspeed=-1; break;
			case 'down': this.xspeed=0; this.yspeed=1; break;
			case 'left': this.xspeed=-1; this.yspeed=0; break;
			case 'right': this.xspeed=1; this.yspeed=0; break;
		}
	}

	this.eat = function(food){
		if(this.pos.x==food.x && this.pos.y==food.y){
			return true;
		}
		return false;
	}

	this.strike = function(){
		if((this.pos.x-10<=left && this.xspeed==-1) || 
			(this.pos.x+20>=right-5 && this.xspeed==1) || 
			(this.pos.y-10<=up+5 && this.yspeed==-1) || 
			(this.pos.y+20>=bottom-5 && this.yspeed==1)){
			this.xspeed=0;
			this.yspeed=0;
			return true;
		}
		return false;
	}
}