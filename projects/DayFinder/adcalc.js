var ADMonthlyExtraDays=[3,0,3,2,3,2,3,3,2,3,2,3];

function setADDay(){
	var year=Number(document.getElementById('adyear').value);
	var month=Number(document.getElementById('admonth').value);
	var days=getDays(year,month);

	var select=document.getElementById('adday');
	select.options.length=1;
	for (var i = days; i >=1; i--) {
		var option=document.createElement('option');
		option.text=i;
		option.value=i;
		select.add(option,select[1]);
	}
}

function getDays(year,month){
	return new Date(year,month,0).getDate();
}

function findAD(){
	var extraDays=0;
	var year=Number(document.getElementById('adyear').value);
	var month=Number(document.getElementById('admonth').value);
	var day=Number(document.getElementById('adday').value);

	if(!year || !month || !day){
		return 0;
	}

	if(leap(year)){
		ADMonthlyExtraDays[1]=1;
	}

	extraDays+=ExtraDaysInYear(year-1);
	extraDays+=ExtraDaysUpToThisMonth(month);
	extraDays+=day;
	extraDays%=7;
	document.getElementById('adresult').innerHTML=getWeekDay(extraDays);
}

function ExtraDaysInYear(year){
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

function ExtraDaysUpToThisMonth(month){
	var ed=0;
	for(var i=0; i<month-1; i++){
		ed+=ADMonthlyExtraDays[i];
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

function resetAD(){
	document.getElementById('adyear').value=null;
	document.getElementById('admonth').options[0].selected=true;
	document.getElementById('adday').options.length=1;
	document.getElementById('adday').options[0].selected=true;
	document.getElementById('adresult').innerHTML=null;
}