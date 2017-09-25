function Text(){
	this.char;

	this.update = function(turn,wplayer){
		if(game!='on'){
			if(game==='draw'){
				this.char="Game Over! It's a draw!\nRefresh to play again!";
			}

			if(wplayer==1){
				this.char=player1+" Wins!\nRefresh to play again!";
			}else if(wplayer==2){
				this.char=player2+" Wins!\nRefresh to play again!";
			}
		}else{
			if(turn==1){
				this.char=player1+"'s Turn to move!";
			}else{	
				this.char=player2+"'s Turn to move!";
			}
		}
	}

	this.show = function(){
		textAlign(CENTER);
		textSize(30);
		noStroke();
		fill(255);
		text(this.char,width/2,height-60);		
	}
}