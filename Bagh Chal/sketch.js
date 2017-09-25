var leftL=topL=30;
var rows=cols=5;
var bSize=600;
var spots=[];
var paths=[];
var turn=1;
var goatDPos,tigerDPos;
var goats=[],tigers=[];
var gameOver=false;
var goatEaten=0;
var outGoat=20;
var aGoat=aTiger=null;
var winner;
var gameOn=false;
var players;
var startBtn1,startBtn2,replayBtn;

function make2DArray(r,c){
	var array=new Array(c);
	for(var i=0; i<r; i++){
		array[i]=new Array(r);
	}
	return array;
}

function startGame1(){
	// players=1;
	// gameOn=true;
	// alert("बाघकाे खेल 'COMPUTER'ले खेल्नेछ।");
	// document.getElementById('startBtn1').disabled=true;
	// document.getElementById('startBtn2').disabled=true;
}

function startGame2(){
	players=2;
	gameOn=true;
	document.getElementById('startBtn1').disabled=true;
	document.getElementById('startBtn2').disabled=true;
}

function replay(){
	location.reload();
}

function gameOverNow(w){
	winner=w;
	gameOver=true;
	replayBtn.show();
	startBtn1.hide();
	startBtn2.hide();
}

function setup() {
	createCanvas(1060,660).position((windowWidth-width)/2,(windowHeight-height)/2);
	goatDPos=createVector(bSize+50+2*leftL,250);
	tigerDPos=createVector(330,330);
	spots=make2DArray(rows,cols);
	startBtn1=createButton("Start Game (Single Player)").position(bSize+100+(windowWidth-width)/2+2*leftL,110);
	startBtn1.size(200,50);
	startBtn1.id('startBtn1');
	startBtn2=createButton("Start Game (Two Players)").position(bSize+100+(windowWidth-width)/2+2*leftL,170);
	startBtn2.size(200,50);
	startBtn2.id('startBtn2');
	replayBtn=createButton("Play Again!").position(bSize+100+(windowWidth-width)/2+2*leftL,110);
	replayBtn.size(200,110);
	replayBtn.id('replayBtn');
	replayBtn.hide();

	replayBtn.mousePressed(replay);
	startBtn1.mousePressed(startGame1);
	startBtn2.mousePressed(startGame2);

	for(var i=0; i<rows; i++){
		for(var j=0; j<cols; j++){			
			spots[i][j]=new Spot(i,j);
		}
	}

	for(var i=0; i<outGoat; i++){
		var goat=new Goat(goatDPos.x,goatDPos.y);
		goats.push(goat);
	}
	for(var i=0; i<2; i++){
		for(var j=0; j<2; j++){
			var tiger=new Tiger(tigerDPos.x,tigerDPos.y,spots[i*4][j*4].pos.x,spots[i*4][j*4].pos.y);
			tigers.push(tiger);
		}
	}

	//paths
	for(var i=0; i<rows; i++){
		for(var j=0; j<cols-1; j++){
			paths.push(new Path(spots[i][j].pos.x,spots[i][j].pos.y,spots[i][j+1].pos.x,spots[i][j+1].pos.y));
		}
	}
	for(var i=0; i<rows-1; i++){
		for(var j=0; j<cols; j++){
			paths.push(new Path(spots[i][j].pos.x,spots[i][j].pos.y,spots[i+1][j].pos.x,spots[i+1][j].pos.y));
		}
	}
	for(var i=0; i<rows-1; i++){
		for(var j=0; j<cols-1; j++){
			if(i==j){
				paths.push(new Path(spots[i][j].pos.x,spots[i][j].pos.y,spots[i+1][j+1].pos.x,spots[i+1][j+1].pos.y));
			}
		}
	}
	for(var i=0; i<4; i++){
		var last=rows-1;
		paths.push(new Path(spots[i][last-i].pos.x,spots[i][last-i].pos.y,spots[i+1][last-i-1].pos.x,spots[i+1][last-i-1].pos.y));
	}
	paths.push(new Path(spots[0][2].pos.x,spots[0][2].pos.y,spots[1][1].pos.x,spots[1][1].pos.y));
	paths.push(new Path(spots[1][1].pos.x,spots[1][1].pos.y,spots[2][0].pos.x,spots[2][0].pos.y));
	paths.push(new Path(spots[2][0].pos.x,spots[2][0].pos.y,spots[3][1].pos.x,spots[3][1].pos.y));
	paths.push(new Path(spots[3][1].pos.x,spots[3][1].pos.y,spots[4][2].pos.x,spots[4][2].pos.y));
	paths.push(new Path(spots[4][2].pos.x,spots[4][2].pos.y,spots[3][3].pos.x,spots[3][3].pos.y));
	paths.push(new Path(spots[3][3].pos.x,spots[3][3].pos.y,spots[2][4].pos.x,spots[2][4].pos.y));
	paths.push(new Path(spots[2][4].pos.x,spots[2][4].pos.y,spots[1][3].pos.x,spots[1][3].pos.y));
	paths.push(new Path(spots[1][3].pos.x,spots[1][3].pos.y,spots[0][2].pos.x,spots[0][2].pos.y));

}

