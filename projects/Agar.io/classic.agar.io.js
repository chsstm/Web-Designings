function ClassicAgarIo(){
	this.blob;
	this.score=0;
	this.blobs = [];

	this.setup = function(){
		this.blob = new Blob(width/2,height/2,20,color(0,200,0));
		for(var i=0; i<2000; i++){
			this.blobs.push(new Blob(random(-2*width,2*width),random(-2*height,2*height),random(5,10),color(random(100,200),random(100,200),random(100,200))));
		}
	}

	this.show = function(){
		background(255);
		translate(width/2-this.blob.pos.x,height/2-this.blob.pos.y);
		for(var i=this.blobs.length-1; i>=0; i--){
			this.blobs[i].show();
			if(this.blobs[i].hits(this.blob)){
				this.blob.size += this.blobs[i].size*0.05;
				this.score += this.blobs[i].size*.5;
				this.blobs.splice(i,1);
			}
		}
		this.blob.update();
		this.blob.show();
	}
}