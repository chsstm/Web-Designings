function OX(x,y,ch){
	this.centerx = x;
	this.centery = y+52;
	this.size = 500;

	this.update = function(){
		if(this.size>200){
			this.size-=50;
		}
	}

	this.show = function(){
		fill(color('rgb(255,0,0)'));
		noStroke();
		textSize(this.size);
		if(ch==='x'){
			text("x",this.centerx,this.centery);
		}else{
			text('o',this.centerx,this.centery);
		}
	}
}