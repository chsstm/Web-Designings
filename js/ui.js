const popup = (project) => {
	$(".iframe").attr("src", "./projects/" + $(project).children().val() + "/");
	
	let elem = document.getElementById('iframe');
	
	if (elem.requestFullscreen) {
	  elem.requestFullscreen().then(openPopup);
	} else if (elem.mozRequestFullScreen) { /* Firefox */
	  elem.mozRequestFullScreen().then(openPopup);
 	} else if (elem.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
	  elem.webkitRequestFullscreen().then(openPopup);
	} else if (elem.msRequestFullscreen) { /* IE/Edge */
	  elem.msRequestFullscreen().then(openPopup);
	}
}

const filterProject = (type) => {
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

const toggleMenu = () => {
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

const onCloseFullscreen = () => {
	$(".iframe").attr("src", "");
	$(".pop-up").fadeOut();
}

const openPopup = () => {
	$(".pop-up").fadeIn();
	$(".iframe").focus();
	
	let elem = document.getElementById('iframe');
	
	elem.addEventListener("fullscreenchange", onFullscreenChange);
	elem.addEventListener("mozfullscreenchange", onFullscreenChange);
	elem.addEventListener("webkitfullscreenchange", onFullscreenChange);
	elem.addEventListener("msfullscreenchange", onFullscreenChange);
}

const closePopup = () => {		
	let elem = document.getElementById('iframe');
	
	elem.removeEventListener("fullscreenchange", onFullscreenChange);
	elem.removeEventListener("mozfullscreenchange", onFullscreenChange);
	elem.removeEventListener("webkitfullscreenchange", onFullscreenChange);
	elem.removeEventListener("msfullscreenchange", onFullscreenChange);
	
	$(".iframe").attr("src", "");
	$(".pop-up").fadeOut();
}

const onFullscreenChange = () => {
	console.log('Fullscreen closed.')
	closePopup();
}

$(document).ready(()=> {
	$.ajax({
		url: "js/files.json", success: (result) => {
			$("#project-container").html("");
			result.forEach((project) => {
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
		url: "js/filter.json", success: (result) => {
			result.filters.forEach((filter) => {
				$("#filter-buttons").append(
					"<button id='" + filter.id + "' class='filter-button hide-button' onclick='filterProject(\"" + filter.id + "\")'>" + filter.name + "</button>"
				);
			});
		}
	});

	$("#menu-icon").click(toggleMenu);

	$("#close-btn").click(closePopup);
});
