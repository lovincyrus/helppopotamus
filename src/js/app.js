var express = require('express')
// var bodyParser = require('body-parser')
var app = express()


//angular
var app = angular.module("sampleApp", ["firebase"]);

// inject $firebaseArray into our controller
app.controller("ProfileCtrl", ["$scope", $firebaseArray",
  function($scope, $firebaseArray) {
    var messagesRef = new Firebase("https://helppopotamus.firebaseio.com/messages");

    // download the data from a Firebase reference into a (pseudo read-only) array
    // all server changes are applied in realtime
    $scope.messages = $firebaseArray(messagesRef);
    // create a query for the most recent 25 messages on the server
    var query = messagesRef.orderByChild("timestamp").limitToLast(25);
    // the $firebaseArray service properly handles database queries as well
    $scope.filteredMessages = $firebaseArray(query);
  }
]);