function AlertBox(){

	this.show = function(title,message){
		document.getElementById('alertBox').style.display='block';
		document.getElementById('alertHead').innerHTML=title;
		document.getElementById('alertMessage').innerHTML=message;
	}	

	this.closeBox = function(){
		document.getElementById('alertBox').style.display='none';		
	}
}