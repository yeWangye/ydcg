$(function() {
	if(localStorage.getItem("navbar")) {
		var navbar = localStorage.getItem("navbar");
		if(navbar === "default") {
			$("#navbar").addClass("navbar-default").removeClass("navbar-inverse");
		} else if(navbar === "inverse") {
			$("#navbar").removeClass("navbar-default").addClass("navbar-inverse");
		}
	}
	if(localStorage.getItem("flat")) {
		var flat = localStorage.getItem("flat");
		if(flat === "blue") {
			$("body").removeClass("flat-green").addClass("flat-blue");
		} else if(flat === "green") {
			$("body").removeClass("flat-blue").addClass("flat-green");
		}
	}
	if(localStorage.getItem("sidebar")) {
		var sidebar = localStorage.getItem("sidebar");
		if(sidebar === "default") {
			$("#sidebar").addClass("sidebar-default").removeClass("sidebar-inverse");
		} else if(sidebar === "inverse") {
			$("#sidebar").removeClass("sidebar-default").addClass("sidebar-inverse");
		}
	}
});