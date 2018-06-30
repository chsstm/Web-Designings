var grid;
var w=90;
var rows=5;
var cols=5;
var his=null;
var operation=null;
var fn=0,ln=0,result=0,disp=0;

function make2DArray(r,c){
	var array=new Array(r);
	for(var i=0; i<c; i++){
		array[i]=new Array(c);
	}
	return array;
}

function setup() {
	createCanvas(470,650).position((windowWidth-width)/2,(windowHeight-height)/2,WEBGL);
	displayBoard=new DisplayBoard();
	grid=make2DArray(rows,cols);

	grid[0][0]=new Button('Action','CE',0,0,w,w);
	grid[0][1]=new Button('Num','7',0,1,w,w);
	grid[0][2]=new Button('Num','4',0,2,w,w);
	grid[0][3]=new Button('Num','1',0,3,w,w);
	grid[0][4]=new Button('Num','0',0,4,2*w,w);

	grid[1][0]=new Button('Action','C',1,0,w,w);
	grid[1][1]=new Button('Num','8',1,1,w,w);
	grid[1][2]=new Button('Num','5',1,2,w,w);
	grid[1][3]=new Button('Num','2',1,3,w,w);

	grid[2][0]=new Button('Action','Del',2,0,w,w);
	grid[2][1]=new Button('Num','9',2,1,w,w);
	grid[2][2]=new Button('Num','6',2,2,w,w);
	grid[2][3]=new Button('Num','3',2,3,w,w);
	grid[2][4]=new Button('Dot','.',2,4,w,w);

	grid[3][0]=new Button('Action','+-',3,0,w,w);
	grid[3][1]=new Button('Sign','/',3,1,w,w);
	grid[3][2]=new Button('Sign','x',3,2,w,w);
	grid[3][3]=new Button('Sign','-',3,3,w,w);
	grid[3][4]=new Button('Sign','+',3,4,w,w);


	grid[4][0]=new Button('Action','SQ()',4,0,w,w);
	grid[4][1]=new Button('Sign',' mod ',4,1,w,w);
	grid[4][2]=new Button('Action','1/X',4,2,w,w);
	grid[4][3]=new Button('Sign','=',4,3,w,2*w);
}

function draw() {
	background(51);
	displayBoard.show();
	for(var i=0; i<grid.length; i++){
		for(var j=0; j<grid.length; j++){
			if((i==1 && j==4)||(i==4 && j==4)){
				continue;
			}	
			grid[i][j].show();	
		}
	}
	hovers();
	status();
}

function status(){
	textAlign(RIGHT,CENTER);
	textSize(50);
	fill(0);
	noStroke();

	//Display
	if(String(disp).length>14){
		disp=String(disp).substring(0,14);
	}
	text(disp,width-30,110);
	
	//History
	fill(100);
	if(his){
		textSize(25);
		text(his,width-30,60);
	}
}

function hovers(){
	for(var i=0; i<grid.length; i++){
		for(var j=0; j<grid.length; j++){
			if((i==1 && j==4)||(i==4 && j==4)){
				continue;
			}
			if(grid[i][j].over(mouseX,mouseY)){
				cursor(HAND);
				for(var a=0; a<grid.length; a++){
					for(var b=0; b<grid.length; b++){
						if((a==1 && b==4)||(a==4 && b==4) || (a==i && b==j)){
							continue;
						}	
						grid[a][b].color=200;
					}
				}
				return 0;
			}else{
				cursor(ARROW);
			}
		}
	}
}

function mousePressed(){	
	for(var i=0; i<grid.length; i++){
		for(var j=0; j<grid.length; j++){
			if((i==1 && j==4)||(i==4 && j==4)){
				continue;
			}	
			if(grid[i][j].clicked(mouseX,mouseY)){
				switch(grid[i][j].type){
					case 'Action': 
					switch(grid[i][j].value){
						case 'Del': 
						if(!Number(disp) || disp=='Infinity'){
							disp=0;
						}
						if(String(disp).length!=0){
							disp=String(disp).slice(0,String(disp).length-1);
						}
						if(String(disp).length==0){
							disp=0;
						}
						break;
						case 'C': 
						disp=0;
						break;
						case 'CE': 
						fn=null;
						sn=null;
						disp=0;
						his=null;
						operation=null;
						break;
						case '+-': 
						result=0-disp;
						disp=result;
						break;
						case 'SQ()': 
						his="SQRT("+disp+")=";
						result=sqrt(disp);
						disp=result;
						fn=result;
						break;
						case '1/X':
						his="1/"+disp+"=";
						result=1/disp;
						disp=result;
						fn=result;
						break;
					}
					break;
					case 'Sign': 
					if(operation==null){
						if(grid[i][j].value!="="){
							operation=grid[i][j].value;
							fn=Number(disp);
							his=fn+grid[i][j].value;
							disp=0;
						}
					}else{
						if(grid[i][j].value=="="){
							sn=Number(disp);
							result=calculate();
							disp=result;
							operation=null;
							result=0;
							his=null;
						}else{
							sn=Number(disp);
							result=calculate()
							his=result+grid[i][j].value;
							operation=grid[i][j].value;
							disp=0;
							fn=result;
							result=0;
						}
					}
					break;
					case 'Num': 
					if(String(disp).length<14){
						if(disp>0){
							disp=disp+grid[i][j].value;
						}else{
							disp=grid[i][j].value;
						}
					}
					break;
					case 'Dot':
					if(String(disp).indexOf('.')==-1){
						disp=disp+'.';
					}
					break;

				}
			}
		}
	}
}

function calculate(){
	switch(operation){
		case '+': return(fn+sn); break;
		case '-': return(fn-sn); break;
		case 'x': return(fn*sn); break;
		case '/': return(fn/sn); break;
		case ' mod ': return(fn%sn); break;
	}
}

function DisplayBoard(){
	this.show =function(){
		fill(255);
		rect(10,30,width-20,120);
		stroke(0);
		strokeWeight(4);
		fill(220);
		rect(20,40,width-40,100);
	}
}