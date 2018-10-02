// Initialize Firebase


// Create a variable to reference the database.
let database = firebase.database();

//Initial Values.
setInterval(checkStatus, 60000);

function addTrainData() {

    let newTrain = {
        name: $("#train-name-input").val().trim(),
        destination: $("#destination-input").val().trim(),
        first: $("#first-time-input").val().trim(),
        frequency: $("#frequency-input").val().trim(),
    };


    database.ref('Train-Activity').push(newTrain);

    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-time-input").val("");
    $("#frequency-input").val("");
}

function renderTrains(train, key) {
    // console.log(train);
    let firstTimeConverted = moment(train[key].first, "HHmm").subtract(1, "years");
    // console.log(`First Train Time: ${firstTimeConverted}`);
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
                                <td><div class="btn-group btn-group-sm" role="group" aria-label="Manage">
                                    <button type="button" class="btn btn-secondary" id="edit-train" data-edit="${key}">Edit</button>
                                    <button type="button" class="btn btn-secondary" id="remove-train" data-remove="${key}">Remove</button>
                                </div></td>
                              </tr>`);
}

function checkStatus() {
    let trainCheck = database.ref('Train-Activity');
    trainCheck.once("value")
        .then(function (snapshot) {
            var key = snapshot.key;
            if (key === "null") {
            } else {
                // console.log("Data to Display");
                trainCheck.once("value")
                    .then(function (childSnapshot) {
                        let train = childSnapshot.val();
                        // console.log(train);
                        $(".table tbody").empty();
                        for (var key in train) {
                            if (train.hasOwnProperty(key)) {
                                // console.log(train);
                                // console.log(key);

                                renderTrains(train, key);

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
    if (($("#train-name-input").val() === "") || ($("#destination-input").val() === "") ||
        ($("#first-time-input").val()) === "" || ($("#frequency-input").val() === "")) {
        $('.modal').modal('show');
    } else {
        addTrainData()
    }

});

$(document).on("click", "#remove-train", function () {
    let postID = $(this).attr("data-remove");
    console.log(postID);

    let trainRemove = firebase.database().ref(`Train-Activity/${postID}`);
    trainRemove.remove()
        .then(function () {
            console.log('Remove Succeeded.');
            checkStatus();
        })
        .catch(function (error) {
            console.log('Remove failed: ' + error.message)
        })
})

    .on("click", "#edit-train", function () {
        let postID = $(this).attr("data-edit");
        console.log(postID);
        $("#edit-modal").modal("show");
        $("#update-data").attr("data-update", postID);
    })

    .on("click", "#update-data", function () {
        let postID = $(this).attr("data-update");
        console.log(postID);

        if (($("#train-name-update").val() === "") || ($("#destination-update").val() === "") ||
            ($("#first-time-update").val()) === "" || ($("#frequency-update").val() === "")) {
            $('#edit-modal').modal('show');
        } else {
            let updatedTrain = {
                name: $("#train-name-update").val().trim(),
                destination: $("#destination-update").val().trim(),
                first: $("#first-time-update").val().trim(),
                frequency: $("#frequency-update").val().trim()
            };
            console.log(updatedTrain);

            $("#train-name-update").val("");
            $("#destination-update").val("");
            $("#first-time-update").val("");
            $("#frequency-update").val("");

            database.ref(`Train-Activity/${postID}`).set(updatedTrain);
            checkStatus();
        }

    });


database.ref('Train-Activity').on("child_added", function (childSnapshot) {
    let train = childSnapshot.val();
    let key = childSnapshot.key;
    // console.log(childSnapshot.key);

    let firstTimeConverted = moment(train.first, "HHmm").subtract(1, "years");
    let timeDifference = moment().diff(moment(firstTimeConverted), "minutes");
    let timeRemaining = timeDifference % train.frequency;
    let timeTilNext = train.frequency - timeRemaining;
    let nextTrain = moment().add(timeTilNext, "minutes");

    $(".table tbody").append(`<tr>
                                <td>${train.name}</td>
                                <td>${train.destination}</td>
                                <td>${train.frequency}</td>
                                <td>${moment(nextTrain).format("hh:mm A")}</td>
                                <td>${timeTilNext}</td>
                                <td><div class="btn-group btn-group-sm" role="group" aria-label="Manage">
                                        <button type="button" class="btn btn-secondary" id="edit-train" data-edit="${key}">Edit</button>
                                        <button type="button" class="btn btn-secondary" id="remove-train" data-remove="${key}">Remove</button>
                                    </div></td>
                              </tr>`);

}, function (errorObject) {
    console.log(`Errors Handled: ${errorObject.code}`);
});