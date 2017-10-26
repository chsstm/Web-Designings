function Cell(i,j,w){
	this.i=i;
	this.j=j;
	this.w=w;
	this.x=i*this.w;
	this.y=j*this.w;
	this.bee=false;
	this.marked=false;
	this.revealed=false;
	this.neighbourBee=0;

	this.show = function(){
		if(this.revealed){
			strokeWeight(1);
			stroke(10);
			fill(150);
			rect(this.x,this.y,this.w,this.w);
			if(this.bee){
				fill(255);
				rect(this.x,this.y,this.w,this.w);
				fill(255,0,0);
				textAlign(CENTER);
				textSize(50);
				text("*",this.x+.5*this.w,this.y+this.w+15);
			}else{
				if(this.neighbourBee!=0){					
					fill(0);
					textAlign(CENTER);
					textSize(25);
					text(this.neighbourBee,this.x+.5*this.w,this.y+this.w-5);
				}
			}
		}else{
			strokeWeight(1);
			stroke(10);
			fill(180);
			rect(this.x,this.y,this.w,this.w);
			if(this.marked){
				fill(255,0,0);
				var cc=createVector(this.x+.5*this.w,this.y+.5*this.w);
				stroke(255,0,0);
				strokeWeight(3);
				line(cc.x-7,cc.y-10,cc.x-7,cc.y+10);
				noStroke();
				triangle(cc.x-7,cc.y-10,cc.x+10,cc.y+5,cc.x-7,cc.y+5);		
			}
		}
	}

	this.clicked = function(x,y,btn){
		if(x>this.x && x<this.x+this.w && y>this.y && y<this.y+this.w){
			if(btn===LEFT && !this.marked){
				this.reveal();
				if(this.bee){
					for(var i=0; i<rows; i++){
						for(var j=0; j<cols; j++){
							if(!grid[i][j].marked){
								grid[i][j].revealed=true;
							}
						}
					}

					resetInterface();
				}
			}else if(btn===RIGHT){
				this.marked=!this.marked;
				if(this.bee && this.marked){
					minesFound++;
				}else if(this.bee && !this.marked){
					minesFound--;					
				}
			}
		}
	}

	this.reveal = function(){
		if(!this.marked){
			this.revealed=true;
		}
		if(this.neighbourBee==0){	
			this.floodFill();
		}
	}

	this.floodFill = function(){		
		for(var xoff=-1; xoff<=1; xoff++){
			for(var yoff=-1; yoff<=1; yoff++){
				var i=this.i+xoff;
				var j=this.j+yoff;
				if(i>=0 && i<cols && j>=0 && j<cols){
					var neighbour=grid[i][j];
					if(!neighbour.bee && !neighbour.revealed && !neighbour.marked){
						neighbour.reveal();
					}
				}	
			}
		}
	}

	this.countBee = function(){
		var total=0;
		for(var xoff=-1; xoff<=1; xoff++){
			for(var yoff=-1; yoff<=1; yoff++){
				var i=this.i+xoff;
				var j=this.j+yoff;
				if(i>=0 && i<cols && j>=0 && j<cols){
					if(grid[i][j].bee){
						total++;
					}
				}
			}
		}
		this.neighbourBee=total;
	}
}