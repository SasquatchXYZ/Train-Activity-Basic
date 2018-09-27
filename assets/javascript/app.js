// Initialize Firebase


// Create a variable to reference the database.
let database = firebase.database();

//Initial Values.
const serverTime = firebase.database.ServerValue.TIMESTAMP;
setInterval(checkStatus, 30000);

function addTrainData() {

    let newTrain = {
        name: $("#train-name-input").val().trim(),
        destination: $("#destination-input").val().trim(),
        first: $("#first-time-input").val().trim(),
        frequency: $("#frequency-input").val().trim(),
    };

    let firstTimeConverted = moment(newTrain.first, "HH:mm").subtract(1, "years");
    console.log(`First Train Time: ${firstTimeConverted}`);

    let currentTime = moment();
    console.log(`Current Time: ${moment(currentTime).format("hh:mm")}`);

    let timeDifference = moment().diff(moment(firstTimeConverted), "minutes");
    console.log(`Time Difference: ${timeDifference}`);

    let timeRemaining = timeDifference % newTrain.frequency;
    console.log(timeRemaining);

    let timeTilNext = newTrain.frequency - timeRemaining;
    console.log(`Minutes Until Train: ${timeTilNext}`);

    let nextTrain = moment().add(timeTilNext, "minutes");
    let nextTrainTime = moment(nextTrain).format("hh:mm A");
    newTrain.nexttraintime = moment(nextTrain).format("hh:mm A");
    newTrain.timeremaining = newTrain.frequency - (moment().diff(moment(moment(newTrain.first, "HH:mm").subtract(1, "years")), "minutes") % newTrain.frequency);
    console.log(`Arrival Time: ${nextTrainTime}`);

    database.ref('Train-Activity').push(newTrain);

    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-time-input").val("");
    $("#frequency-input").val("");
}

function checkStatus() {
    let trainCheck = database.ref('Train-Activity');
    trainCheck.once("value")
        .then(function(snapshot) {
            var key = snapshot.key;
            if (key === "null") {
                console.log("Nothing to Show Here");
            } else {
                console.log("Data to Display");
                trainCheck.once("value")
                    .then(function (childSnapshot) {
                    let train = childSnapshot.val();
                    console.log(train);
                    $(".table tbody").empty();
                    for (var key in train) {
                        if (train.hasOwnProperty(key)) {
                            console.log(train);
                            let firstTimeConverted = moment(train[key].first, "HH:mm").subtract(1, "years");
                            // console.log(`First Train Time: ${firstTimeConverted}`);

                            let currentTime = moment();
                            // console.log(`Current Time: ${moment(currentTime).format("hh:mm")}`);

                            let timeDifference = moment().diff(moment(firstTimeConverted), "minutes");
                            // console.log(`Time Difference: ${timeDifference}`);

                            let timeRemaining = timeDifference % train[key].frequency;
                            // console.log(timeRemaining);

                            let timeTilNext = train[key].frequency - timeRemaining;
                            // console.log(`Minutes Until Train: ${timeTilNext}`);

                            let nextTrain = moment().add(timeTilNext, "minutes");
                            // console.log(`Arrival Time: ${moment(nextTrain).format("hh:mm A")}`);

                            $(".table tbody").append(`<tr>
                                <td>${train[key].name}</td>
                                <td>${train[key].destination}</td>
                                <td>${train[key].frequency}</td>
                                <td>${moment(nextTrain).format("hh:mm A")}</td>
                                <td>${timeTilNext}</td>
                              </tr>`);
                        }

                    }

                }, function (errorObject) {
                    console.log(`Errors Handled: ${errorObject.code}`);
                });
            }
        })
}

$("#add-train").on("click", function (event) {
    event.preventDefault();

    addTrainData();
/*    let newTrain = {
        name: $("#train-name-input").val().trim(),
        destination: $("#destination-input").val().trim(),
        first: $("#first-time-input").val().trim(),
        frequency: $("#frequency-input").val().trim(),
    };

    database.ref('Train-Activity').push(newTrain);

    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-time-input").val("");
    $("#frequency-input").val("");*/

});

database.ref('Train-Activity').on("child_added", function (childSnapshot) {
    let train = childSnapshot.val();
    console.log(childSnapshot.val());

    /*console.log(train);
    console.log(train.name);
    console.log(train.destination);
    console.log(train.first);
    console.log(train.frequency);*/

    let firstTimeConverted = moment(train.first, "HH:mm").subtract(1, "years");
    // console.log(`First Train Time: ${firstTimeConverted}`);

    let currentTime = moment();
    // console.log(`Current Time: ${moment(currentTime).format("hh:mm")}`);

    let timeDifference = moment().diff(moment(firstTimeConverted), "minutes");
    // console.log(`Time Difference: ${timeDifference}`);

    let timeRemaining = timeDifference % train.frequency;
    // console.log(timeRemaining);

    let timeTilNext = train.frequency - timeRemaining;
    // console.log(`Minutes Until Train: ${timeTilNext}`);

    let nextTrain = moment().add(timeTilNext, "minutes");
    // console.log(`Arrival Time: ${moment(nextTrain).format("hh:mm A")}`);


    $(".table tbody").append(`<tr>
                                <td>${train.name}</td>
                                <td>${train.destination}</td>
                                <td>${train.frequency}</td>
                                <td>${moment(nextTrain).format("hh:mm A")}</td>
                                <td>${timeTilNext}</td>
                              </tr>`);
}, function (errorObject) {
    console.log(`Errors Handled: ${errorObject.code}`);
});