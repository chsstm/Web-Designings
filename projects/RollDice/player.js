function Player(name,x,y,width,height){
	this.name = name;
	this.pos = createVector(x,y);
	this.width = width;
	this.height = height;
	this.total = 0;
	this.active = false;
	this.score = 0;
	this.winner = false;

	this.reset = function(){
		this.total = 0;
		this.active = false;
		this.score = 0;
	}

	this.show = function(){
		//Background
		rectMode(CORNER);
		noStroke();
		if(this.active){
			fill(220);
		}else{
			noFill();
		}
		rect(this.pos.x,this.pos.y,this.width,this.height);
		//Player Name
		fill(60);
		textAlign(CENTER,CENTER);
		textSize(36);
		text(this.name,this.pos.x+this.width/2,this.pos.y+120);
		//Active dot
		if(this.active){
			fill(0,200,0);
			ellipse(this.pos.x+this.width/2,this.pos.y+160,20);
		}
		//Score
		fill(unhex("EB"),unhex("4D"),unhex("4D"));
		textSize(150);
		let display;
		if(this.winner){
			textSize(100);
			display = 'Winner!';
		}else{
			display = this.score;
		}
		text(display,this.pos.x+this.width/2,height/2);
		//Total score
		rectMode(CENTER);
		fill(unhex("EB"),unhex("4D"),unhex("4D"));
		rect(this.pos.x+this.width/2,this.pos.y+480,150,80,5);
		fill(255);
		textSize(18);
		text("Total",this.pos.x+this.width/2,this.pos.y+460);
		textSize(36);
		text(this.total,this.pos.x+this.width/2,this.pos.y+495);
	}

	this.addScore = function(score){
		this.score += score;
	}

	this.hold = function(){
		this.total += this.score;
		this.score = 0;
		if(this.total>=10){
			gameScreen.gameOver();
			this.winner = true;
			return this.winner;
		}
	}
}