$(document).ready(function () {

  // Initializing Firebase
  var config = {
    apiKey: "AIzaSyDZuwliVX8kZnGtJ3ijiEKn6VmrtHUpG8s",
    authDomain: "train-scheduler-87af3.firebaseapp.com",
    databaseURL: "https://train-scheduler-87af3.firebaseio.com",
    projectId: "train-scheduler-87af3",
    storageBucket: "",
    messagingSenderId: "829865421626"
  };
  firebase.initializeApp(config);


  var database = firebase.database();

  // Global Variables

  var trainName;
  var trainDestination;
  var trainTime;
  var trainFrequency;

  $("#add-train").on("click", function (event) {
    event.preventDefault();

    //  adding user inputed values to variables
    trainName = $("#trainName").val().trim();
    trainDestination = $("#trainDestination").val().trim();
    trainTime = $("#trainTime").val().trim();
    trainFrequency = $("#trainFrequency").val().trim();

    // the push
    database.ref().push({
      name: trainName,
      destination: trainDestination,
      time: trainTime,
      frequency: trainFrequency,
      dateAdded: firebase.database.ServerValue.TIMESTAMP
    });

    $("#form")[0].reset();
  });

  database.ref().on("child_added", function (snapshot) {
    // storing snapshot value to a var for easy use
    var sv = snapshot.val();

    //getting next train and minutes away
    var tFrequency = sv.frequency;

    var firstTime = sv.time;

    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    var currentTime = moment();
    console.log(moment(currentTime).format("HH:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart 
    var tRemainder = diffTime % tFrequency;
    console.log(diffTime, tFrequency, tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("HH:mm"));

    var tBody = $("tbody");
    var tRow = $("<tr>");

    //creating table data with the snapshot values
    var tName = $("<td>").text(snapshot.val().name);
    var tDest = $("<td>").text(snapshot.val().destination);
    var tFreq = $("<td>").text(snapshot.val().frequency);
    var tTime = $("<td>").text(moment(nextTrain).format("HH:mm"));
    var tAway = $("<td>").text(tMinutesTillTrain);



    // Appending table data to the table row
    tRow.append(tName, tDest, tFreq, tTime, tAway);
    // appending table row to the table body
    tBody.append(tRow);

  }, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);

  });

  function clearVars() {
    trainName = "";
    trainDestination = "";
    trainTime = "";
    trainFrequency = "";
    hoursAway = "";
    minAway = "";

  }
  clearVars();
});