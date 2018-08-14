$(document).ready(function () {
  // Global Variables
  var wins = 0;
  var losses = 0;
  var goal = 0;
  var counter = 0;
  var gems = ["gem1", "gem2", "gem3", "gem4"];
  var imageArray = ["./assets/images/gem1.png", "./assets/images/gem2.png", "./assets/images/gem3.png", "./assets/images/gem4.png"];
  
  // resetGame variables
  
      function resetGame() {
          randomNumberFromRange();
          randomGemNumbers();
          gemValue = 0;
          counter = 0;
      }
  
  
  
      //Show random number between 19 - 120
      function randomNumberFromRange() {
          goal = (Math.floor(Math.random() * 101) + 19);
          console.log(goal);
          $("#goal").html("<h3>Your gems needs to value: " + goal + "</h3>");
      }
      randomNumberFromRange();
      //Assign each gem hidden value between 1 - 12
      for (var i = 0; i < gems.length; i++) {
          function randomGemNumbers() {
              gems[i] = (Math.floor(Math.random() * 12) + 1);
              console.log(gems);
          }
          randomGemNumbers();
      };
      // Assign image to gems
      for (var j = 0; j < gems.length; j++) {
          var gemImage = $("<img>");
  
          gemImage.addClass("gem-image");
  
          gemImage.attr("src", imageArray[j]);
  
          gemImage.attr("data-gemvalue", gems[j]);
  
          $("#gems").append(gemImage);
      }
  // Attach gem value to image 
      $(".gem-image").click(function () {
          var gemValue = ($(this).attr("data-gemvalue"));
          gemValue = parseInt(gemValue);
          counter += gemValue;
          console.log(counter);
          $("#totalscore").html("<h3>Your gems total: " +counter+ "</h3>");
          if (counter === goal) {
              wins++;
              $("#wins").html("Wins: " + wins);
              alert("You win!");
              resetGame();
          }
          else if (counter >= goal) {
              losses++;
              $("#losses").html("Losses: " + losses);
              alert("You lost the game.");
              resetGame();
          }
      });
      $(".btn").click(function() {
          $("#totalscore").html("<h3> Your gems total: </h3>");
          resetGame();
      })
  });