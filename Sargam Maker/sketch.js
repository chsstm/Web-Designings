var song;
var fft;
var button;
var mic;

function preload(){
	//song=loadSound('peg.mp3');
}

// function togglesong(){
// 	if(song.isPlaying()){
// 		song.pause();
// 		button.html('Play');
// 	}else{
// 		song.play();
// 		button.html('Pause');
// 	}
//}

function setup() {
	createCanvas(1024,256);
	button=createButton('Pause');
	// button.mousePressed(togglesong);
	// button.style('cursor','pointer');
	// button.style('width','150px');
	// button.style('height','50px');
	// button.style('box-shadow','2px 2px 10px black');
	// button.position(10,300);
	// song.play();
	mic= new p5.AudioIn();
	mic.start();
	fft= new p5.FFT(0,16);
	fft.setInput(mic);
}

function draw() {
	background(51);
	var spectrum = fft.analyze();
	stroke(255);
	strokeWeight(9);
	for(var i=0; i<spectrum.length; i++){
		var amp = spectrum[i];
		var y=map(amp,0,256,height,0);
		line(i*10,height,i*10,y);
	}
}