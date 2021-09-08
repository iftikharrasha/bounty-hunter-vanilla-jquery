var answered = 0;
var prevProgress = 0;
var stepsTotal = 0;
var progress = 0;
var txt = '';

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

var questions = [
  {
    id: 1,
    questionText:
      "Do you have a club membership to any wholesale stores such as Costco, Sam's Club, or Smart and Final?",
    totalSurveySteps: 2,
    surveyStep: 1,
    isFinalQuestion: false,
    answers: [
      {
        id: 1,
        answerText: 'Yes',
      },
      {
        id: 2,
        answerText: 'No',
      },
      {
        id: 3,
        answerText: 'Not Sure',
      },
    ],
  },
  {
    id: 2,
    questionText:
      "Do you feel that large Wholesale Stores provide good value for your money?",
    totalSurveySteps: 2,
    surveyStep: 2,
    isFinalQuestion: true,
    answers: [
      {
        id: 1,
        answerText: 'Definitely',
      },
      {
        id: 2,
        answerText: 'Somewhat',
      },
      {
        id: 3,
        answerText: 'Not Really',
      },
      {
        id: 4,
        answerText: 'Definitely Not',
      },
    ],
  },
];

var cards = [
  {
    time: 'card1Time',
    btn: 'card1Btn',
  },
  {
    time: 'card2Time',
    btn: 'card2Btn',
  },
  {
    time: 'card3Time',
    btn: 'card3Btn',
  },
  {
    time: 'card4Time',
    btn: 'card4Btn',
  },
  {
    time: 'card5Time',
    btn: 'card5Btn',
  },
  {
    time: 'card6Time',
    btn: 'card6Btn',
  },
  {
    time: 'card7Time',
    btn: 'card7Btn',
  },
  {
    time: 'card8Time',
    btn: 'card8Btn',
  },
  {
    time: 'card9Time',
    btn: 'card9Btn',
  },
  {
    time: 'card10Time',
    btn: 'card10Btn',
  },
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
    }
  }, 1000);
}

function startSurvey() {
    //screen #1
    $('#header').hide();
    $('#hero').hide();

    const question = questions[0];
    const nextQuestion = question.id + 1;

    //progress count
    answered = question.surveyStep - 1;
    stepsTotal = question.totalSurveySteps;
    
    //get current progress bar
    progress = (answered / stepsTotal) * 100;
    if (question.isFinalQuestion != true) {
      $({ someValue: prevProgress }).animate(
        { someValue: progress },
        {
          duration: 1000,
          easing: 'swing',
          step: function () {
            $('#percentCount').text(Math.round(this.someValue));
          },
        }
      );
      $('#survey').show();
      $('#progressBar').show();
      $('#progressLine').css('width', progress + '%');
      $('#questionText').html(question.questionText);
      $('#questionBody').show();

      for (var i = 0; i < question.answers.length; i++) {
        $('#questionBody').append(
            `<button id="` + question.answers[i].id + `"class="mb-4 question--btn" value="` + question.answers[i].value + `"onClick="nextQuestion(` + nextQuestion + `)">` + question.answers[i].answerText + `</button>`
        );
      }
    }else {
      validateScreen();
    }
    cheers(progress);
}

function cheers(prog = '100') {
  if (prog == 0) {
      txt = " - Let's begin!"
  }
  if (prog > 0 && prog <= 50) {
      txt = "- Almost there!"
  }
  if (prog > 50 && prog <= 100) {
      txt = "- Almost there!"
  }

  $("#shoutOuts").text(txt);
}

function nextQuestion(questionId) {
  const question = questions.find((val) => val.id === questionId);
  var nextQuestion = '';
  if (question && !question.isFinalQuestion) {
    nextQuestion = question.id + 1;
  }

  if (question && question.answers != null) {
    $('#questionText').html('');
    $('#questionBody').html('');
    $('#questionText').append(question.questionText);

    for (var i = 0; i < question.answers.length; i++) {
      $('#questionBody').append(
        `<button id="` + question.answers[i].id + `"class="mb-4 question--btn" value="` + question.answers[i].value + `"onClick="nextQuestion(` + nextQuestion + `)">` + question.answers[i].answerText + `</button>`
      );
    }

    //progress still continued
    var answered = question.surveyStep - 1;
    var stepsTotal = question.totalSurveySteps;
    var prevProgress = $('#percentCount').text();
    var progress = (answered / stepsTotal) * 100;
    $('#progressLine').css('width', progress + '%');

    $({ someValue: prevProgress }).animate(
      { someValue: progress },
      {
        duration: 1000,
        easing: 'swing',
        step: function () {
          $('#percentCount').text(Math.round(this.someValue));
        },
      }
    );
  }else{
    let prevProgress = $('#percentCount').text();
    let progress = 100;
    $('#progressLine').css('width', progress + '%');
    $({ someValue: prevProgress }).animate(
      { someValue: progress },
      {
        duration: 1000,
        easing: 'swing',
        step: function () {
          $('#percentCount').text(Math.round(this.someValue));
        },
      }
    );
    validateScreen();
  }
  cheers(progress);
}

function validateScreen() {
  $('#question').hide();
  $('#choices').hide();

  setTimeout(function () {
    $('#progressBar').addClass('transit--down');
  }, 0);

  setTimeout(function () {
    $('#validate').show();
  }, 1000);

  setTimeout(function () {
    $('#ticked1').addClass('fade--gone');
  }, 2000);

  setTimeout(function () {
    $('#ticked2').addClass('fade--gone');
  }, 3000);

  setTimeout(function () {
    $('#ticked3').addClass('fade--gone');
  }, 4000);

  setTimeout(function () {
    $('#survey').hide();
    $('#header').show();
    $('#offers').show();
    $('#comment').show();
  }, 4500);

  setTimeout(function () {
    $('#products').show();

    cards.forEach((val, index) => {
      var timeDisplay = document.querySelector(`#${val.time}`);
      const randomTime = getRandom(5, 7) * 60;
      if (index + 1 === cards.length || index + 1 === 3) {
        startTimer(5, timeDisplay, val.btn);
      } else {
        startTimer(randomTime, timeDisplay, val.btn);
      }
    });
  }, 4500);

  setTimeout(function () {
    $('#coupon').addClass('fadeInUp');
  }, 5500);
}

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function startTimer(duration, display, btnId) {
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
    $(`#${btnId}`).text('EXPIRED');
    $(`#${btnId}`).addClass('btn--expired');
    $(`#${btnId}`).css( "cursor", "not-allowed" );
    $(`#${btnId}`).prop('onclick', null).off('click');
    $(`#${btnId}`).removeAttr('href');
    $(`#${btnId}`).parent().parent().parent().parent().addClass('grayed--out');
    $(`#${btnId}`).parent().css( "opacity", "1" );
  }
}, 1000);
}