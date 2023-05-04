// Toggle Buttons

function toggleButtons(x) {
    if (x == 1) {
        if (document.getElementById("theftToggle").innerHTML == "off") {
            document.getElementById("breakF").style.display = "inline";
            if (document.getElementById("breakInToggle").innerHTML == "on") {
                document.getElementById("breakCo").style.display = "inline";
                document.getElementById("breakR").style.display = "inline";
            }
            document.getElementById("theftV").style.display = "inline";
            if (document.getElementById("vehicleToggle").innerHTML == "on") {
                document.getElementById("tFV").style.display = "inline";
                document.getElementById("tOV").style.display = "inline";
            }
            document.getElementById("theftToggle").innerHTML = "on";
        } else {
            document.getElementById("breakF").style.display = "none";
            document.getElementById("breakCo").style.display = "none";
            document.getElementById("breakR").style.display = "none";
            document.getElementById("theftV").style.display = "none";
            document.getElementById("tFV").style.display = "none";
            document.getElementById("tOV").style.display = "none";
            document.getElementById("theftToggle").innerHTML = "off";
            
        }
        
    } else if (x == 1.1) {
        if (document.getElementById("breakInToggle").innerHTML == "off") {
            document.getElementById("breakCo").style.display = "inline";
            document.getElementById("breakR").style.display = "inline";
            document.getElementById("breakInToggle").innerHTML = "on";
        } else {
            document.getElementById("breakCo").style.display="none";
            document.getElementById("breakR").style.display = "none";
            document.getElementById("breakInToggle").innerHTML = "off";
        }
    } else if (x == 1.2) {
        if (document.getElementById("vehicleToggle").innerHTML == "off") {
            document.getElementById("tFV").style.display = "inline";
            document.getElementById("tOV").style.display = "inline";
            document.getElementById("vehicleToggle").innerHTML = "on";
        } else {
            document.getElementById("tFV").style.display = "none";
            document.getElementById("tOV").style.display = "none";
            document.getElementById("vehicleToggle").innerHTML = "off";
        }
    }

    if (x == 2) {
        if (document.getElementById("violentOToggle").innerHTML == "off") {
            document.getElementById("assault").style.display = "inline";
            if (document.getElementById("assaultToggle").innerHTML == "on") {
                document.getElementById("assaultWDW").style.display = "inline";
            }
            document.getElementById("violentOToggle").innerHTML = "on";
        } else {
            document.getElementById("assault").style.display = "none";
            document.getElementById("assaultWDW").style.display = "none";
            document.getElementById("violentOToggle").innerHTML = "off";
        }
    } else if (x == 2.1) {
        if (document.getElementById("assaultToggle").innerHTML == "off") {
            document.getElementById("assaultWDW").style.display = "inline";
            document.getElementById("assaultToggle").innerHTML = "on";
        } else {
            document.getElementById("assaultWDW").style.display = "none";
            document.getElementById("assaultToggle").innerHTML = "off";
        }
    }
}

// Hide Filters
function hideFilter() {

	if (document.getElementById("filter").style.display == "flex") {
		document.getElementById("filter").style.display = "none";
	} else {
		document.getElementById("filter").style.display = "flex";
	}
}
