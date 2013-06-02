$(function() {	
  $("[id$='dot']").draggable();

	$("#reset_button").click(function() {
  	document.location.reload(true)
	});

  /*
  $(".ui-widget-content").each(function( index ) {
  	console.log( index + "left: " + $(this).position().left );
  	console.log( index + "top: " + $(this).position().top );
  	console.log( index + "right: " + $(this).position().right );
   	console.log( index + "bottom: " + $(this).position().bottom ); 	  	  	
	});*/

	$("#blue_dot").mousemove(function(event) {
  var msg = "Handler for .mousemove() called at ";
  msg += event.pageX + ", " + event.pageY;
	console.log(msg);
	controlDotLocation(event)
	});

	function controlDotLocation(event){

    if (event.pageX > 540 && event.pageX < 580
    	&& event.pageY > 160 && event.pageY < 200) {
    	console.log("got it!!!");
    	snapIntoPlace();
		//blue
		//lr 530-590
		//tp 150-210
		}
	}

	function snapIntoPlace(){
		$("#blue_dot").animate({top: '110px', left: '181px'});
		$("#blue_dot").off();
	}

});