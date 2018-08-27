//  Interval Exercise (follow the instructions below).

//  This code will run as soon as the page loads.
window.onload = function() {

  //  Click events are done for us:
  $("#lap").click(stopwatch.recordLap);
  $("#stop").click(stopwatch.stop);
  $("#reset").click(stopwatch.reset);
  $("#start").click(stopwatch.start);
};

//  Variable that will hold our setInterval that runs the stopwatch
var intervalId;

// prevents the clock from being sped up unnecessarily
var clockRunning = false;

//  Our stopwatch object.
var stopwatch = {

  time: 0,
  lap: 1,

  reset: function() {

    stopwatch.time = 0;
    stopwatch.lap = 1;
$("#display").html("<h1>00:00</h1>");
    //  TODO: Change the "display" div to "00:00."

  },

  start: function() {
    setInterval(function(){time++; }, 3000);
    //  TODO: Use setInterval to start the count here and set the clock to running.
    if (!clockRunning) {

    }

  },
  stop: function() {

    //  TODO: Use clearInterval to stop the count here and set the clock to not be running.

  },

  recordLap: function() {

    //  TODO: Get the current time, pass that into the stopwatch.timeConverter function,
    //        and save the result in a variable.

    //  TODO: Add the current lap and time to the "laps" div.

    //  TODO: Increment lap by 1. Remember, we can't use "this" here.
  },
  count: function() {

    //  TODO: increment time by 1, remember we cant use "this" here.

    //  TODO: Get the current time, pass that into the stopwatch.timeConverter function,
    //        and save the result in a variable.

    //  TODO: Use the variable you just created to show the converted time in the "display" div.

  },

  //  THIS FUNCTION IS DONE FOR US!
  //  We do not need to touch it.

  timeConverter: function(t) {

    //  Takes the current time in seconds and convert it to minutes and seconds (mm:ss).
    var minutes = Math.floor(t / 60);
    var seconds = t - (minutes * 60);

    if (seconds < 10) {
      seconds = "0" + seconds;
    }

    if (minutes === 0) {
      minutes = "00";
    }

    else if (minutes < 10) {
      minutes = "0" + minutes;
    }

    return minutes + ":" + seconds;
  }
};
//  initialize your variables outside the function var count = 0; var clearTime; var seconds = 0, minutes = 0, hours = 0; var clearState; var secs, mins, gethours ; function startWatch( ) { /* check if seconds is equal to 60 and add a +1 to minutes, and set seconds to 0 */ if ( seconds === 60 ) { seconds = 0; minutes = minutes + 1; } /* you use the javascript tenary operator to format how the minutes should look and add 0 to minutes if less than 10 */ mins = ( minutes < 10 ) ? ( '0' + minutes + ': ' ) : ( minutes + ': ' ); /* check if minutes is equal to 60 and add a +1 to hours set minutes to 0 */ if ( minutes === 60 ) { minutes = 0; hours = hours + 1; } /* you use the javascript tenary operator to format how the hours should look and add 0 to hours if less than 10 */ gethours = ( hours < 10 ) ? ( '0' + hours + ': ' ) : ( hours + ': ' ); secs = ( seconds < 10 ) ? ( '0' + seconds ) : ( seconds ); // display the stopwatch var x = document .getElementById("timer"); x.innerHTML = 'Time: ' + gethours + mins + secs; /* call the seconds counter after displaying the stop watch and increment seconds by +1 to keep it counting */ seconds++; /* call the setTimeout( ) to keep the stop watch alive ! */ clearTime = setTimeout( "startWatch( )", 1000 ); } // startWatch( ) //create a function to start the stop watch 
// function startTime( ) { /* check if seconds, minutes, and hours are equal to zero and start the stop watch */ 
//   if ( seconds === 0 && minutes === 0 && hours === 0 ) { /* hide the fulltime when the stop watch is running */ var fulltime = document.getElementById( "fulltime" ); fulltime.style.display = "none"; /* hide the start button if the stop watch is running */ this.style.display = "none"; /* call the startWatch( ) function to execute the stop watch whenever the startTime( ) is triggered */ startWatch( ); } // if () } // startTime() /* you need to bind the startTime( ) function to any event type to keep the stop watch alive ! */ window.addEventListener( 'load', function ( ) { var start = document .getElementById("start"); start.addEventListener( 'click', startTime ); }); // startwatch.js end 