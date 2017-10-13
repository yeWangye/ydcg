$("input:radio[name=radio-navbar]").bind("click", function() {
	var value;
	value = $(this).val();
	localStorage.setItem("navbar", value);
	if(value === "default") {
		return $("#navbar").addClass("navbar-default").removeClass("navbar-inverse");
	} else if(value === "inverse") {
		return $("#navbar").removeClass("navbar-default").addClass("navbar-inverse");
	}
});

$("input:radio[name=radio-sidebar]").bind("click", function() {
	var value;
	value = $(this).val();
	localStorage.setItem("sidebar", value);
	if(value === "default") {
		return $("#sidebar").removeClass("sidebar-inverse");
	} else if(value === "inverse") {
		return $("#sidebar").addClass("sidebar-inverse");
	}
});

$("input:radio[name=radio-color]").bind("click", function() {
	var value;
	value = $(this).val();
	localStorage.setItem("flat", value);
	if(value === "blue") {
		return $("body").removeClass("flat-green").addClass("flat-blue");
	} else if(value === "green") {
		return $("body").removeClass("flat-blue").addClass("flat-green");
	}
});
$(function() {
	if(localStorage.getItem("navbar")) {
		var navbar = localStorage.getItem("navbar");
		if(navbar === "default") {
			$(".navbar-default").attr("checked","checked");
		} else if(navbar === "inverse") {
			$(".navbar-inverse").attr("checked","checked");
		}
	}
	if(localStorage.getItem("flat")) {
		var flat = localStorage.getItem("flat");
		if(flat === "blue") {
			$(".flat-blue").attr("checked","checked");
		} else if(flat === "green") {
			$(".flat-green").attr("checked","checked");
		}
	}
	if(localStorage.getItem("sidebar")) {
		var sidebar = localStorage.getItem("sidebar");
		if(sidebar === "default") {
			$(".slider-default").attr("checked","checked");
		} else if(sidebar === "inverse") {
			$(".slider-inverse").attr("checked","checked");
		}
	}
});
