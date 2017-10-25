function Box(){
	this.xcenter=width/2;
	this.ycenter=height/2;
	this.thick=0;
	
	this.update = function(x,y,s){
		if(s==true){
			this.xcenter=x;
			this.ycenter=y;
			this.thick=5;
		}else{
			this.thick=0;
		}
	}

	this.show = function(){
		rectMode(CENTER);
		stroke(color('rgb(255,0,0)'));
		strokeWeight(this.thick);
		noFill();
		rect(this.xcenter,this.ycenter,120,120,10);
	}
}