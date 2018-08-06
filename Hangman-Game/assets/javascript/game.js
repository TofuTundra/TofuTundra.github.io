window.onload = function() {

    $(document).ready(function() {
   
    
    var spaceChar = "<span class='space'></span>";
    var options = ["zombie", "werewolf", "vampire", "bat", "wolf", "dracula"];
    var usedOptions = [];
    var selectedWord = "";
    var lastWord = "";
    var lettersInWord = [];
    var numBlanks = 0;
    var blanksAndSuccesses = [];
    var wrongGuesses = [];
    var wins = 0;
    var losses = 0;
    var guessesLeft = 7;
    var removeSpaces = function (char) {
      if (char === spaceChar) {
        return " ";
      } else {
        return char;
      }
    }
    var transforms = [
        'skewY(-7deg) scale(.66)',
        'translate(20px) skewY(-7deg) scale(.66)',
        'translate(150px,50px) scale(1.5,1)',
        'translate(280px) skewY(7deg) scale(.66)',
        'translate(300px) skewY(7deg) scale(.66)'
      ],
      $squares = $('#info-side').each(function(i) {
        $(this).css({ transform: transforms[i] });
      });
    $('#info-side').mouseenter(function() {
      $squares.each(function(i) {
        $(this).animate({ transform: transforms[i+1] });
      });
    }).mouseleave(function() {
      $squares.each(function(i) {
        $(this).animate({ transform: transforms[i] });
      });
    });
    var transforms = [
        'skewY(7deg) scale(.66)',
        'translate(20px) skewY(7deg) scale(.66)',
        'translate(150px,50px) scale(1.5,1)',
        'translate(280px) skewY(-7deg) scale(.66)',
        'translate(300px) skewY(-7deg) scale(.66)'
      ],
      $squares = $('.rightside').each(function(i) {
        $(this).css({ transform: transforms[i] });
      });
    $('#info-side').mouseenter(function() {
      $squares.each(function(i) {
        $(this).animate({ transform: transforms[i+1] });
      });
    }).mouseleave(function() {
      $squares.each(function(i) {
        $(this).animate({ transform: transforms[i] });
      });
    });
    
    
    var setSelectedWord = function () {
    
      if (options.length === 0) {
        options = usedOptions
      }
    
        selectedWord = options.splice(Math.floor(Math.random() * options.length), 1)[0];
      usedOptions.push(selectedWord)
    
      console.log('selectedWord', selectedWord)
      console.log('options', options)
      console.log('usedOptions', usedOptions)
        
    }
    
    var startGame = function() {
       
        setSelectedWord();
        lettersInWord = selectedWord.split("");
        numBlanks = lettersInWord.length;
        
    
    
    
        
        guessesLeft = 10;
        wrongGuesses = [];
        blanksAndSuccesses = [];
    
        for(i=0; i<numBlanks; i++) {
        console.log(lettersInWord[i])
        if (lettersInWord[i] === " ") {
          blanksAndSuccesses.push(spaceChar);
        } else {
          blanksAndSuccesses.push("_");
        }
        }
    
        
        document.getElementById("wordToGuess").innerHTML = blanksAndSuccesses.join(" ");
        document.getElementById("guessesLeft").innerHTML = guessesLeft;
        document.getElementById("wins").innerHTML = wins;
        document.getElementById("losses").innerHTML = losses;
        document.getElementById("guessesLeft").style.color = "black";
        
    
    
    
        
        console.log(selectedWord);
        console.log(lettersInWord);
        console.log(numBlanks);
        console.log(blanksAndSuccesses);
    }
    
    function checkLetters(letter) {
        
        var isLetterInWord = false;
    
    
    
        for(i=0; i<numBlanks; i++) {
            if(selectedWord[i].toUpperCase() == letter.toUpperCase()) {
                isLetterInWord = true;
            }
        }
    
        
        if(isLetterInWord) {
            for(i=0; i<numBlanks; i++) {
                if(selectedWord[i].toLowerCase() == letter) {
                    blanksAndSuccesses[i] = selectedWord[i];
                }
            }
        }
        
        else {
            wrongGuesses.push(letter);
            guessesLeft--;
                if (guessesLeft < 10) {
                    document.getElementById("guessesLeft").style.color = "#4CC417";
                }
    
                if (guessesLeft < 8) {
                    document.getElementById("guessesLeft").style.color = "orange";
                }
    
                if (guessesLeft < 4) {
                    document.getElementById("guessesLeft").style.color = "red";
                }
            }
    
        
        console.log(blanksAndSuccesses);
    }
    
    function roundComplete() {
        console.log("Wins: " + wins + " | Losses " + losses + " | Guesses Left " + guessesLeft);
    
        // update the html with the most recent information
        document.getElementById("guessesLeft").innerHTML = guessesLeft;
        document.getElementById("wordToGuess").innerHTML = blanksAndSuccesses.join(" ");
        document.getElementById("wrongGuesses").innerHTML = wrongGuesses.join(" ");
    
      console.log(blanksAndSuccesses);
      var onlyLetters = blanksAndSuccesses.map(removeSpaces);
      console.log(onlyLetters);
        
        if(lettersInWord.toString() === onlyLetters.toString()) {
    
        wins++;
            if (wins >= 1) {
                document.getElementById("wins").style.color = "#4CC417";
            }
    
            
            document.getElementById("wins").innerHTML = wins;
    
            startGame();
        }
        
        else if (guessesLeft == 0) {
            losses++;
            if (losses >= 1) {
                document.getElementById("losses").style.color = "red";
            }
    
           
    
            
            document.getElementById("losses").innerHTML = losses;
            startGame();
        }
    
    }
    
    
    
     var winner = function() {
         console.log("text");
             document.getElementById("hangman-pic").style.height = "350px";
             document.getElementById("hangman-pic").style.border = "solid 2px white";
            if(selectedWord === "zombie", "werewolf", "vampire", "bat", "wolf", "dracula") {
                document.getElementById("hangman-pic").src = "assets/images/hangmanpic.jpg";
                
            }    
                else {
                    
                    document.getElementById("hangman-pic").src = "assets/images/hangmanpic.jpg";
                    document.getElementById("hangman-pic").style.height = "250px";
                     
                }
    }
    
    
    startGame();
   
    document.onkeyup = function(event) {
      console.log("LETTER CODE", event.keyCode)
      if (event.keyCode >= 65 && event.keyCode <= 90) {
        var letterGuessed = String.fromCharCode(event.keyCode).toLowerCase();
          checkLetters(letterGuessed);
          roundComplete();
      } else {
        $('#message').text('Only A - Z')
      }
        
        console.log(letterGuessed);
    }
    
    
   
    
    
    });
    
    }