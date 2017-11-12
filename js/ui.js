function popup(project){
	$(".iframe").attr("src","projects/"+$(project).children().val()+"/");
	$(".pop-up").fadeIn();
	$(".iframe").focus();
}

$(document).ready(function(){
	$.ajax({url:"js/files.json",success: function(result){
		result.forEach(function(project){
			$("#container").append(
				"<div class='project-wrapper' onclick='popup(this)'>"+
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
});