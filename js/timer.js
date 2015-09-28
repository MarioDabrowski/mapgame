var timerStatus = false;

// Countdown Timer - http://stackoverflow.com/a/8031757
function countDown() {
  var counter = setInterval(function() {

    var timer = $('.time').html();
    timer = timer.split(':');
    var minutes = parseInt(timer[0], 10);
    var seconds = parseInt(timer[1], 10);
    seconds -= 1;
    if(timerStatus == false){
      return clearInterval(counter);
    }

    if (minutes < 0) {
      return clearInterval(counter);
    }
    if (minutes < 10 && minutes.length != 2) {
      minutes = '' + minutes;
    }
    if (seconds < 0 && minutes != 0) {
      minutes -= 1;
      seconds = 59;
    } else if (seconds < 10 && length.seconds != 2) {
      seconds = '0' + seconds;
    }
    $('.time').html(minutes + ':' + seconds);

    if (minutes == 0 && seconds == 0) {
      clearInterval(counter);
    }
  }, 1000);
}


$(document).ready(function(){

  // Pause Button
  $('.btn-pause').on('click', function() {
    if($('.start-overlay').is(':hidden') && gameStatus == true){

      disableInput();

      // Place the active state in the input at resume
      $('.answer-input').focus();

      if(timerStatus == true) {
        timerStatus = false;
        $(this).text('Resume');
        $('.pause-overlay').show();
      } else {
        timerStatus = true;
        countDown();
        $(this).text('Pause');
        $('.pause-overlay').hide();
      }
    }
  });

});