function draw() {
	background(255);
	cursor(ARROW);
	status();
	for(var i=0; i<paths.length; i++){
		paths[i].show();
	}
	for(var i=0; i<rows; i++){
		for(var j=0; j<cols; j++){
			spots[i][j].show();
		}
	}
	if(gameOn){
		for(var i=0; i<goats.length; i++){			
			if(goats[i].dead){
				goats.splice(i,1);
			}
		}
		for(var i=0; i<goats.length; i++){
			goats[i].show();
			goats[i].update();
		}
		for(var i=0; i<4; i++){
			tigers[i].show();
			tigers[i].update();
		}
		if(!gameOver){
			checkSpots();
			hovers();
		}
		if(goatEaten==5){
			gameOverNow('tigers');
		}else if(tigersCantMove()){
			gameOverNow('goats');
		}
	}
}

function changeTurn(){
	if(turn){
		turn=0;
	}else{
		turn=1;
	}
}

function tigersCantMove(){
	for(var i=0; i<rows; i++){
		for(var j=0; j<cols; j++){
			if(spots[i][j].blank){
				for(var k=0; k<tigers.length; k++){
					if(hasPath(tigers[k].pos,spots[i][j].pos) || canEat(tigers[k].pos,spots[i][j].pos)!=false){
						return false;
					}
				}
			}
		}
	}
	return true;
}

function status(){
	//Title
	noStroke();
	fill(0);
	textStyle(BOLD);
	textSize(35);
	textAlign(CENTER,CENTER);
	text("नेपाली बाघचाल",bSize+200+2*leftL,60);
	//Information
	if(gameOn){
		textAlign(LEFT,CENTER);
		textSize(25);
		text("राख्न बाँकी बाख्राहरू : "+outGoat,bSize+100+leftL,250);
		text("मरेका बाख्राहरू : "+goatEaten,bSize+100+leftL,300);
		textAlign(CENTER,CENTER);
		fill(200,0,0);
		textSize(35);
		if(!gameOver){
			if(turn){
				text("बाख्राकाे पालाे",bSize+200+2*leftL,350);
			}else{
				text("बाघकाे पालाे",bSize+200+2*leftL,350);
			}
		}else{
			textAlign(CENTER,TOP);
			if(winner=='goats'){
				text("सबै बाघ थुनिए\nबाख्राकाे जित भयाे।",bSize+200+2*leftL,350);			
			}else{
				text("पाँच बाख्रा मारिए\nबाघकाे जित भयाे।",bSize+200+2*leftL,350);
			}
		}
	}

	//Developer Info
	fill(200,0,0);
	noStroke();
	textAlign(CENTER,CENTER);
	textSize(18);
	text("Developer\n\nनाम :- साइमाेन ठाडा मगर\nइमेल :- magarchsstm@gmail.com\nठेगाना :- रामपुर नगरपालिका-४, खाेप्टार",bSize+200+2*leftL,height-100);		
	//Rectangle
	noFill();
	rectMode(CENTER);
	stroke(0);
	strokeWeight(4);
	rect(bSize+200+2*leftL,55,350,50);
	rect(bSize+200+2*leftL,height/2,350,height-2*topL);
}

function hovers(){	
	for(var i=0; i<rows; i++){
		for(var j=0; j<cols; j++){
			if(spots[i][j].above(mouseX,mouseY)){
				if(spots[i][j].blank){
					cursor(HAND);
					return 0;
				}else{
					cursor(ARROW);
				}
			}
		}
	}
	for(var i=0; i<goats.length; i++){
		if(turn){
			if(goats[i].above(mouseX,mouseY)){
				cursor(HAND);
				return 0;
			}else{
				cursor(ARROW);
			}
		}
	}
	if(players==2){
		for(var i=0; i<tigers.length; i++){
			if(!turn){
				if(tigers[i].above(mouseX,mouseY)){
					cursor(HAND);
					return 0;
				}else{
					cursor(ARROW);
				}
			}
		}
	}
}

