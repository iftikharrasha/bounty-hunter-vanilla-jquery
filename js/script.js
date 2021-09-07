var months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

window.onload = function () {
    var fiveMinutes = 30 * 10;
    var display = document.querySelector('#timer');
    startExpire(fiveMinutes, display);

    const date = new Date();
    const month = date.getMonth();
    const day = date.getDate();
    const year = date.getFullYear();
  
    $('.date--today').text(`${months[month]} ${day}, ${year}`);
};

function startExpire(duration, display) {
    var timer = duration,
    minutes,
    seconds;
    var timeInterval = setInterval(function () {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? '' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    display.textContent = minutes + ':' + seconds;

    if (--timer < 0) {
      clearInterval(timeInterval);
      startExpire(duration, display);  //timer loops again
    //   window.location.reload(1);
    }
  }, 1000);
}

function startSurvey() {
    //screen #1
    $('.header').hide();
    $('.hero').hide();
    $('.footer').hide();
}