function HomeScreen(){
	let target;
	this.setup = ()=> {
		target = new Target();
	}

	this.draw = ()=> {
		target.show();
		fill(200);
		noStroke();
		textSize(20);
		textAlign(CENTER,CENTER);
		text("Click to Start...",width/2,height-200);
	}
}