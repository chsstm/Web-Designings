function HomeScreen(){
	let playBtn;
	let player1Field;
	let player2Field;
	let progressBar;
	let howBtn;
	
	this.setup = ()=>{
		howBtn = createButton("HOW TO PLAY?").position(windowWidth/2,180);
		howBtn.attribute("class","small-btn red");
		howBtn.mousePressed(this.showInfo)
		player1Field = createInput('').position(windowWidth/2,300);
		player1Field.attribute("spellcheck","false");
		player1Field.attribute("placeholder","Player 1");
		player1Field.input(this.firstName);
		player2Field = createInput('').position(windowWidth/2,355);
		player2Field.attribute("placeholder","Player 2");
		player2Field.attribute("spellcheck","false");
		player2Field.input(this.secondName);
		playBtn = createButton("ROLL NOW").position(windowWidth/2,windowHeight-230);
		playBtn.mousePressed(this.start);
	}

	this.draw = ()=>{
		fill(unhex("EB"),unhex("4D"),unhex("4D"));
		textAlign(CENTER,CENTER);
		textSize(56);
		text("ROLL THE DICE",width/2,100);	 	
	}

	this.start = ()=>{
		player1Field.attribute("disabled","");
		player2Field.attribute("disabled","");
		playBtn.attribute("disabled","");
		howBtn.attribute("disabled","");
		play();
	}

	this.showInfo = ()=>{
		player1Field.attribute("disabled","");
		player2Field.attribute("disabled","");
		playBtn.attribute("disabled","");
		howBtn.attribute("disabled","");
		info();		
	}

	this.newProgress = ()=>{
		progressBar = createElement('progress').position(windowWidth/2,250);
	}

	this.firstName = ()=>{
		name1 = player1Field.value().toUpperCase();
		player1Field.value(name1);
	}

	this.secondName = ()=>{
		name2 = player2Field.value().toUpperCase();
		player2Field.value(name2);
	}

	this.hide = ()=>{
		playBtn.remove();
		howBtn.remove();
		player1Field.remove();
		player2Field.remove();
		progressBar.remove();
	}
}