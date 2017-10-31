var blob;
var blobs = [];

function setup(){
	createCanvas(windowWidth,windowHeight);
	blob = new Blob(width/2,height/2,20,color(0,200,0));
	for(var i=0; i<2000; i++){
		blobs.push(new Blob(random(-2*width,2*width),random(-2*height,2*height),random(5,10),color(random(100,200),random(100,200),random(100,200))));
	}
}

function draw(){
	background(255);
	translate(width/2-blob.pos.x,height/2-blob.pos.y);
	for(var i=blobs.length-1; i>=0; i--){
		blobs[i].show();
		if(blobs[i].hits(blob)){
			blob.size += blobs[i].size*.05;
			blobs.splice(i,1);
		}
	}
	blob.update();
	blob.show();
}