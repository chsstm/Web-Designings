function InfoScreen(){
	let homeBtn;
	let info;

	this.setup = ()=>{
		homeBtn = createButton("&larr; Home").position(300,80);
		homeBtn.attribute("class","red");
		homeBtn.mousePressed(this.goHome);

		info = createElement("ol").position(windowWidth/2-250,250);
		info.child(createElement("li","Two players will play against eachother."));
		info.child(createElement("li","First player will start."));
		info.child(createElement("li","One gets to roll until player holds or rolls 1."));
		info.child(createElement("li","If player rolls 1 all score will be zero and turn passes."));
		info.child(createElement("li","If player holds score will be added to total and turn passes."));
		info.child(createElement("li","Player to reach 100 first in total will be the winner."));
	}

	this.draw = ()=>{
		fill(unhex("EB"),unhex("4D"),unhex("4D"));
		textAlign(CENTER,CENTER);
		textSize(36);
		text("HOW TO PLAY?",width/2,150);	
	}

	this.goHome = ()=>{
		this.hide();
		home();
	}

	this.hide = ()=>{
		homeBtn.remove();
		info.remove();
	}
}