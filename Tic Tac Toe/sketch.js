var board;
var rbox;
var x,y;
var ox=[];
var moves=[];
var turn=1;
var game='on';
var winner;
var dtext;

var player1;
var player2;

function setup() {
	createCanvas(windowWidth,windowHeight);
	board = new Board();
	rbox = new Box();
	dtext = new Text();
	player1=prompt("Enter The Name Of Player 1:");
	player2=prompt("Enter The Name Of Player 2:");
	if(player1=="" || player2=="" || player1==null || player2==null){
		player1='Player 1';
		player2='Player 2';
	}
}

function draw() {
	background(50);
	cursor(HAND);
	board.update();
	board.show();
	rbox.show();
	dtext.update(turn,winner);
	dtext.show();
	for(var i=0; i<ox.length; i++){
		ox[i].update();
	}
	for(var i=0; i<ox.length; i++){
		ox[i].show();
	}
}

function mouseClicked(){
	if(game==='on'){
		var c=0;
		var place=0;
		var x,y;
		var cx=width/2, cy=height/2;

		if(mouseX>cx-235 && mouseX<cx-85 && mouseY>cy-235 && mouseY<cy-85){
			x=cx-160; y=cy-160;
			place=1;
		}else if(mouseX>cx-75 && mouseX<cx+75 && mouseY>cy-235 && mouseY<cy-85){
			x=cx; y=cy-160;
			place=2;
		}else if(mouseX>cx+85 && mouseX<cx+235 && mouseY>cy-235 && mouseY<cy-85){
			x=cx+160; y=cy-160;
			place=3;
		}else if(mouseX>cx-235 && mouseX<cx-85 && mouseY>cy-75 && mouseY<cy+75){
			x=cx-160; y=cy;
			place=4;
		}else if(mouseX>cx-75 && mouseX<cx+75 && mouseY>cy-75 && mouseY<cy+75){
			x=cx; y=cy;
			place=5;
		}else if(mouseX>cx+85 && mouseX<cx+235 && mouseY>cy-75 && mouseY<cy+75){
			x=cx+160; y=cy;
			place=6;
		}else if(mouseX>cx-235 && mouseX<cx-85 && mouseY>cy+85 && mouseY<cy+235){
			x=cx-160; y=cy+160;
			place=7;
		}else if(mouseX>cx-85 && mouseX<cx+85 && mouseY>cy+85 && mouseY<cy+235){
			x=cx; y=cy+160;
			place=8;
		}else if(mouseX>cx+85 && mouseX<cx+235 && mouseY>cy+85 && mouseY<cy+235){
			x=cx+160; y=cy+160;
			place=9;
		}else{
			place==0;
		}

		checkPA(x,y,place);		
		checkGame();
	}
}

function mouseMoved(){
	var cx=width/2;
	var cy=height/2;

	if(game==='on'){	
		if(mouseX>cx-235 && mouseX<cx-85 && mouseY>cy-235 && mouseY<cy-85){
			rbox.update(cx-160,cy-160,true);
		}else if(mouseX>cx-75 && mouseX<cx+75 && mouseY>cy-235 && mouseY<cy-85){
			rbox.update(cx,cy-160,true);
		}else if(mouseX>cx+85 && mouseX<cx+235 && mouseY>cy-235 && mouseY<cy-85){
			rbox.update(cx+160,cy-160,true);
		}else if(mouseX>cx-235 && mouseX<cx-85 && mouseY>cy-75 && mouseY<cy+75){
			rbox.update(cx-160,cy,true);
		}else if(mouseX>cx-75 && mouseX<cx+75 && mouseY>cy-75 && mouseY<cy+75){
			rbox.update(cx,cy,true);
		}else if(mouseX>cx+85 && mouseX<cx+235 && mouseY>cy-75 && mouseY<cy+75){
			rbox.update(cx+160,cy,true);
		}else if(mouseX>cx-235 && mouseX<cx-85 && mouseY>cy+85 && mouseY<cy+235){
			rbox.update(cx-160,cy+160,true);
		}else if(mouseX>cx-85 && mouseX<cx+85 && mouseY>cy+85 && mouseY<cy+235){
			rbox.update(cx,cy+160,true)
		}else if(mouseX>cx+85 && mouseX<cx+235 && mouseY>cy+85 && mouseY<cy+235){
			rbox.update(cx+160,cy+160,true);
		}else{
			rbox.update(0,0,false);
		}	
	}else{
		rbox.update(0,0,false);  	
	}
}

function checkPA(x,y,cNum){
	var count=0;
	if(cNum!=0){
		for(var i=0; i<moves.length; i++){
			if(cNum==moves[i]){
				count++;
			}
		}		

		if(count==0){
			moves.push(cNum);
			if(turn==1){
				ox.push(new OX(x,y,'x'));
				turn=2;
			}else{
				ox.push(new OX(x,y,'o'));
				turn=1;
			}
		}else{
			alert("Place is already taken! Choose another place!");
		}
	}
}

function checkGame(){
	if(moves.length>=9){
		game='draw';
		winner=null;
	}

	var c1=checkLine(1,2,3);
	var c2=checkLine(4,5,6);
	var c3=checkLine(7,8,9);
	var c4=checkLine(1,4,7);
	var c5=checkLine(2,5,8);
	var c6=checkLine(3,6,9);
	var c7=checkLine(1,5,9);
	var c8=checkLine(3,5,7);

	if(c1==='p2'||c2==='p2'||c3==='p2'||c4==='p2'||c5==='p2'||c6==='p2'||c7==='p2'||c8==='p2'){
		winner=2;
		game='over';
	}else if(c1==='p1'||c2==='p1'||c3==='p1'||c4==='p1'||c5==='p1'||c6==='p1'||c7==='p1'||c8==='p1'){
		winner=1;
		game='over';
	}
}

function checkLine(n1,n2,n3){
	var p1=0,p2=0;
	for(var i=0; i<moves.length; i++){
		if(moves[i]==n1 || moves[i]==n2 || moves[i]==n3){
			if(i%2==0){
				p1++;
			}else{
				p2++;
			}
		}
	}

	if(p1==3){
		return 'p1';
	}else if(p2==3){
		return 'p2';
	}
}