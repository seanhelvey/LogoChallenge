$(function() {	
  $("[id$='dot']").draggable();

	$("#reset_button").click(function() {
  	document.location.reload(true)
	});

	detectMouse("blue_dot");
	detectMouse("red_dot");
	detectMouse("green_dot");
	detectMouse("1_black_dot");
	detectMouse("2_black_dot");

  function detectMouse(dot_name){
		$("#" + dot_name).mouseup(function(event) {
			  var msg = "Handler for .mouseup() called at ";
			  msg += event.pageX + ", " + event.pageY;
				console.log(msg);
				locationControl(dot_name,event);
			});
  }

	function locationControl(dot_name, currentEvent){
    if (dot_name === "blue_dot"){
    	if (inRange(currentEvent, 540,580,160,200)){
    		console.log("a");
    		$("#blue_dot").off();
    	}
    } else if(dot_name === "red_dot"){
    	if (inRange(currentEvent, 660,700,180,220)){
    		console.log("b");    		
    		$("#red_dot").off();
    	}
    } else if(dot_name === "green_dot"){
    	if (inRange(currentEvent, 450,490,355,395)){
    		console.log("c");    		
	    	$("#green_dot").off();
	    }
    } else if(dot_name === "1_black_dot"){
    	if (inRange(currentEvent, 385,425,255,295)){
    		console.log("d");    		
	    	$("#1_black_dot").off();
	    }
    } else if(dot_name === "2_black_dot"){
    	if (inRange(currentEvent, 635,675,325,365)){
     		console.log("e");   		
	    	$("#2_black_dot").off();
	    }
    }
	}

	function inRange(currentEvent, xMin, xMax, yMin, yMax){
			if (currentEvent.pageX > xMin && currentEvent.pageX < xMax
    	&& currentEvent.pageY > yMin && currentEvent.pageY < yMax){
				return true;
    	} else {
    		return false;
    	}
	}

});