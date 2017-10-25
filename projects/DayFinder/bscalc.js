var BSMonthlyExtraDays=[2,3,3,3,3,2,1,1,1,1,1,2];

function setBSDay(){
	var year=Number(document.getElementById('bsyear').value);
	var month=Number(document.getElementById('bsmonth').value);

	if(leap(year)){
		BSMonthlyExtraDays[1]=BSMonthlyExtraDays[2]+1;
	}
	var days=Number(BSMonthlyExtraDays[month-1]+28);
	var select=document.getElementById('bsday');
	select.options.length=1;
	for (var i = days; i >=1; i--) {
		var option=document.createElement('option');
		option.text=i;
		option.value=i;
		select.add(option,select[1]);
	}
}

function findBS(){
	var bsextraDays=0;
	var year=Number(document.getElementById('bsyear').value);
	var month=Number(document.getElementById('bsmonth').value);
	var day=Number(document.getElementById('bsday').value);

	if(!year || !month || !day){
		return 0;
	}

	bsextraDays+=ExtraDaysInBSYear(year-1);
	bsextraDays+=BSExtraDaysUpToThisMonth(month-1);
	bsextraDays+=day;
	bsextraDays%=7;
	document.getElementById('bsresult').innerHTML=getWeekDay(bsextraDays);
}

function ExtraDaysInBSYear(year){
	var ed=0;
	var yp1=(Math.floor(year/100)*100)%400;
	var yp2=year%100;
	if(yp1==100){
		ed+=5;
	}else if(yp1==200){
		ed+=3;
	}else if(yp1==300){
		ed+=1;
	}

	ed+=(yp2+Math.floor(yp2/4))%7;
	return ed;
}

function BSExtraDaysUpToThisMonth(month){
	var ed=0;
	for(var i=0; i<month; i++){
		ed+=BSMonthlyExtraDays[i];
	}
	return ed%7;
}

function leap(year){
	if(year%4==0 || year%400==0){
		return true;
	}
	return false;
}

function getWeekDay(day){
	switch(day){
		case 0: return 'Sunday'; break;
		case 1: return 'Monday'; break;
		case 2: return 'Tuesday'; break;
		case 3: return 'Wednesday'; break;
		case 4: return 'Thrusday'; break;
		case 5: return 'Friday'; break;
		case 6: return 'Saturday'; break;
	}
}

function resetBS(){
	document.getElementById('bsyear').value=null;
	document.getElementById('bsmonth').options[0].selected=true;
	document.getElementById('bsday').options.length=1;
	document.getElementById('bsday').options[0].selected=true;
	document.getElementById('bsresult').innerHTML=null;
}