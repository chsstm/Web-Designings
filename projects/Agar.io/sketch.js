var classic,modern;
var classicBtn,modernBtn;
var gameType;

function setup(){
	createCanvas(windowWidth,windowHeight);
	classicBtn = createButton("Classic Agar.io");
	classicBtn.size(250,100);
	classicBtn.position(width/2-275,height/2);
	modernBtn = createButton("Advanced Agar.io");
	modernBtn.size(250,100);
	modernBtn.position(width/2+25,height/2);
	classicBtn.mouseClicked(setClassic);
	modernBtn.mouseClicked(setModern);
}

function hideAll(){
	classicBtn.remove();
	modernBtn.remove();
}

function setClassic(){
	hideAll();
	classic = new ClassicAgarIo();
	classic.setup();
	gameType = 'classic';
}

function setModern(){
	hideAll();
	modern = new ModernAgarIo();
	modern.setup();
	gameType = 'modern';
}

function draw(){
	background(0);
	if(gameType == 'classic'){
		classic.show();
	}else if(gameType == 'modern'){
		modern.show();
	}else{
		fill(200);
		textAlign(CENTER,CENTER);
		textSize(100);
		text("Agar.io",width/2,200);
	}
}