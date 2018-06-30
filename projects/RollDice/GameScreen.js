let dice1; let dice2; let dice3; let dice4; let dice5; let dice6;
let dice;

function preload(){
	dice1 = loadImage("images/dice-1.png");
	dice2 = loadImage("images/dice-2.png");
	dice3 = loadImage("images/dice-3.png");
	dice4 = loadImage("images/dice-4.png");
	dice5 = loadImage("images/dice-5.png");
	dice6 = loadImage("images/dice-6.png");
}

function switchDice(number){
	switch(number){
		case 1: dice = dice1; break;
		case 2: dice = dice2; break;
		case 3: dice = dice3; break;
		case 4: dice = dice4; break;
		case 5: dice = dice5; break;
		case 6: dice = dice6; break;
	}
}

function GameScreen(name1,name2){
	let player1;
	let player2;
	let turn = 1;
	let rolling;

	let rollBtn; let holdBtn; let homeBtn; let newBtn;

	let gameOver = false;

	this.player1Name = name1;
	this.player2Name = name2;

	this.setup = ()=>{
		homeBtn = createButton("Home").size(150,50).position(windowWidth/2-100,60).addClass("red");
		homeBtn.mousePressed(this.goHome);
		newBtn = createButton("New Game").size(150,50).position(windowWidth/2+100,60).addClass("red");
		newBtn.mousePressed(this.newGame);
		rollBtn = createButton("Roll Dice").position(windowWidth/2,windowHeight-120-80);
		rollBtn.mousePressed(this.startRoll);
		holdBtn = createButton("Hold Roll").position(windowWidth/2,windowHeight-120).addClass("red");
		holdBtn.mousePressed(this.hold);
		player1 = new Player(this.player1Name,0,0,width/2,height);
		player2 = new Player(this.player2Name,width/2,0,width/2,height);
		switchDice(Math.floor(random(1,6)));
	}

	this.draw = ()=>{
		if(turn === 1){
			player1.active = true;
			player2.active = false;
		}else{
			player1.active = false;
			player2.active = true;
		}
		player1.show();
		player2.show();
		if(!gameOver){
			this.showDice();
		}
	}

	this.showDice = ()=>{
		fill(0);
		rectMode(CENTER);
		rect(width/2,height/2,150,150,5);
		imageMode(CENTER);
		image(dice,width/2,height/2,135,135);
	}

	this.startRoll = ()=>{
		rollBtn.attribute("disabled","");
		switchDice(1);
		rolling = setInterval(function(){
			let suffle = Math.floor(random(2,6));
			switchDice(suffle);
		},100);
		setTimeout(this.diceRolled,1000);
	}

	this.diceRolled = ()=>{
		clearInterval(rolling);
		let rolled = Math.floor(random(1,6));
		switchDice(rolled);
		rollBtn.removeAttribute("disabled");
		if(rolled == 1){
			this.dead();
			return;
		}
		if(turn == 1){
			player1.addScore(rolled);
		}else{
			player2.addScore(rolled);
		}
	}

	this.dead = ()=>{
		if(turn == 1){
			player1.score = 0;
			this.hold();
		}else{
			player2.score = 0;
			this.hold();
		}
	}

	this.hold = ()=>{
		if(turn == 1){
			if(!player1.hold()){
				turn = 2;
			}
		}else{
			if(!player2.hold()){
				turn = 1;
			}
		}
	}

	this.newGame = ()=>{
		if(!gameOver){
			let reset = confirm("Do you want to reset?");
			if(!reset){
				return;
			}
			homeBtn.remove(); newBtn.remove(); rollBtn.remove(); holdBtn.remove();
		}else{
			homeBtn.remove();
			newBtn.remove();
		}
		player1.score = 0;
		player1.total = 0;
		player2.score = 0;
		player2.total = 0;
		turn = 1;
		gameOver = false;
		this.setup();
	}

	this.goHome = ()=>{
		if(!gameOver){
			let goHome = confirm("Do you want to exit?");
			if(!goHome){
				return;
			}
		}
		this.hide();
		home();
	}

	this.hide = ()=>{
		rollBtn.remove();
		holdBtn.remove();
		homeBtn.remove();
		newBtn.remove();
	}

	this.gameOver = ()=>{
		rollBtn.remove();
		holdBtn.remove();
		gameOver = true;
	}
}