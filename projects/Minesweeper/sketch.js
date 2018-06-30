var cw=601;
var w=30;
var cols,rows;
var grid;
var time;
var best;
var btn;
var timer=0;
var stopWatch;
var started=false;
var selector;
var mines=50;
var possiblePos=[];
var minesFound=0;

function make2DArray(r,c){
	var array=new Array(r);
	for(var i=0; i<c; i++){
		array[i]=new Array(c);
	}
	return array;
}

function interface(){

	best=createSpan('Minesweeper<br>&copy; CHSSTM');
	best.position((windowWidth-cw)/2-200,(windowHeight-cw)/2);
	best.size(150,60);

	selector=createSelect();
	selector.id('selector');
	selector.size(150,30);
	selector.position((windowWidth-cw)/2-200,(windowHeight-cw)/2+80);
	selector.option('Easy');
	selector.option('Intermediate');
	selector.option('Hard');
	selector.option('Expert');
	selector.changed(setLevel);

	btn=createButton('Start');
	btn.id('start');
	btn.position((windowWidth-cw)/2-200,(windowHeight-cw)/2+130);
	btn.size(150,60);
	btn.mousePressed(start);

	time=createP(timer);
	time.id('timeDiv');
	time.position((windowWidth-cw)/2-200,(windowHeight-cw)/2+210);
	time.size(150,60);
}

function setLevel(){
	switch(selector.value()){
		case 'Easy': mines=50; break;
		case 'Intermediate': mines=60; break;
		case 'Hard': mines=70; break;
		case 'Expert': mines=90; break;
		default: mines=50; break;
	}
}

function start(){
	started=true;
	document.getElementById('start').disabled=true;
	document.getElementById('selector').disabled=true;
	selectRandomBee();

	stopWatch=setInterval(function(){
		timer++;
	},1000);
}

function selectRandomBee(){
	for(var i=0; i<rows; i++){
		for(var j=0; j<cols; j++){
			grid[i][j].bee=false;
			grid[i][j].revealed=false;
			grid[i][j].marked=false;
		}
	}

	for(var i=0; i<mines; i++){
		var index=floor(random(possiblePos.length));
		var pos=possiblePos[index];
		grid[pos.x][pos.y].bee=true;
		possiblePos.splice(index,1);
	}

	for(var i=0; i<rows; i++){
		for(var j=0; j<cols; j++){
			grid[i][j].countBee();
		}
	}
}

function resetInterface(){	
	document.getElementById('start').disabled=false;
	document.getElementById('selector').disabled=false;
	timer=0;
	clearInterval(stopWatch);
	started=false;
}

function setup() {
	createCanvas(cw,cw).position((windowWidth-cw)/2,(windowHeight-cw)/2);
	cursor(HAND);

	cols=floor(cw/w);
	rows=floor(cw/w);
	grid=make2DArray(rows,cols);
	for(var i=0; i<rows; i++){
		for(var j=0; j<cols; j++){
			grid[i][j]=new Cell(i,j,w);
			possiblePos.push(createVector(i,j));
		}
	}

	interface();
}

function draw() {
	background(255);
	for(var i=0; i<rows; i++){
		for(var j=0; j<cols; j++){
			grid[i][j].show();
		}
	}
	if(mines==minesFound){
		if(started){
			alert("Congratulations! You cleared the mine Fields!");
		}
		resetInterface();
	}
	
	document.getElementById('timeDiv').innerHTML=timer;
}

function mousePressed(){
	if(started){	
		for(var i=0; i<rows; i++){
			for(var j=0; j<cols; j++){
				grid[i][j].clicked(mouseX,mouseY,mouseButton);
			}
		}
	}
}