 $(document).on("click", "#generate-button", function (event) {
   speechSynthesis.cancel();
  
  url = "https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=?";

$.getJSON(url, function(data){
  console.log(data);

  $("#quote").text("\"" + data.quoteText + "\""); $("#author").text("- " + data.quoteAuthor);

  $("#robo-image img:last-child").remove()
  $('<img/>')
  .attr('src',"https://robohash.org/"+data.quoteText+".png")
  
  .appendTo('#robo-image');

  // speak();
  
  function speak (message) {
    var msg = new SpeechSynthesisUtterance(message)
    var voices = window.speechSynthesis.getVoices()
    msg.voice = voices[0]
     msg.rate=Math.random()*.75+1.50;
  msg.pitch = Math.random()*-4+3;
    window.speechSynthesis.speak(msg)
  } 
 
speak(data.quoteText)
    

});
 
 });
