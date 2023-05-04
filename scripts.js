// Nav Display Menu
const navArrow = document.querySelector('.arrow');
const navMenu = document.querySelector('.nav-menu');

navArrow.addEventListener("click", () => {
	hideNav();
});


function hideNav() { //Hides the Nav
	
	if (document.getElementById("hideNav1").style.display == 'flex') {
		document.getElementById("hideNav1").style.display = "none";
		document.getElementById("hideNav2").style.display = "none";
		document.getElementById("hideNav3").style.display = "none";
		navArrow.classList.remove("right");
    	navArrow.classList.add("left");
	} else {
		document.getElementById("hideNav1").style.display = "flex";
		document.getElementById("hideNav2").style.display = "flex";
		document.getElementById("hideNav3").style.display = "flex";
    	navArrow.classList.remove("left");
    	navArrow.classList.add("right");
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
