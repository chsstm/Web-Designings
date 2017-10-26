function Button(type,value,i,j,w,h){
	this.type=type;
	this.value=value;
	this.i=i;
	this.j=j;
	this.w=w;
	this.h=h;
	this.color=200;
	this.xpos=this.i*this.w+10;
	this.ypos=this.j*this.h+190;
	if(this.value=="="){		
		this.ypos=this.j*this.w+190;
	}

	this.show = function(){
		stroke(51);
		strokeWeight(2);
		fill(this.color);
		rect(this.xpos,this.ypos,this.w,this.h);
		noStroke();
		textSize(30);
		textAlign(CENTER,CENTER);
		fill(0);
		textStyle(BOLD);
		if(this.value=='='){
			text(this.value,this.xpos+this.w*.5,this.ypos+this.h*.5);
		}else{
			text(this.value,this.xpos+this.w*.5,this.ypos+this.h*.5);
		}
	}

	this.clicked = function(x,y){
		return (x>this.xpos && x<this.xpos+this.w && y>this.ypos && y<this.ypos+this.h);
	}

	this.over = function(x,y){
		if (x>this.xpos && x<this.xpos+this.w && y>this.ypos && y<this.ypos+this.h){
			this.color=150;
			return true;
		}else{
			this.color=200;
			return false;
		}
	}
}