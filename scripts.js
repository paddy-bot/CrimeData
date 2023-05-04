// Nav Display Menu
const navArrow = document.querySelector('.arrow');
const navMenu = document.querySelector('.nav-menu');


function hideNav() { //Hides the Nav
	
	if (document.getElementById("hideNav1").style.display == 'flex') {
		document.getElementById("hideNav1").style.display = "none";
		document.getElementById("hideNav2").style.display = "none";
		document.getElementById("hideNav3").style.display = "none";
		//document.getElementById("navArrow").classList.remove("right");
    	document.getElementById("navArrow").classList.add("left");
	} else {
		document.getElementById("hideNav1").style.display = "flex";
		document.getElementById("hideNav2").style.display = "flex";
		document.getElementById("hideNav3").style.display = "flex";
    	document.getElementById("navArrow").classList.remove("left");
    	//document.getElementById("navArrow").classList.add("right");
	}
	
}

function hideFilter() {
	
	if (document.getElementById("filter").style.display == "flex") {
		document.getElementById("filter").style.display = "none";
		document.getElementById("showHide").style.display = "flex";
	} else {
		document.getElementById("filter").style.display = "flex";
		document.getElementById("showHide").style.display = "none";
	}
}
function hideDates() {
	if (document.getElementById("dateFilter").style.display == "none") {
		document.getElementById("dateFilter").style.display = "flex";
		document.getElementById("hideDate").innerHTML = "Hide Date Filter";
	} else {
		document.getElementById("dateFilter").style.display = "none";
		document.getElementById("hideDate").innerHTML = "Show Date Filter";
	}
}
