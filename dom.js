$(function() {

  var BUFFER = 20;
	var BLUE = [230,140];
	var RED = [352,157];
	var GREEN = [143,333];
	var BLACK1 = [79,237];
	var BLACK2 = [328,300];

  $("#reset_button").click(function() {
    document.location.reload(true)
  });

  $("[id$='dot']").draggable();
  $("#logo").droppable({
		drop: function( event, ui ) {
			locationControl(event.toElement.id,event);       
		}
  })

	function locationControl(dot_name, currentEvent){    
    if (dot_name === "blue_dot"){
    	if (inRange(currentEvent,BLUE)){ 
    		$("#blue_dot").off();
    	}
    } else if(dot_name === "red_dot"){
    	if (inRange(currentEvent,RED)){
    		$("#red_dot").off();
    	}
    } else if(dot_name === "green_dot"){
    	if (inRange(currentEvent,GREEN)){
	    	$("#green_dot").off();
	    }
    } else if(dot_name === "1_black_dot"){
    	if (inRange(currentEvent,BLACK1)){
	    	$("#1_black_dot").off();
	    }
    } else if(dot_name === "2_black_dot"){
    	if (inRange(currentEvent,BLACK2)){ 		
	    	$("#2_black_dot").off();
	    }
    }
	}

	function inRange(currentEvent, colorMinMax){    
		var x = $("#"+ event.toElement.id).position().left;
		var y = $("#"+ event.toElement.id).position().top;  
		if (x > colorMinMax[0] - BUFFER && x < colorMinMax[0] + BUFFER
  	&& y > colorMinMax[1] - BUFFER && y < colorMinMax[1] + BUFFER){
			return true;
  	} else {
  		return false;
  	}
	}

});