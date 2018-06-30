function ModernAgarIo(){
	this.head;
	this.size = 15;
	this.tail = [];
	this.score=0;
	this.blobs = [];

	this.setup = function(){
		this.head = new Blob(width/2,height/2,this.size,color(100,random(100,200),100));
		for(var i=0; i<2000; i++){
			this.blobs.push(new Blob(random(-2*width,2*width),random(-2*height,2*height),random(5,10),color(random(100,200),random(100,200),random(100,200))));
		}
	}

	this.show = function(){
		background(255);
		translate(width/2-this.head.pos.x,height/2-this.head.pos.y);
		for(var i=this.blobs.length-1; i>=0; i--){
			this.blobs[i].show();
			if(this.blobs[i].hits(this.head)){
				if(this.tail.length == 0){					
					this.tail.push(new Blob(this.head.pos.x,this.head.pos.y,this.size,this.blobs[i].color));
				}else{	
					this.tail.push(new Blob(this.tail[this.tail.length-1].pos.x,this.tail[this.tail.length-1].pos.y,this.size,this.blobs[i].color));
				}
				this.blobs.splice(i,1);
				this.score += this.blobs[i].size*.5;
			}
		}
		for(var i=this.tail.length-1; i>=0; i--){
			if(i==0){
				this.tail[i].pos = this.head.pos;
			}else{
				this.tail[i].pos = this.tail[i-1].pos;
			}
			this.tail[i].show();
		}
		this.head.update();
		this.head.show();
	}
}