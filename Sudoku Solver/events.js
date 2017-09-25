var textboxes;
var given=[];
var alertBox;
var space=0;
var blanks=[];
var solveBtn;
var resetBtn;
var clearBtn;
var startTime;
var endTime;

function initiate(){
	startTime=+new Date();
	for(var i=0; i<81; i++){
		if((textboxes[i].value>=1 && textboxes[i].value<=9) || textboxes[i].value==""){
			if(textboxes[i].value==null || textboxes[i].value==""){
				given[i]=0;
				blanks.push(-1);
				space++;
			}else{
				blanks.push(1);
				given[i]=textboxes[i].value;
			}
		}else{
			alertBox.show("Invalid Input !","Value is invalid at [ "+"Row: "+(Math.floor(i/9)+1)+" and Column: "+((i%9)+1)+" ]<br/>Sudoku only can have numbers from 1 to 9.");
			return 0;
		}
	}

	if(validSudoku()){
		if(space<81){
			resetBtn.disabled=false;	
			solveBtn.disabled=true;		
			if(solve(0)){
				printSolution();
				solveBtn.innerHTML="SOLVED!";
				endTime=+new Date();
				alertBox.show("Hola!","Your Sudoku has been solved !<br/>Solved in: "+((endTime-startTime)/1000)+" seconds");
			}	
		}else{
			alertBox.show("No Hint !","Sudoku Puzzle must have at least 1 hint !");
			reset();
		}
	}else{
		alertBox.show("Invalid Sudoku !","Sudoku is in invalid state !<br/>Box/Row/Column can't have number repeated.");
		reset();
	}
}

function reset(){
	error=0;
	space=0;
	given=[];
	blanks=[];
	resetBtn.disabled=true;
	solveBtn.disabled=false;
	solveBtn.innerHTML="SOLVE";
	for(var i=0; i<81; i++){
		if (textboxes[i].style.color==='blue'){
			textboxes[i].value=null;
			textboxes[i].style.color="black";
		}
	}
}

function clearBox(){
	for(var i=0; i<81; i++){
		textboxes[i].value="";
		solveBtn.disabled=false;
		solveBtn.innerHTML="SOLVE";		
		textboxes[i].style.color="black";
	}
	reset();
}

function onLoad(){
	solveBtn=document.getElementById('solve');
	resetBtn=document.getElementById('reset');
	clearBtn=document.getElementById('clear');
	textboxes=document.getElementsByName('textbox[]');
	alertBox=new AlertBox();
	alertBox.show("Welcome To SS","Welcome to you!<br/>We are here to solve Sudoku Puzzle.")
	for(var i=1; i<=81; i++){
		if(i+1>=19 && i+1<=27){
			textboxes[i].style.borderBottom="solid 2px red";
		}else if(i+1>=28 && i+1<=36){
			textboxes[i].style.borderTop="solid 2px red";			
		}else if(i+1>=46 && i+1<=54){
			textboxes[i].style.borderBottom="solid 2px red";			
		}else if(i+1>=55 && i+1<=63){
			textboxes[i].style.borderTop="solid 2px red";			
		}

		if((i+1)%9==3){
			textboxes[i].style.borderRight="solid 2px red";			
		}else if((i+1)%9==4){
			textboxes[i].style.borderLeft="solid 2px red";			
		}else if((i+1)%9==6){
			textboxes[i].style.borderRight="solid 2px red";			
		}else if((i+1)%9==7){
			textboxes[i].style.borderLeft="solid 2px red";			
		}
	}
}

function solve(eI){
	var num;
	eI=blank();
	if(eI==-1){
		return true;
	}
	for(var i=0; i<=9; i++){
		num=i;	
		if(i==0){
			num=Math.floor((Math.random()*9)+1);
		}
		if(isSafe(eI,num)){
			given[eI]=num;
			if(solve(eI)){				
				return true;
			}
			given[eI]=0;
		}
	}
	return false;
}

function blank(){
	for(var i=0; i<81; i++){
		if(given[i]==0){
			return i;
		}
	}
	return -1;
}

function isSafe(x,num){
	if(!checkRow(x,num) && !checkCol(x,num) && !checkBox(x,num)){
		return true;
	}
	return false;
}

function checkRow(x,num){
	var x=Math.floor(x/9)*9;
	for(var i=x; i<x+9; i++){
		if(given[i]==num){
			return true;
		}
	}
	return false;
}

function checkCol(y,num){
	for(var i=y%9; i<=72+(y%9); i+=9){
		if(given[i]==num){
			return true;
		}
	}
	return false;
}

function checkBox(x,num){
	this.row=Math.floor(x/9);
	this.col=x%9;
	this.box1=[0,1,2,9,10,11,18,19,20];
	this.box2=[3,4,5,12,13,14,21,22,23];
	this.box3=[6,7,8,15,16,17,24,25,26];
	this.box4=[27,28,29,36,37,38,45,46,47];
	this.box5=[30,31,32,39,40,41,48,49,50];
	this.box6=[33,34,35,42,43,44,51,52,53];
	this.box7=[54,55,56,63,64,65,72,73,74];
	this.box8=[57,58,59,66,67,68,75,76,77];
	this.box9=[60,61,62,69,70,71,78,79,80];
	this.box=checkIndex(this.row,this.col);
	switch(this.box){
		case 1: for(var i=0; i<9; i++){
			if(given[this.box1[i]]==num){
				return true;
			}
		}	break;
		case 2: for(var i=0; i<9; i++){
			if(given[this.box2[i]]==num){
				return true;
			}
		}	break;
		case 3: for(var i=0; i<9; i++){
			if(given[this.box3[i]]==num){
				return true;
			}
		}	break;
		case 4: for(var i=0; i<9; i++){
			if(given[this.box4[i]]==num){
				return true;
			}
		}	break;
		case 5: for(var i=0; i<9; i++){
			if(given[this.box5[i]]==num){
				return true;
			}
		}	break;
		case 6: for(var i=0; i<9; i++){
			if(given[this.box6[i]]==num){
				return true;
			}
		}	break;
		case 7: for(var i=0; i<9; i++){
			if(given[this.box7[i]]==num){
				return true;
			}
		}	break;
		case 8: for(var i=0; i<9; i++){
			if(given[this.box8[i]]==num){
				return true;
			}
		}	break;
		case 9: for(var i=0; i<9; i++){
			if(given[this.box9[i]]==num){
				return true;
			}
		}	break;
		default: return false; break;
	}
}

function checkIndex(row,col){
	if(row<3 && col<3){
		return 1;
	}else if(row<3 && col>2 && col<6){
		return 2;
	}else if(row<3 && col>5){
		return 3;
	}else if(row>2 && row<6 && col<3){
		return 4;
	}else if(row>2 && row<6 && col>2 && col<6){
		return 5;
	}else if(row>2 && row<6 && col>5){
		return 6;
	}else if(row>5 && col<3){
		return 7;
	}else if(row>5 && col>2 && col<6){
		return 8;
	}else if(row>5 && col>5){
		return 9;
	}
}

function printSolution(){
	for(var i=0; i<81; i++){
		textboxes[i].value=given[i];
		if(blanks[i]==-1){
			textboxes[i].style.color="blue";
		}else{
			textboxes[i].style.color="black";			
		}
	}
}

function validSudoku(){
	var temp;
	for(var i=0; i<81; i++){
		if(given[i]!=0){
			temp=given[i];
			given[i]=0;
			if(!isSafe(i,temp)){
				return false;
			}
			given[i]=temp;
		}
	}
	return true;
}
