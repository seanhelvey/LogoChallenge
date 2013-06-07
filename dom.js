function init(){

  var BUFFER = 20;
  var RANGE_ARRAY = [[230,140],[352,157],[143,333],[79,237],[328,300]];

  var DomLogo = function(){
    $("[id$='dot']").draggable();

    var dom_logo = this;
    $("#logo").droppable({
      drop: function(e, ui) {
        dom_logo.locationControl(e.toElement.id,event);       
      }
    })

    $("#reset_button").click(function() {
      document.location.reload(true)
    });
  };    

	DomLogo.prototype.locationControl = function(dot_name, e){   
    if (dot_name === "blue_dot"){
    	if (this.inRange(e,RANGE_ARRAY[0])){ 
    		$("#blue_dot").off();
    	}
    } else if(dot_name === "red_dot"){
    	if (this.inRange(e,RANGE_ARRAY[1])){
    		$("#red_dot").off();
    	}
    } else if(dot_name === "green_dot"){
    	if (this.inRange(e,RANGE_ARRAY[2])){
	    	$("#green_dot").off();
	    }
    } else if(dot_name === "1_black_dot"){
    	if (this.inRange(e,RANGE_ARRAY[3])){
	    	$("#1_black_dot").off();
	    }
    } else if(dot_name === "2_black_dot"){
    	if (this.inRange(e,RANGE_ARRAY[4])){ 		
	    	$("#2_black_dot").off();
	    }
    }
	} 

  DomLogo.prototype.inRange = function(currentEvent, colorMinMax){

    /* The .position() method allows us to retrieve the current position of an element relative to the offset parent. 
    Contrast this with .offset(), which retrieves the current position relative to the document. */
		var x = $("#"+ event.toElement.id).position().left;
		var y = $("#"+ event.toElement.id).position().top;  
		if (x > colorMinMax[0] - BUFFER && x < colorMinMax[0] + BUFFER
  	&& y > colorMinMax[1] - BUFFER && y < colorMinMax[1] + BUFFER){
			return true;
  	} else {
  		return false;
  	}
	}

  var domLogo = new DomLogo();

}

$(init);