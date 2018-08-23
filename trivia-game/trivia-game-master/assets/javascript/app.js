//questions
var questionBank = [
  q1 = {
      question: "In 1986, Apple launched a clothing line?",
      options: ["True", "False"],
      answer: "True"
  },

  q2 = {
      question: "Between 1900 and 1920, Tug of War was an Olympic event?",
      options: ["true", "false"],
      answer: "true"
  },

  q3 = {
      question: "The Code of Hammurabi decreed that bartenders who watered down beer would be executed?",
      options: ["True", "False"],
      answer: "True"
  },

  q4 = {
      question: "The American Psychiatric Association’s DSM-V handbook classifies caffeine withdrawal as a mental disorder?",
      options: ["True", "False"],
      answer: "True"
  },

  q5 = {
      question: 'In 19th-century Britain, opium for babies was marketed under the name "Quietness."?',
      options: ["True", "False"],
      answer: "true",
  },

  q6 = {
      question: "In 1999, the U.S. government paid the Zapruder family $16 million for the film of JFK's assassination?",
      options: ["True", "False"],
      answer: "true"
  },

  q7 = {
      question: "Elmo is the only non-human to testify before Congress.?",
      options: ["True", "False"],
      answer: "true"
  }
];

//index of questionBank array
var index = 0;

//Holds chosen question
var current = {};

//wins, losses, times up
var wins = 0;
var losses = 0;
var noanswer = 0;

//question maker
function generateQuestion(x) {
  current.question = x.question;
  current.options = x.options;
  current.answer = x.answer;
  longTimer.reset();
  longTimer.start();
  displayQuestionHTML();
}

//updates
function displayQuestionHTML() {
  $("#timer-div").show();
  $("#options-div").show();
  $("#question-div").text(current.question);
  $("#true-div").text(current.options[0]);
  $("#false-div").text(current.options[1]);
  $("#correct-answer").hide();
  longTimer.reset();
  longTimer.start();
}

//runs the timer
var intervalId;

//Main timer object
var clockRunning = false;
var longTimer = {

  time: 7,

  reset: function () {
      longTimer.time = 7;
      $("#timer-div").show();
      $("#timer-div").text("Time remaining: " + longTimer.time + " seconds");
  },

  hide: function () {
      $("#timer-div").hide();
  },

  start: function () {
      if (!clockRunning) {
          intervalId = setInterval(longTimer.count, 1000);
          clockRunning = true;
          $("#timer-div").show();
      }
  },

  count: function () {
      longTimer.time--
          $("#timer-div").text("Time remaining: " + longTimer.time + " seconds");
      if (longTimer.time == 0) {
          noanswer++;
          index++;
          displayTimeUp();
      }
  },

  stop: function () {
      clearInterval(intervalId);
      clockRunning = false;
  },
}

//time between questions
function fiveSecondTimeout() {
  setTimeout(function () {
      generateQuestion(questionBank[index]);
  }, 1000);
}

//update correct answer display
function displayAnswerHTML() {
  longTimer.hide();
  $("#options-div").hide();
  $("#correct-answer").show();
  fiveSecondTimeout();
}

//displays a win
function displayWin() {
  displayAnswerHTML();
  $("#question-div").text("Correct!")
  $("#correct-answer").text("");
  if ((wins + losses + noanswer) == 7) {
      gameEnd();
  };
}

//displays a loss
function displayLoss() {
  displayAnswerHTML();
  $("#question-div").text("Wrong");
  $("#correct-answer").text("The correct answer was " + current.answer);
  if ((wins + losses + noanswer) == 7) {
      gameEnd();
  };
}

//displays time is up
function displayTimeUp() {
  displayAnswerHTML();
  $("#question-div").text("No Mas Tiempo!");
  $("#correct-answer").text("The correct answer was " + current.answer);
  if ((wins + losses + noanswer) == 7) {
      gameEnd();
  };
}

//changes page
function gameEnd() {
  setTimeout(function () {
      $("#question-div").text("You Lose");
      $("#question-div").append("<br> Correct Answers: " + wins);
      $("#question-div").append("<br> Wrong Answers: " + losses);
      $("#question-div").append("<br> Not Answered: " + noanswer);
      $("#correct-answer").empty();
      $("#image").hide();
      $("#reset-btn").show();
      longTimer.stop();
  }, 5000);
}

//reset
function resetGame() {
  $("#reset-btn").hide();
  $("#question-div").empty();
  $("#start-btn").show();
  wins = 0;
  losses = 0;
  noanswer = 0;
  index = 0;
}

//start 
function startGame() {
  $("#start-btn").hide();
  longTimer.reset();
  longTimer.start();
  generateQuestion(questionBank[index]);
}

$(document).ready(function () {

  $("#reset-btn").hide();
  $("#options-div").hide();

  //Determine if guess is correct
  $("#true-div").click(function () {
      if (current.options[0] === current.answer) {
          wins++;
          index++;
          displayWin();
      } else {
          losses++;
          index++;
          displayLoss();
      }
  });
  $("#false-div").click(function () {
      if (current.options[1] === current.answer) {
          wins++;
          index++;
          displayWin();
      } else {
          losses++;
          index++;
          displayLoss();
      }
  });
  $("#start-btn").click(function () {
      startGame();
  })
  $("#reset-btn").click(function () {
      resetGame();
  })
});
