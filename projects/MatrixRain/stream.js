function Stream(){
	this.characters = [];
	this.totalChar = round(random(5,20));
	this.speed = random(5,10);

	this.makeString = function(x,y){
		var first = round(random(0,3)) == 1? true:false;
		for(var i=0; i<this.totalChar; i++){
			this.characters.push(new Char(x,y,this.speed,first));
			y -= textsize;
			first = false;
		}
	}

	this.show = function(){
		this.characters.forEach(function(char){
			char.show();
		});
	}
}