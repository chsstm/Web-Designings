function popup(project){
	$(".iframe").attr("src","projects/"+$(project).children().val()+"/");
	$(".pop-up").fadeIn();
	$(".iframe").focus();
}

$(document).ready(function(){
	$.ajax({url:"js/files.json",success: function(result){
		$("#project-container").html("");
		result = JSON.parse(result);
		for(let i=0; i<result.length; i++){
			let project = result[i];
			$("#project-container").append(
				"<div class='project-wrapper project "+project.platform.toLowerCase().replace(".","")+"' onclick='popup(this)'>"+
					"<input class='url' type='hidden' value='"+project.url+"'>"+
					"<img class='project-icon' src='images/"+project.icon+"' onerror=\"this.src='images/demo.png'\">"+
					"<div class='project-info'>"+
						"<h2 class='project-title'>"+project.title+"</h2>"+
						"<p>{"+project.platform+"}</p>"+
					"</div>"+
				"</div>"
				);		
		}
	}});
	
	$("#container").focus();

	$("#combo-filter").change(function(){
		switch($("#combo-filter").val()){
			case 'all': $(".project").show(); break;
			case 'javascript': $(".project").hide(); $(".javascript").show(); break;
			case 'p5js': $(".project").hide(); $(".p5js").show(); break;
			case 'unity': $(".project").hide(); $(".unity").show(); break;
		}
	});

	$(".close-btn").click(function(){
		$(".iframe").attr("src","");
		$(".pop-up").fadeOut();
	});

	$(".all").click(function(){
		$(".project").show();
	});

	$(".javascript").click(function(){
		$(".project").hide();
		$(".javascript").show();
	});

	$(".p5js").click(function(){
		$(".project").hide();
		$(".p5js").show();
	});

	$(".unity").click(function(){
		$(".project").hide();
		$(".unity").show();
	});
});