function checkSpots(){
	for(var i=0; i<rows; i++){
		for(var j=0; j<cols; j++){
			spots[i][j].blank=true;
		}
	}
	for(var i=0; i<tigers.length; i++){
		var x=floor((tigers[i].pos.x-leftL)/(bSize/4));
		var y=floor((tigers[i].pos.y-topL)/(bSize/4));
		spots[y][x].blank=false;
	}
	for(var i=0; i<goats.length; i++){
		if(goats[i].pos.x<=bSize+leftL){
			var x=floor((goats[i].pos.x-leftL)/(bSize/4));
			var y=floor((goats[i].pos.y-topL)/(bSize/4));
			spots[y][x].blank=false;
		}
	}
}

function hasPath(pos1,pos2){
	for(var i=0; i<paths.length; i++){
		if((paths[i].point1.x==pos1.x && paths[i].point1.y==pos1.y && paths[i].point2.x==pos2.x && paths[i].point2.y==pos2.y)||(paths[i].point1.x==pos2.x && paths[i].point1.y==pos2.y && paths[i].point2.x==pos1.x && paths[i].point2.y==pos1.y)){
			return true;
		}
	}
	return false;
}

function canEat(pos1,pos2){
	if(abs(pos1.x-pos2.x)>=bSize/2 || abs(pos1.y-pos2.y)>=bSize/2){
		var midx=(pos1.x+pos2.x)/2;
		var midy=(pos1.y+pos2.y)/2;
		var x=(midx-leftL)/(bSize/4);
		var y=(midy-topL)/(bSize/4);
		if(midx%leftL==0 && midy%topL==0){
			if(spots[y][x].blank){
				return false;
			}else{
				if(hasPath(createVector(midx,midy),pos2)){
					for(var i=0; i<goats.length; i++){
						if(goats[i].pos.x==midx && goats[i].pos.y==midy){
							return goats[i];
						}
					}
				}
			}
		}
	}
	return false;
}

function mousePressed(){	
	if(!gameOver && gameOn){
		for(var i=0; i<rows; i++){
			for(var j=0; j<cols; j++){
				if(spots[i][j].above(mouseX,mouseY)){
					if(spots[i][j].blank==true){
						if(turn){
							if(outGoat>0){
								goats[outGoat-1].pos=spots[i][j].pos;
								spots[i][j].over=false;
								outGoat--;
								changeTurn();
							}else{
								if(aGoat!=null){
									if(hasPath(goats[aGoat].pos,spots[i][j].pos)){
										goats[aGoat].move(spots[i][j].pos);
										spots[i][j].over=false;
										goats[aGoat].active=false;
										aGoat=null;	
										changeTurn();
									}
								}				
							}
						}else{
							if(aTiger!=null){
								if(hasPath(tigers[aTiger].pos,spots[i][j].pos)){									
									tigers[aTiger].move(spots[i][j].pos);
									tigers[aTiger].active=false;
									aTiger=null;
									changeTurn();
									break;
								}
								if(canEat(tigers[aTiger].pos,spots[i][j].pos)){
									canEat(tigers[aTiger].pos,spots[i][j].pos).dead=true;
									canEat(tigers[aTiger].pos,spots[i][j].pos).r=25;
									goatEaten++;
									tigers[aTiger].move(spots[i][j].pos);
									tigers[aTiger].active=false;
									aTiger=null;
									changeTurn();									
								}
							}
						}
					}
				}
			}
		}
		if(aGoat==null || aTiger==null){
			if(turn==1){
				if(outGoat==0){	
					if(aGoat!=null){
						for(var i=0; i<goats.length; i++){
							if(goats[i].above(mouseX,mouseY)){
								for(var j=0; j<goats.length; j++){
									goats[j].active=false;
								}
								goats[i].active=true;
								aGoat=i;
								break;
							}
						}
					}else{
						for(var i=0; i<goats.length; i++){
							if(goats[i].above(mouseX,mouseY)){
								goats[i].active=true;
								aGoat=i;
								break;
							}
						}
					}
				}
			}else{
				if(aTiger!=null){
					for(var i=0; i<tigers.length; i++){
						if(tigers[i].above(mouseX,mouseY)){
							for(var j=0; j<tigers.length; j++){
								tigers[j].active=false;
							}
							tigers[i].active=true;
							aTiger=i;
						}
					}
				}else{
					for(var i=0; i<tigers.length; i++){
						if(tigers[i].above(mouseX,mouseY)){
							tigers[i].active=true;
							aTiger=i;
							break;
						}
					}
				}
			}
		}
	}
}