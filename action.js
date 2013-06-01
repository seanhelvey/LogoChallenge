$(function() {	
  $(".ui-widget-content").draggable();

	$("#reset_button").click(function() {
  	document.location.reload(true)
	});
});