function popup(project) {
	$(".iframe").attr("src", "./projects/" + $(project).children().val() + "/");
	$(".pop-up").fadeIn();
	$(".iframe").focus();
}

function filterProject(type) {
	toggleMenu();
	if (type === 'all') {
		$(".project").show();
	} else {
		$(".project").hide();
		setTimeout(() => {
			$("." + type).show();			
		}, 0);
	}
}

function toggleMenu() {
	if ($(".filter-button").hasClass("show-button")) {
		setTimeout(function () {

			$("#filter-buttons").toggle();
		}, 500);
	} else {
		$("#filter-buttons").toggle();
	}
	$(".filter-button").toggleClass("show-button");
	$(".filter-button").toggleClass("hide-button");
}


$(document).ready(function () {
	$.ajax({
		url: "js/files.json", success: function (result) {
			$("#project-container").html("");
			result.forEach(function (project) {
				$("#project-container").append(
					"<div class='project-wrapper project " + project.platform.toLowerCase().replace(".", "") + "' onclick='popup(this)'>" +
					"<input class='url' type='hidden' value='" + project.url + "'>" +
					"<div class='icon-wrapper'><img class='project-icon' src='images/" + project.icon + "' onerror=\"this.src='images/demo.png'\"></div>" +
					"<div class='project-info'>" +
					"<h2 class='project-title'>" + project.title + "</h2>" +
					"<p>{" + project.platform + "}</p>" +
					"</div>" +
					"</div>"
				);
			});
		}
	});

	$.ajax({
		url: "js/filter.json", success: function (result) {
			result.filters.forEach(function (filter) {
				$("#filter-buttons").append(
					"<button id='" + filter.id + "' class='filter-button hide-button' onclick='filterProject(\"" + filter.id + "\")'>" + filter.name + "</button>"
				);
			});
		}
	});

	$("#menu-icon").click(toggleMenu);

	$("#close-btn").click(function () {
		$(".iframe").attr("src", "");
		$(".pop-up").fadeOut();
	});
});