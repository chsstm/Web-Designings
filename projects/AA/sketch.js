let target;
let screenWidth = 400;
let screen = 1;
let homeScreen;
let playScreen;
function setup(){
	createCanvas(screenWidth,windowHeight).position((windowWidth-screenWidth)/2,0);
	homeScreen = new HomeScreen();
	homeScreen.setup();
	playScreen = new PlayScreen();
	playScreen.setup();
}

function draw(){
	background(100,100,200);
	switch(screen){
		case 1: homeScreen.draw(); break;
		case 2: playScreen.draw(); break;
	}
}

function mouseClicked(){
	if(screen === 1){
		screen = 2;
	}else if(screen === 2){
		playScreen.pins.push(new Pin(playScreen.pin.pos.x,playScreen.pin.pos.y));
	}
}