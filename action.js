$(function() {	

	var BBLUE = [540,580,160,200];
	var IBLUE = [480,520,165,205];

	var BRED = [660,700,180,220];
	var IRED = [600,640,180,220];

	var BGREEN = [450,490,355,395];
	var IGREEN = [400,440,360,400];

	var BBLACK1 = [385,425,255,295];
	var IBLACK1 = [330,370,260,300];

	var BBLACK2 = [635,675,325,365];
	var IBLACK2 = [580,620,330,370];

	var BLUE;
	var RED;
	var GREEN;
	var BLACK1;
	var BLACK2;

	if( navigator.userAgent.match(/iPad/i) ) {
		BLUE = IBLUE;
		RED = IRED;
		GREEN = IGREEN;
		BLACK1 = IBLACK1;
		BLACK2 = IBLACK2;								
	} else {
		BLUE = BBLUE;
		RED = BRED;
		GREEN = BGREEN;
		BLACK1 = BBLACK1;
		BLACK2 = BBLACK2;				
	}


  $("[id$='dot']").draggable();
  $("#logo").droppable({
			drop: function( event, ui ) {
				console.log(ui.helper.context.id);
				var id = ui.helper.context.id;
				console.log(event.originalEvent);
				//var touch = event.originalEvent.touches[0].pageX;
				//$("#debugx").text(event.originalEvent.type);
				$("#debugx").text(event.originalEvent.pageX);
				$("#debugy").text(event.originalEvent.pageY);  
  		}
  })

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
    	console.log(BLUE[0]);
    	if (inRange(currentEvent,BLUE[0],BLUE[1],BLUE[2],BLUE[3])){
    		$("#debugz").text("hi");     		
    		console.log("a");
    		$("#blue_dot").off();
    	}
    } else if(dot_name === "red_dot"){
	    	console.log("xxx"); 
    	if (inRange(currentEvent,RED[0],RED[1],RED[2],RED[3])){
    		console.log("b");    		
    		$("#red_dot").off();
    	}
    } else if(dot_name === "green_dot"){
    	if (inRange(currentEvent,GREEN[0],GREEN[1],GREEN[2],GREEN[3])){
    		console.log("c");    		
	    	$("#green_dot").off();
	    }
    } else if(dot_name === "1_black_dot"){
    	if (inRange(currentEvent,BLACK1[0],BLACK1[1],BLACK1[2],BLACK1[3])){
    		console.log("d");    		
	    	$("#1_black_dot").off();
	    }
    } else if(dot_name === "2_black_dot"){
    	if (inRange(currentEvent,BLACK2[0],BLACK2[1],BLACK2[2],BLACK2[3])){
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