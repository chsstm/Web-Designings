function Board(){
	this.xmid=width/2;
	this.ymid=height/2;
	this.posx=185;
	this.dir=1;

	this.update = function(){
		if(this.dir==1){
			this.posx+=5;
		}else{
			this.posx-=5;
		}

		if(this.posx>=width-185){
			this.dir=-1;
		}else if(this.posx<=190){
			this.dir=1;
		}
	}

	this.show = function(){
		rectMode(CORNER);
		fill(255);
		textAlign(CENTER);
		textSize(50);
		noStroke();
		text("TTT- CHSSTM",this.posx,55);
		stroke(color('#0000FF'));
		strokeWeight(20);
		noFill();
		rect(0,0,width,height);
		noStroke();
		fill(color('rgb(0,0,255)'));
		rect(this.xmid-85,this.ymid-225,10,450);
		rect(this.xmid+75,this.ymid-225,10,450);
		rect(this.xmid-225,this.ymid-85,450,10);
		rect(this.xmid-225,this.ymid+75,450,10);
		fill(255);
		textSize(9);
		text('All rights are reserved. \u00A9 CHSSTM 2016.',windowWidth-100,windowHeight-2);
	}
}