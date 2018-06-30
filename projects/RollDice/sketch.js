var screen = 1;
var homeScreen;
var infoScreen;
var gameScreen;
var name1 = "Player 1";
var name2 = "Player 2";

function setup(){	
	createCanvas(windowWidth-350,windowHeight-70).position(175,35);
	home();
}

function draw(){
	background(250);
	switch(screen){
		case 1:	homeScreen.draw(); break;
		case 2:	gameScreen.draw(); break;
		case 3:	infoScreen.draw(); break;
	}
}

function home(){
	screen = 1;
	homeScreen = new HomeScreen();
	homeScreen.setup();
}

function play(){
	homeScreen.newProgress();
	let time = random(1,3);
	setTimeout(()=>{
		homeScreen.hide();
		gameScreen = new GameScreen(name1,name2);
		gameScreen.setup();
		screen=2;	
	},time*1000);
}

function info(){
	homeScreen.newProgress();
	let time = random(1,3);
	setTimeout(()=>{
		homeScreen.hide();
		infoScreen = new InfoScreen();
		infoScreen.setup();
		screen = 3;
	},time*1000);
}