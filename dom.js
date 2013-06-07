function main(){
  var domLogo = new DomLogo();
  domLogo.init();
}

var DomLogo = function() {
  var BUFFER = 20;
  var RANGE_ARRAY = [[230,140],[352,157],[143,333],[79,237],[328,300]];
  var dotsInPlace = 0;

  this.init = function() {
    $("[id$='dot']").draggable();

    var thisRef = this;
    $("#logo").droppable({
      drop: function(e, ui) {
        thisRef.locationControl(e.toElement.id,event);
        thisRef.checkIfDone();       
      }
    })

    $("#reset_button").click(function() {
      document.location.reload(true)
    });
  }

  this.locationControl = function(dotName, e){   
    if (dotName === "blue_dot") {
      if (this.inRange(e,RANGE_ARRAY[0])) { 
        $("#blue_dot").off();
        dotsInPlace++;
      }
    } else if(dotName === "red_dot") {
      if (this.inRange(e,RANGE_ARRAY[1])) {
        $("#red_dot").off();
        dotsInPlace++;        
      }
    } else if(dotName === "green_dot") {
      if (this.inRange(e,RANGE_ARRAY[2])) {
        $("#green_dot").off();
        dotsInPlace++;                
      }
    } else if(dotName === "1_black_dot") {
      if (this.inRange(e,RANGE_ARRAY[3])) {
        $("#1_black_dot").off();
        dotsInPlace++;                
      }
    } else if(dotName === "2_black_dot") {
      if (this.inRange(e,RANGE_ARRAY[4])) {    
        $("#2_black_dot").off();
        dotsInPlace++;                
      }
    }
  } 

  this.inRange = function(currentEvent, colorMinMax){
    /* The .position() method allows us to retrieve the current position of an element relative to the offset parent. 
    Contrast this with .offset(), which retrieves the current position relative to the document. */
    var x = $("#"+ event.toElement.id).position().left;
    var y = $("#"+ event.toElement.id).position().top;  
    if (x > colorMinMax[0] - BUFFER && x < colorMinMax[0] + BUFFER
    && y > colorMinMax[1] - BUFFER && y < colorMinMax[1] + BUFFER) {
      return true;
    } else {
      return false;
    }
  }

  this.checkIfDone = function(){
    if (dotsInPlace >= RANGE_ARRAY.length) {
      $('#dom_message').html('<p>You won!!</p>');
    }
  }

}

$(main);