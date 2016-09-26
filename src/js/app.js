var express = require('express')
var bodyParser = require('body-parser')
var app = express()
// var app = angular.module("sampleApp", ["firebase"]);

// inject $firebaseArray into our controller
// app.controller("ProfileCtrl", ["$scope", "$firebaseArray",
//   function($scope, $firebaseArray) {
//     var messagesRef = new Firebase("https://helppopotamus.firebaseio.com/messages");

//     // download the data from a Firebase reference into a (pseudo read-only) array
//     // all server changes are applied in realtime
//     $scope.messages = $firebaseArray(messagesRef);
//     // create a query for the most recent 25 messages on the server
//     var query = messagesRef.orderByChild("timestamp").limitToLast(25);
//     // the $firebaseArray service properly handles database queries as well
//     $scope.filteredMessages = $firebaseArray(query);
//   }
// ]);









app.get('/api/gethelppopotamus', function (req, res) {
    var output = req.param('output');

    var http = require("https");
    
    var options = {
        "method": "GET",
        "hostname": "gateway.watsonplatform.net",
        "port": null,
        "path": "/conversation/api/v1/workspaces/e14c46ac-234c-464b-8e1f-550124fe1f67/message?version=2016-07-11",
        "headers": {
            "content-type": "application/json;charset=utf-8",
            "cache-control": "no-cache",
            "postman-token": "43371ba6-9e3d-1740-1233-5f5fb03e7b60"
        }
    };

    var request = http.request(options, function (response) {
        var chunks = [];

        response.on("data", function (chunk) {
            chunks.push(chunk);
        });

        response.on("end", function () {
            var body = Buffer.concat(chunks);
            var list = JSON.parse(body);
            // var locations = [list.results.length];
            var output = [list.results.legnth];
            
            for (var i = 0; i < list.results.length; i++) {
                if (list.results[i].permanently_closed !== true) {
                    output[i] = { name: list.results[i].name }
                    console.log(output[i]);
                }
            }

            res.send(output);
        });
    });

    request.end();
})

