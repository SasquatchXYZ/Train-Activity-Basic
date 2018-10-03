# Train-Activity-Basic
Homework 7 - Basic - Train Schedule Application

## Getting Started

This is a train scheduling application that incorporates Firebase to host the arrival and departure data of various trains.  The data is submitted via the form provided and the data is then stored and returned using Moment.js in order to allow for up-to-date information about the various trains, such as the next arrival time for the train and how many minutes until it arrives.  Currently I have it set up to refresh the data from the Firebase Database every minute, and you are able to Edit a particular train to update the data, and remove the data for a train from inside the webpage.  My next steps if I have time, will be to add authentication requiring you to login to the site, as well as trying to have the edit modal actually display the information for the train you wish to update, rather than just being blank.

### Prerequisites

The only thing you need to enjoy the train scheduler is a web browser.

```
Web Browser - Google Chrome Preferred
```

### Installing

No installation necessary.

## Built With

* [Bootstrap](http://getbootstrap.com/) - For the CSS Styling of the Webpage
* [Firebase](https://firebase.google.com/) - For the storing of the train data, in an online database.
* [Moment.js](https://momentjs.com/) - For handling the up-to-date information of the trains, arrival times, and Minutes Until the Next Train.
* [WebStorm](https://www.jetbrains.com/webstorm/) - IDE

## Authors

* **Dalton Ricker** - *Primary Author* - [SasquatchXYZ](https://github.com/SasquatchXYZ)

## Acknowledgments
* Many thanks to my instructors & TAs, as well as the O'Reilly reference books.