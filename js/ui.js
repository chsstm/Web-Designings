function popup(project){
	$(".iframe").attr("src","projects/"+$(project).children().val()+"/");
	$(".pop-up").fadeIn();
	$(".iframe").focus();
}

$(document).ready(function(){
	$.ajax({url:"js/files.json",success: function(result){
		$("#container").html("");
		result.forEach(function(project){
			$("#container").append(
				"<div class='project-wrapper project "+project.platform.toLowerCase().replace(".","")+"' onclick='popup(this)'>"+
					"<input class='url' type='hidden' value='"+project.url+"'>"+
					"<img class='project-icon' src='images/"+project.icon+"' onerror=\"this.src='images/demo.png'\">"+
					"<div class='project-info'>"+
						"<h2 class='project-title'>"+project.title+"</h2>"+
						"<p>{"+project.platform+"}</p>"+
					"</div>"+
				"</div>"
				);		
		});
	}});

	$("#container").focus();

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