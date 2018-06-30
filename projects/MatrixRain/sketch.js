var streams = [];
var textsize = 25;

function setup(){
	createCanvas(windowWidth,windowHeight);
	textSize(textsize);
	for(var i=0; i<width; i+=textsize){
		var stream = new Stream();
		stream.makeString(i,random(-1000,0));
		streams.push(stream);
	}
}

function draw(){
	background(0,150);
	streams.forEach(function(stream){
		stream.show();
	});
}