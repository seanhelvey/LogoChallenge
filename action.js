$(function() {

  var BUFFER = 20;
	var BLUE = [230,140];
	var RED = [352,157];
	var GREEN = [143,333];
	var BLACK1 = [79,237];
	var BLACK2 = [328,300];

  $("[id$='dot']").draggable();
  $("#logo").droppable({
			drop: function( event, ui ) {
				console.log(event.toElement.id);
				console.log($("#"+ event.toElement.id).position().left);
				console.log($("#"+ event.toElement.id).position().top);
				locationControl(event.toElement.id,event);
  		}
  })

	$("#reset_button").click(function() {
  	document.location.reload(true)
	});

	function locationControl(dot_name, currentEvent){
    if (dot_name === "blue_dot"){
    	console.log(BLUE[0]);
    	if (inRange(currentEvent,BLUE)){
    		$("#debugz").text("hi");     		
    		console.log("a");
    		$("#blue_dot").off();
    	}
    } else if(dot_name === "red_dot"){
	    	console.log("xxx"); 
    	if (inRange(currentEvent,RED)){
    		console.log("b");    		
    		$("#red_dot").off();
    	}
    } else if(dot_name === "green_dot"){
    	if (inRange(currentEvent,GREEN)){
    		console.log("c");    		
	    	$("#green_dot").off();
	    }
    } else if(dot_name === "1_black_dot"){
    	if (inRange(currentEvent,BLACK1)){
    		console.log("d");    		
	    	$("#1_black_dot").off();
	    }
    } else if(dot_name === "2_black_dot"){
    	if (inRange(currentEvent,BLACK2)){
     		console.log("e");   		
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