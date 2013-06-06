function init(){

  var BUFFER = 20;
  var BLUE = [230,140];
  var RED = [352,157];
  var GREEN = [143,333];
  var BLACK1 = [79,237];
  var BLACK2 = [328,300];

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
    	if (this.inRange(e,BLUE)){ 
    		$("#blue_dot").off();
    	}
    } else if(dot_name === "red_dot"){
    	if (this.inRange(e,RED)){
    		$("#red_dot").off();
    	}
    } else if(dot_name === "green_dot"){
    	if (this.inRange(e,GREEN)){
	    	$("#green_dot").off();
	    }
    } else if(dot_name === "1_black_dot"){
    	if (this.inRange(e,BLACK1)){
	    	$("#1_black_dot").off();
	    }
    } else if(dot_name === "2_black_dot"){
    	if (this.inRange(e,BLACK2)){ 		
	    	$("#2_black_dot").off();
	    }
    }
	}

  DomLogo.prototype.inRange = function(currentEvent, colorMinMax){
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