// Initialize Firebase

// Create a variable to reference the database.
let database = firebase.database();

//Initial Values.
let trainName = "";
let destination = "";
let firstTrain = "";
let frequency = "";

$("#add-train").on ("click", function(event) {
    event.preventDefault();

    let newTrain = {
        name : $("#train-name-input").val().trim(),
        destination : $("#destination-input").val().trim(),
        first : $("#first-time-input").val().trim(),
        frequency : $("#frequency-input").val().trim(),
    };

    database.ref('Train-Activity').push(newTrain);

    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-time-input").val("");
    $("#frequency-input").val("");

});

database.ref('Train-Activity').on("child_added", function(childSnapshot) {
    let train = childSnapshot.val();

    console.log(train);
    console.log(train.name);
    console.log(train.destination);
    console.log(train.first);
    console.log(train.frequency);

    let firstTimeConverted = moment(train.first, "HH:mm").subtract(1,"years");
    console.log(firstTimeConverted);

    let currentTime = moment();
    console.log(`Current Time: ${moment(currentTime).format("hh:mm")}`);

    let timeDifference = moment().diff(moment(firstTimeConverted), "minutes");
    console.log(`Time Difference: ${timeDifference}`);

    let timeRemaining = timeDifference % train.frequency;
    console.log(timeRemaining);

    let timeTilNext = train.frequency - timeRemaining;
    console.log(`Minutes Until Train: ${timeTilNext}`);

    let nextTrain = moment().add(timeTilNext, "minutes");
    console.log(`Arrival Time: ${moment(nextTrain).format("hh:mm")}`);


    $(".table tbody").append(`<tr>
                                <td>${train.name}</td>
                                <td>${train.destination}</td>
                                <td>${train.frequency}</td>
                                <td>${moment(nextTrain).format("hh:mm")}</td>
                                <td>${timeTilNext}</td>
                              </tr>`)
}, function(errorObject) {
    console.log(`Errors Handled: ${errorObject.code}`);
});